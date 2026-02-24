"""
Rent Teller & Cheque Management Module - Backend API Routes
4 endpoints for: teller transactions, PDC register, cheque deposits, bounced cheques
"""
from flask import Blueprint, request, jsonify
from db import get_connection

teller_cheque_bp = Blueprint('teller_cheque', __name__)


def generic_crud_tc(table, id_col, request_obj):
    """Handle GET (list), POST (create), PUT (update), DELETE for a table."""
    conn = get_connection()
    cursor = conn.cursor()

    if request_obj.method == 'GET':
        cursor.execute(f"SELECT * FROM {table} ORDER BY {id_col} DESC")
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
        result = []
        for row in rows:
            d = {}
            for i, col in enumerate(columns):
                val = row[i]
                if val is not None and hasattr(val, 'isoformat'):
                    val = val.isoformat()
                if isinstance(val, bytes):
                    val = bool(val[0]) if len(val) == 1 else val.hex()
                from decimal import Decimal
                if isinstance(val, Decimal):
                    val = float(val)
                d[col] = val
            result.append(d)
        cursor.close()
        return jsonify(result)

    elif request_obj.method == 'POST':
        data = request_obj.get_json()
        if not data:
            cursor.close()
            return jsonify({"error": "No data provided"}), 400
        cols = [k for k in data.keys() if k != id_col]
        vals = [data[k] for k in cols]
        placeholders = ','.join(['?' for _ in cols])
        col_names = ','.join(cols)
        try:
            cursor.execute(f"INSERT INTO {table} ({col_names}) VALUES ({placeholders})", vals)
            conn.commit()
            cursor.execute("SELECT @@IDENTITY")
            new_id = cursor.fetchone()[0]
            cursor.close()
            return jsonify({"success": True, "id": int(new_id)}), 201
        except Exception as e:
            cursor.close()
            return jsonify({"error": str(e)}), 500

    elif request_obj.method == 'PUT':
        data = request_obj.get_json()
        if not data or id_col not in data:
            cursor.close()
            return jsonify({"error": "No data or missing ID"}), 400
        record_id = data[id_col]
        cols = [k for k in data.keys() if k != id_col]
        set_clause = ','.join([f"{c}=?" for c in cols])
        vals = [data[c] for c in cols] + [record_id]
        try:
            cursor.execute(f"UPDATE {table} SET {set_clause} WHERE {id_col}=?", vals)
            conn.commit()
            cursor.close()
            return jsonify({"success": True})
        except Exception as e:
            cursor.close()
            return jsonify({"error": str(e)}), 500

    elif request_obj.method == 'DELETE':
        record_id = request_obj.args.get('id')
        if not record_id:
            cursor.close()
            return jsonify({"error": "Missing id parameter"}), 400
        try:
            cursor.execute(f"DELETE FROM {table} WHERE {id_col}=?", [record_id])
            conn.commit()
            cursor.close()
            return jsonify({"success": True})
        except Exception as e:
            cursor.close()
            return jsonify({"error": str(e)}), 500


# ============================================================
# 1. Teller Transactions
# ============================================================
@teller_cheque_bp.route('/api/teller-transactions', methods=['GET', 'POST', 'PUT', 'DELETE'])
def teller_transactions():
    return generic_crud_tc('RE_Teller_Transactions', 'transaction_id', request)


# ============================================================
# 2. PDC Register
# ============================================================
@teller_cheque_bp.route('/api/pdc-register', methods=['GET', 'POST', 'PUT', 'DELETE'])
def pdc_register():
    return generic_crud_tc('RE_PDC_Register', 'pdc_id', request)


# ============================================================
# 3. Cheque Deposits
# ============================================================
@teller_cheque_bp.route('/api/cheque-deposits', methods=['GET', 'POST', 'PUT', 'DELETE'])
def cheque_deposits():
    return generic_crud_tc('RE_Cheque_Deposits', 'deposit_id', request)


# ============================================================
# 4. Bounced Cheques
# ============================================================
@teller_cheque_bp.route('/api/bounced-cheques', methods=['GET', 'POST', 'PUT', 'DELETE'])
def bounced_cheques():
    return generic_crud_tc('RE_Bounced_Cheques', 'bounce_id', request)


# ============================================================
# 5. Teller Summary / Dashboard endpoint
# ============================================================
@teller_cheque_bp.route('/api/teller-summary', methods=['GET'])
def teller_summary():
    """Returns summary stats for the teller dashboard."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        from decimal import Decimal
        stats = {}
        
        # Today's collections
        cursor.execute("SELECT ISNULL(SUM(total_amount),0) as total, COUNT(*) as cnt FROM RE_Teller_Transactions WHERE CAST(transaction_date AS DATE) = CAST(GETDATE() AS DATE) AND status='Completed'")
        row = cursor.fetchone()
        stats['today_collections'] = float(row[0]) if isinstance(row[0], Decimal) else float(row[0] or 0)
        stats['today_transactions'] = int(row[1])
        
        # Total collections this month
        cursor.execute("SELECT ISNULL(SUM(total_amount),0) as total, COUNT(*) as cnt FROM RE_Teller_Transactions WHERE MONTH(transaction_date)=MONTH(GETDATE()) AND YEAR(transaction_date)=YEAR(GETDATE()) AND status='Completed'")
        row = cursor.fetchone()
        stats['month_collections'] = float(row[0]) if isinstance(row[0], Decimal) else float(row[0] or 0)
        stats['month_transactions'] = int(row[1])
        
        # PDC stats
        cursor.execute("SELECT COUNT(*) FROM RE_PDC_Register WHERE status='On Hand'")
        stats['pdcs_on_hand'] = cursor.fetchone()[0]
        
        cursor.execute("SELECT ISNULL(SUM(amount),0) FROM RE_PDC_Register WHERE status='On Hand'")
        val = cursor.fetchone()[0]
        stats['pdcs_on_hand_value'] = float(val) if isinstance(val, Decimal) else float(val or 0)
        
        cursor.execute("SELECT COUNT(*) FROM RE_PDC_Register WHERE status='Deposited'")
        stats['pdcs_deposited'] = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM RE_PDC_Register WHERE status='Bounced'")
        stats['pdcs_bounced'] = cursor.fetchone()[0]
        
        # Bounced cheques open
        cursor.execute("SELECT COUNT(*) FROM RE_Bounced_Cheques WHERE status IN ('Open','Legal')")
        stats['bounced_open'] = cursor.fetchone()[0]
        
        cursor.close()
        return jsonify(stats)
    except Exception as e:
        cursor.close()
        return jsonify({"error": str(e)}), 500


def register_teller_cheque_routes(app):
    """Register the teller/cheque blueprint with the Flask app."""
    app.register_blueprint(teller_cheque_bp)
