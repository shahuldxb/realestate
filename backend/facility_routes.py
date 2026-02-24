"""
Facility & Property Operations Module - Backend API Routes
15 endpoints for: buildings, units, facilities, owners, tenants, leases,
rent collection, arrears, maintenance, preventive maintenance, FM vendors,
staff directory, staff scheduling, vacancy tracker, marketing listings
"""
from flask import Blueprint, request, jsonify
from db import get_connection

facility_bp = Blueprint('facility', __name__)

# ============================================================
# Generic CRUD helper
# ============================================================
def generic_crud(table, id_col, request_obj):
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
                d[col] = val
            result.append(d)
        cursor.close()
        conn.close()
        return jsonify(result)

    elif request_obj.method == 'POST':
        data = request_obj.get_json()
        if not data:
            cursor.close()
            conn.close()
            return jsonify({"error": "No data provided"}), 400
        cols = [k for k in data.keys() if k != id_col]
        vals = [data[k] for k in cols]
        placeholders = ','.join(['?' for _ in cols])
        col_names = ','.join(cols)
        try:
            cursor.execute(f"INSERT INTO {table} ({col_names}) VALUES ({placeholders})", vals)
            conn.commit()
            cursor.execute(f"SELECT @@IDENTITY")
            new_id = cursor.fetchone()[0]
            cursor.close()
            conn.close()
            return jsonify({"success": True, "id": int(new_id)}), 201
        except Exception as e:
            cursor.close()
            conn.close()
            return jsonify({"error": str(e)}), 500

    elif request_obj.method == 'PUT':
        data = request_obj.get_json()
        if not data or id_col not in data:
            cursor.close()
            conn.close()
            return jsonify({"error": "No data or missing ID"}), 400
        record_id = data[id_col]
        cols = [k for k in data.keys() if k != id_col]
        set_clause = ','.join([f"{c}=?" for c in cols])
        vals = [data[c] for c in cols] + [record_id]
        try:
            cursor.execute(f"UPDATE {table} SET {set_clause} WHERE {id_col}=?", vals)
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"success": True})
        except Exception as e:
            cursor.close()
            conn.close()
            return jsonify({"error": str(e)}), 500

    elif request_obj.method == 'DELETE':
        record_id = request_obj.args.get('id')
        if not record_id:
            cursor.close()
            conn.close()
            return jsonify({"error": "Missing id parameter"}), 400
        try:
            cursor.execute(f"DELETE FROM {table} WHERE {id_col}=?", [record_id])
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"success": True})
        except Exception as e:
            cursor.close()
            conn.close()
            return jsonify({"error": str(e)}), 500


# ============================================================
# 1. Building/Tower Registry
# ============================================================
@facility_bp.route('/api/fm-buildings', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_buildings():
    return generic_crud('RE_Building_Registry', 'building_id', request)

# ============================================================
# 2. Unit Directory
# ============================================================
@facility_bp.route('/api/fm-units', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_units():
    return generic_crud('RE_Unit_Directory', 'unit_id', request)

# ============================================================
# 3. Common Areas & Facilities
# ============================================================
@facility_bp.route('/api/fm-facilities', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_facilities():
    return generic_crud('RE_Common_Facilities', 'facility_id', request)

# ============================================================
# 4. Owner Management
# ============================================================
@facility_bp.route('/api/fm-owners', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_owners():
    return generic_crud('RE_Owner_Management', 'owner_id', request)

# ============================================================
# 5. Tenant Registry
# ============================================================
@facility_bp.route('/api/fm-tenants', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_tenants():
    return generic_crud('RE_Tenant_Registry', 'tenant_id', request)

# ============================================================
# 6. Lease Contracts
# ============================================================
@facility_bp.route('/api/fm-leases', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_leases():
    return generic_crud('RE_Lease_Contracts', 'lease_id', request)

# ============================================================
# 7. Rent Collection
# ============================================================
@facility_bp.route('/api/fm-rent-collection', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_rent_collection():
    return generic_crud('RE_Rent_Collection', 'collection_id', request)

# ============================================================
# 8. Rent Arrears & Recovery
# ============================================================
@facility_bp.route('/api/fm-rent-arrears', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_rent_arrears():
    return generic_crud('RE_Rent_Arrears', 'arrear_id', request)

# ============================================================
# 9. Maintenance Requests
# ============================================================
@facility_bp.route('/api/fm-maintenance-requests', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_maintenance_requests():
    return generic_crud('RE_Maintenance_Requests', 'request_id', request)

# ============================================================
# 10. Preventive Maintenance
# ============================================================
@facility_bp.route('/api/fm-preventive-maintenance', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_preventive_maintenance():
    return generic_crud('RE_Preventive_Maintenance', 'pm_id', request)

# ============================================================
# 11. FM Vendor/Contractor Management
# ============================================================
@facility_bp.route('/api/fm-vendors', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_vendors():
    return generic_crud('RE_FM_Vendors', 'vendor_id', request)

# ============================================================
# 12. Staff Directory
# ============================================================
@facility_bp.route('/api/fm-staff', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_staff():
    return generic_crud('RE_Staff_Directory', 'staff_id', request)

# ============================================================
# 13. Staff Scheduling & Shifts
# ============================================================
@facility_bp.route('/api/fm-staff-scheduling', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_staff_scheduling():
    return generic_crud('RE_Staff_Scheduling', 'schedule_id', request)

# ============================================================
# 14. Vacancy Tracker
# ============================================================
@facility_bp.route('/api/fm-vacancies', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_vacancies():
    return generic_crud('RE_Vacancy_Tracker', 'vacancy_id', request)

# ============================================================
# 15. Marketing Listings
# ============================================================
@facility_bp.route('/api/fm-listings', methods=['GET', 'POST', 'PUT', 'DELETE'])
def fm_listings():
    return generic_crud('RE_Marketing_Listings', 'listing_id', request)


def register_facility_routes(app):
    """Register the facility blueprint with the Flask app."""
    app.register_blueprint(facility_bp)
