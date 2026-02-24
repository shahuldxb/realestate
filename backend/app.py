import os
import json
from datetime import datetime, date
from decimal import Decimal
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from db import execute_query, execute_insert
from ai_service import chat_with_ai, execute_ai_mutation

load_dotenv()

app = Flask(__name__)
CORS(app)

# Custom JSON encoder for dates and decimals
class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

app.json_encoder = CustomEncoder

def json_serial(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    return obj

def serialize_rows(rows):
    return [{k: json_serial(v) for k, v in row.items()} for row in rows]

# ============================================================================
# HEALTH CHECK
# ============================================================================
@app.route("/api/health", methods=["GET"])
def health():
    try:
        execute_query("SELECT 1 AS ok")
        return jsonify({"status": "healthy", "database": "connected"})
    except Exception as e:
        return jsonify({"status": "unhealthy", "database": str(e)}), 500

# ============================================================================
# DASHBOARD - Aggregate stats
# ============================================================================
@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    try:
        stats = {}
        queries = {
            "total_projects": "SELECT COUNT(*) as cnt FROM RE_Projects",
            "active_projects": "SELECT COUNT(*) as cnt FROM RE_Projects WHERE status = 'In-Progress'",
            "total_properties": "SELECT COUNT(*) as cnt FROM RE_Properties",
            "available_properties": "SELECT COUNT(*) as cnt FROM RE_Properties WHERE status = 'Available'",
            "total_customers": "SELECT COUNT(*) as cnt FROM RE_Customers",
            "total_leads": "SELECT COUNT(*) as cnt FROM RE_Leads",
            "open_leads": "SELECT COUNT(*) as cnt FROM RE_Leads WHERE status IN ('New','Qualified','Contacted')",
            "total_vendors": "SELECT COUNT(*) as cnt FROM RE_Vendors",
            "total_employees": "SELECT COUNT(*) as cnt FROM RE_Employees",
            "active_leases": "SELECT COUNT(*) as cnt FROM RE_Leases WHERE status = 'Active'",
            "open_tickets": "SELECT COUNT(*) as cnt FROM RE_Helpdesk_Tickets WHERE status IN ('Open','In Progress')",
            "total_revenue": "SELECT ISNULL(SUM(balance),0) as cnt FROM RE_Financial_Accounts WHERE account_type = 'Revenue'",
            "total_budget": "SELECT ISNULL(SUM(estimated_budget),0) as cnt FROM RE_Projects",
            "total_sales": "SELECT COUNT(*) as cnt FROM RE_Sales",
            "active_campaigns": "SELECT COUNT(*) as cnt FROM RE_Marketing_Campaigns WHERE status = 'Active'",
            "pending_bids": "SELECT COUNT(*) as cnt FROM RE_Bids WHERE status = 'Open'",
        }
        for key, q in queries.items():
            result = execute_query(q)
            stats[key] = float(result[0]["cnt"]) if result else 0
        
        # Recent projects
        recent_projects = execute_query("SELECT TOP 5 project_id, project_name, project_type, status, estimated_budget, city FROM RE_Projects ORDER BY created_at DESC")
        
        # Recent leads
        recent_leads = execute_query("SELECT TOP 5 lead_id, lead_name, status, interest_type, source FROM RE_Leads ORDER BY created_at DESC")
        
        return jsonify({
            "stats": stats,
            "recent_projects": serialize_rows(recent_projects),
            "recent_leads": serialize_rows(recent_leads)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============================================================================
# GENERIC CRUD HELPER
# ============================================================================
def generic_list(table, id_col, order_col="created_at"):
    try:
        search = request.args.get("search", "")
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
        
        if search:
            # Get text columns for search
            cols = execute_query(f"""
                SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = '{table}' AND DATA_TYPE IN ('nvarchar','varchar','ntext')
            """)
            conditions = " OR ".join([f"[{c['COLUMN_NAME']}] LIKE ?" for c in cols])
            if conditions:
                query = f"SELECT * FROM [{table}] WHERE ({conditions}) ORDER BY [{order_col}] DESC OFFSET {offset} ROWS FETCH NEXT {limit} ROWS ONLY"
                params = [f"%{search}%"] * len(cols)
                rows = execute_query(query, params)
            else:
                rows = execute_query(f"SELECT * FROM [{table}] ORDER BY [{order_col}] DESC OFFSET {offset} ROWS FETCH NEXT {limit} ROWS ONLY")
        else:
            rows = execute_query(f"SELECT * FROM [{table}] ORDER BY [{order_col}] DESC OFFSET {offset} ROWS FETCH NEXT {limit} ROWS ONLY")
        
        count_result = execute_query(f"SELECT COUNT(*) as total FROM [{table}]")
        total = count_result[0]["total"] if count_result else 0
        
        return jsonify({"data": serialize_rows(rows), "total": total})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generic_get(table, id_col, record_id):
    try:
        rows = execute_query(f"SELECT * FROM [{table}] WHERE [{id_col}] = ?", [record_id])
        if rows:
            return jsonify({"data": serialize_rows(rows)[0]})
        return jsonify({"error": "Not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generic_create(table, id_col):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        columns = list(data.keys())
        placeholders = ", ".join(["?" for _ in columns])
        col_names = ", ".join([f"[{c}]" for c in columns])
        values = [data[c] for c in columns]
        
        query = f"INSERT INTO [{table}] ({col_names}) VALUES ({placeholders})"
        result = execute_insert(query, values)
        return jsonify({"success": True, "id": result.get("id")}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generic_update(table, id_col, record_id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        set_clauses = ", ".join([f"[{k}] = ?" for k in data.keys()])
        values = list(data.values()) + [record_id]
        
        query = f"UPDATE [{table}] SET {set_clauses} WHERE [{id_col}] = ?"
        execute_query(query, values, fetch=False)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generic_delete(table, id_col, record_id):
    try:
        execute_query(f"DELETE FROM [{table}] WHERE [{id_col}] = ?", [record_id], fetch=False)
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============================================================================
# MODULE 1: PROJECT MANAGEMENT
# ============================================================================
@app.route("/api/projects", methods=["GET"])
def list_projects():
    return generic_list("RE_Projects", "project_id")

@app.route("/api/projects/<int:id>", methods=["GET"])
def get_project(id):
    return generic_get("RE_Projects", "project_id", id)

@app.route("/api/projects", methods=["POST"])
def create_project():
    return generic_create("RE_Projects", "project_id")

@app.route("/api/projects/<int:id>", methods=["PUT"])
def update_project(id):
    return generic_update("RE_Projects", "project_id", id)

@app.route("/api/projects/<int:id>", methods=["DELETE"])
def delete_project(id):
    return generic_delete("RE_Projects", "project_id", id)

# Project Tasks
@app.route("/api/projects/<int:pid>/tasks", methods=["GET"])
def list_project_tasks(pid):
    try:
        rows = execute_query("SELECT * FROM RE_Project_Tasks WHERE project_id = ? ORDER BY created_at DESC", [pid])
        return jsonify({"data": serialize_rows(rows)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks", methods=["GET"])
def list_all_tasks():
    return generic_list("RE_Project_Tasks", "task_id")

@app.route("/api/tasks", methods=["POST"])
def create_task():
    return generic_create("RE_Project_Tasks", "task_id")

@app.route("/api/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    return generic_update("RE_Project_Tasks", "task_id", id)

@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    return generic_delete("RE_Project_Tasks", "task_id", id)

# Project Milestones
@app.route("/api/projects/<int:pid>/milestones", methods=["GET"])
def list_project_milestones(pid):
    try:
        rows = execute_query("SELECT * FROM RE_Project_Milestones WHERE project_id = ? ORDER BY target_date", [pid])
        return jsonify({"data": serialize_rows(rows)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/milestones", methods=["POST"])
def create_milestone():
    return generic_create("RE_Project_Milestones", "milestone_id")

@app.route("/api/milestones/<int:id>", methods=["PUT"])
def update_milestone(id):
    return generic_update("RE_Project_Milestones", "milestone_id", id)

# ============================================================================
# MODULE 2: FINANCIAL MANAGEMENT
# ============================================================================
@app.route("/api/financial/accounts", methods=["GET"])
def list_accounts():
    return generic_list("RE_Financial_Accounts", "account_id")

@app.route("/api/financial/accounts", methods=["POST"])
def create_account():
    return generic_create("RE_Financial_Accounts", "account_id")

@app.route("/api/financial/transactions", methods=["GET"])
def list_transactions():
    return generic_list("RE_Financial_Transactions", "transaction_id", "transaction_date")

@app.route("/api/financial/transactions", methods=["POST"])
def create_transaction():
    return generic_create("RE_Financial_Transactions", "transaction_id")

@app.route("/api/financial/invoices", methods=["GET"])
def list_invoices():
    return generic_list("RE_Invoices", "invoice_id")

@app.route("/api/financial/invoices", methods=["POST"])
def create_invoice():
    return generic_create("RE_Invoices", "invoice_id")

@app.route("/api/financial/invoices/<int:id>", methods=["PUT"])
def update_invoice(id):
    return generic_update("RE_Invoices", "invoice_id", id)

@app.route("/api/financial/budgets", methods=["GET"])
def list_budgets():
    return generic_list("RE_Budgets", "budget_id")

@app.route("/api/financial/budgets", methods=["POST"])
def create_budget():
    return generic_create("RE_Budgets", "budget_id")

@app.route("/api/financial/summary", methods=["GET"])
def financial_summary():
    try:
        accounts = execute_query("SELECT account_type, SUM(balance) as total FROM RE_Financial_Accounts GROUP BY account_type")
        return jsonify({"data": serialize_rows(accounts)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============================================================================
# MODULE 3: CRM
# ============================================================================
@app.route("/api/customers", methods=["GET"])
def list_customers():
    return generic_list("RE_Customers", "customer_id")

@app.route("/api/customers/<int:id>", methods=["GET"])
def get_customer(id):
    return generic_get("RE_Customers", "customer_id", id)

@app.route("/api/customers", methods=["POST"])
def create_customer():
    return generic_create("RE_Customers", "customer_id")

@app.route("/api/customers/<int:id>", methods=["PUT"])
def update_customer(id):
    return generic_update("RE_Customers", "customer_id", id)

@app.route("/api/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):
    return generic_delete("RE_Customers", "customer_id", id)

# Leads
@app.route("/api/leads", methods=["GET"])
def list_leads():
    return generic_list("RE_Leads", "lead_id")

@app.route("/api/leads/<int:id>", methods=["GET"])
def get_lead(id):
    return generic_get("RE_Leads", "lead_id", id)

@app.route("/api/leads", methods=["POST"])
def create_lead():
    return generic_create("RE_Leads", "lead_id")

@app.route("/api/leads/<int:id>", methods=["PUT"])
def update_lead(id):
    return generic_update("RE_Leads", "lead_id", id)

@app.route("/api/leads/<int:id>", methods=["DELETE"])
def delete_lead(id):
    return generic_delete("RE_Leads", "lead_id", id)

# Interactions
@app.route("/api/interactions", methods=["GET"])
def list_interactions():
    return generic_list("RE_Interactions", "interaction_id")

@app.route("/api/interactions", methods=["POST"])
def create_interaction():
    return generic_create("RE_Interactions", "interaction_id")

# ============================================================================
# MODULE 4: PROPERTY MANAGEMENT
# ============================================================================
@app.route("/api/properties", methods=["GET"])
def list_properties():
    return generic_list("RE_Properties", "property_id")

@app.route("/api/properties/<int:id>", methods=["GET"])
def get_property(id):
    return generic_get("RE_Properties", "property_id", id)

@app.route("/api/properties", methods=["POST"])
def create_property():
    return generic_create("RE_Properties", "property_id")

@app.route("/api/properties/<int:id>", methods=["PUT"])
def update_property(id):
    return generic_update("RE_Properties", "property_id", id)

@app.route("/api/properties/<int:id>", methods=["DELETE"])
def delete_property(id):
    return generic_delete("RE_Properties", "property_id", id)

# ============================================================================
# MODULE 5: LAND ACQUISITION
# ============================================================================
@app.route("/api/land-acquisitions", methods=["GET"])
def list_land():
    return generic_list("RE_Land_Acquisitions", "acquisition_id")

@app.route("/api/land-acquisitions/<int:id>", methods=["GET"])
def get_land(id):
    return generic_get("RE_Land_Acquisitions", "acquisition_id", id)

@app.route("/api/land-acquisitions", methods=["POST"])
def create_land():
    return generic_create("RE_Land_Acquisitions", "acquisition_id")

@app.route("/api/land-acquisitions/<int:id>", methods=["PUT"])
def update_land(id):
    return generic_update("RE_Land_Acquisitions", "acquisition_id", id)

@app.route("/api/land-acquisitions/<int:id>", methods=["DELETE"])
def delete_land(id):
    return generic_delete("RE_Land_Acquisitions", "acquisition_id", id)

# ============================================================================
# MODULE 6: BIDDING & PROCUREMENT
# ============================================================================
@app.route("/api/vendors", methods=["GET"])
def list_vendors():
    return generic_list("RE_Vendors", "vendor_id")

@app.route("/api/vendors/<int:id>", methods=["GET"])
def get_vendor(id):
    return generic_get("RE_Vendors", "vendor_id", id)

@app.route("/api/vendors", methods=["POST"])
def create_vendor():
    return generic_create("RE_Vendors", "vendor_id")

@app.route("/api/vendors/<int:id>", methods=["PUT"])
def update_vendor(id):
    return generic_update("RE_Vendors", "vendor_id", id)

@app.route("/api/bids", methods=["GET"])
def list_bids():
    return generic_list("RE_Bids", "bid_id")

@app.route("/api/bids", methods=["POST"])
def create_bid():
    return generic_create("RE_Bids", "bid_id")

@app.route("/api/bids/<int:id>", methods=["PUT"])
def update_bid(id):
    return generic_update("RE_Bids", "bid_id", id)

@app.route("/api/purchase-orders", methods=["GET"])
def list_pos():
    return generic_list("RE_Purchase_Orders", "po_id")

@app.route("/api/purchase-orders", methods=["POST"])
def create_po():
    return generic_create("RE_Purchase_Orders", "po_id")

@app.route("/api/purchase-orders/<int:id>", methods=["PUT"])
def update_po(id):
    return generic_update("RE_Purchase_Orders", "po_id", id)

# ============================================================================
# MODULE 7: CONSTRUCTION MANAGEMENT
# ============================================================================
@app.route("/api/construction/activities", methods=["GET"])
def list_construction():
    return generic_list("RE_Construction_Activities", "activity_id")

@app.route("/api/construction/activities", methods=["POST"])
def create_construction():
    return generic_create("RE_Construction_Activities", "activity_id")

@app.route("/api/construction/activities/<int:id>", methods=["PUT"])
def update_construction(id):
    return generic_update("RE_Construction_Activities", "activity_id", id)

@app.route("/api/construction/daily-logs", methods=["GET"])
def list_daily_logs():
    return generic_list("RE_Daily_Logs", "log_id", "log_date")

@app.route("/api/construction/daily-logs", methods=["POST"])
def create_daily_log():
    return generic_create("RE_Daily_Logs", "log_id")

# ============================================================================
# MODULE 8: PROJECT CONTROLS
# ============================================================================
@app.route("/api/project-controls", methods=["GET"])
def list_controls():
    return generic_list("RE_Project_Controls", "control_id", "control_date")

@app.route("/api/project-controls", methods=["POST"])
def create_control():
    return generic_create("RE_Project_Controls", "control_id")

@app.route("/api/risks", methods=["GET"])
def list_risks():
    return generic_list("RE_Risk_Register", "risk_id")

@app.route("/api/risks", methods=["POST"])
def create_risk():
    return generic_create("RE_Risk_Register", "risk_id")

@app.route("/api/risks/<int:id>", methods=["PUT"])
def update_risk(id):
    return generic_update("RE_Risk_Register", "risk_id", id)

# ============================================================================
# MODULE 9: ASSET MANAGEMENT
# ============================================================================
@app.route("/api/assets", methods=["GET"])
def list_assets():
    return generic_list("RE_Assets", "asset_id")

@app.route("/api/assets/<int:id>", methods=["GET"])
def get_asset(id):
    return generic_get("RE_Assets", "asset_id", id)

@app.route("/api/assets", methods=["POST"])
def create_asset():
    return generic_create("RE_Assets", "asset_id")

@app.route("/api/assets/<int:id>", methods=["PUT"])
def update_asset(id):
    return generic_update("RE_Assets", "asset_id", id)

# ============================================================================
# MODULE 10: PROPERTY VALUATION
# ============================================================================
@app.route("/api/valuations", methods=["GET"])
def list_valuations():
    return generic_list("RE_Valuations", "valuation_id", "valuation_date")

@app.route("/api/valuations", methods=["POST"])
def create_valuation():
    return generic_create("RE_Valuations", "valuation_id")

@app.route("/api/valuations/<int:id>", methods=["PUT"])
def update_valuation(id):
    return generic_update("RE_Valuations", "valuation_id", id)

# ============================================================================
# MODULE 11: LEASE & RENTAL MANAGEMENT
# ============================================================================
@app.route("/api/leases", methods=["GET"])
def list_leases():
    return generic_list("RE_Leases", "lease_id")

@app.route("/api/leases/<int:id>", methods=["GET"])
def get_lease(id):
    return generic_get("RE_Leases", "lease_id", id)

@app.route("/api/leases", methods=["POST"])
def create_lease():
    return generic_create("RE_Leases", "lease_id")

@app.route("/api/leases/<int:id>", methods=["PUT"])
def update_lease(id):
    return generic_update("RE_Leases", "lease_id", id)

@app.route("/api/rent-payments", methods=["GET"])
def list_rent_payments():
    return generic_list("RE_Rent_Payments", "payment_id", "payment_date")

@app.route("/api/rent-payments", methods=["POST"])
def create_rent_payment():
    return generic_create("RE_Rent_Payments", "payment_id")

# ============================================================================
# MODULE 12: SALES MANAGEMENT
# ============================================================================
@app.route("/api/sales", methods=["GET"])
def list_sales():
    return generic_list("RE_Sales", "sale_id", "sale_date")

@app.route("/api/sales/<int:id>", methods=["GET"])
def get_sale(id):
    return generic_get("RE_Sales", "sale_id", id)

@app.route("/api/sales", methods=["POST"])
def create_sale():
    return generic_create("RE_Sales", "sale_id")

@app.route("/api/sales/<int:id>", methods=["PUT"])
def update_sale(id):
    return generic_update("RE_Sales", "sale_id", id)

@app.route("/api/payment-plans", methods=["GET"])
def list_payment_plans():
    return generic_list("RE_Payment_Plans", "plan_id", "due_date")

@app.route("/api/payment-plans", methods=["POST"])
def create_payment_plan():
    return generic_create("RE_Payment_Plans", "plan_id")

@app.route("/api/payment-plans/<int:id>", methods=["PUT"])
def update_payment_plan(id):
    return generic_update("RE_Payment_Plans", "plan_id", id)

# ============================================================================
# MODULE 13: MARKETING AUTOMATION
# ============================================================================
@app.route("/api/campaigns", methods=["GET"])
def list_campaigns():
    return generic_list("RE_Marketing_Campaigns", "campaign_id")

@app.route("/api/campaigns/<int:id>", methods=["GET"])
def get_campaign(id):
    return generic_get("RE_Marketing_Campaigns", "campaign_id", id)

@app.route("/api/campaigns", methods=["POST"])
def create_campaign():
    return generic_create("RE_Marketing_Campaigns", "campaign_id")

@app.route("/api/campaigns/<int:id>", methods=["PUT"])
def update_campaign(id):
    return generic_update("RE_Marketing_Campaigns", "campaign_id", id)

@app.route("/api/campaigns/<int:id>", methods=["DELETE"])
def delete_campaign(id):
    return generic_delete("RE_Marketing_Campaigns", "campaign_id", id)

# ============================================================================
# MODULE 14: OPPORTUNITY MANAGEMENT
# ============================================================================
@app.route("/api/opportunities", methods=["GET"])
def list_opportunities():
    return generic_list("RE_Opportunities", "opportunity_id")

@app.route("/api/opportunities/<int:id>", methods=["GET"])
def get_opportunity(id):
    return generic_get("RE_Opportunities", "opportunity_id", id)

@app.route("/api/opportunities", methods=["POST"])
def create_opportunity():
    return generic_create("RE_Opportunities", "opportunity_id")

@app.route("/api/opportunities/<int:id>", methods=["PUT"])
def update_opportunity(id):
    return generic_update("RE_Opportunities", "opportunity_id", id)

# ============================================================================
# MODULE 15: HCM & PAYROLL
# ============================================================================
@app.route("/api/employees", methods=["GET"])
def list_employees():
    return generic_list("RE_Employees", "employee_id")

@app.route("/api/employees/<int:id>", methods=["GET"])
def get_employee(id):
    return generic_get("RE_Employees", "employee_id", id)

@app.route("/api/employees", methods=["POST"])
def create_employee():
    return generic_create("RE_Employees", "employee_id")

@app.route("/api/employees/<int:id>", methods=["PUT"])
def update_employee(id):
    return generic_update("RE_Employees", "employee_id", id)

@app.route("/api/payroll", methods=["GET"])
def list_payroll():
    return generic_list("RE_Payroll", "payroll_id", "pay_period_end")

@app.route("/api/payroll", methods=["POST"])
def create_payroll():
    return generic_create("RE_Payroll", "payroll_id")

@app.route("/api/attendance", methods=["GET"])
def list_attendance():
    return generic_list("RE_Attendance", "attendance_id", "attendance_date")

@app.route("/api/attendance", methods=["POST"])
def create_attendance():
    return generic_create("RE_Attendance", "attendance_id")

# ============================================================================
# MODULE 16: LEGAL & COMPLIANCE
# ============================================================================
@app.route("/api/contracts", methods=["GET"])
def list_contracts():
    return generic_list("RE_Contracts", "contract_id")

@app.route("/api/contracts/<int:id>", methods=["GET"])
def get_contract(id):
    return generic_get("RE_Contracts", "contract_id", id)

@app.route("/api/contracts", methods=["POST"])
def create_contract():
    return generic_create("RE_Contracts", "contract_id")

@app.route("/api/contracts/<int:id>", methods=["PUT"])
def update_contract(id):
    return generic_update("RE_Contracts", "contract_id", id)

@app.route("/api/compliance", methods=["GET"])
def list_compliance():
    return generic_list("RE_Compliance_Records", "compliance_id")

@app.route("/api/compliance", methods=["POST"])
def create_compliance():
    return generic_create("RE_Compliance_Records", "compliance_id")

@app.route("/api/compliance/<int:id>", methods=["PUT"])
def update_compliance(id):
    return generic_update("RE_Compliance_Records", "compliance_id", id)

# ============================================================================
# MODULE 17: DOCUMENT MANAGEMENT
# ============================================================================
@app.route("/api/documents", methods=["GET"])
def list_documents():
    return generic_list("RE_Documents", "document_id")

@app.route("/api/documents/<int:id>", methods=["GET"])
def get_document(id):
    return generic_get("RE_Documents", "document_id", id)

@app.route("/api/documents", methods=["POST"])
def create_document():
    return generic_create("RE_Documents", "document_id")

@app.route("/api/documents/<int:id>", methods=["PUT"])
def update_document(id):
    return generic_update("RE_Documents", "document_id", id)

@app.route("/api/documents/<int:id>", methods=["DELETE"])
def delete_document(id):
    return generic_delete("RE_Documents", "document_id", id)

# ============================================================================
# MODULE 18: INVENTORY MANAGEMENT
# ============================================================================
@app.route("/api/inventory", methods=["GET"])
def list_inventory():
    return generic_list("RE_Inventory", "inventory_id")

@app.route("/api/inventory/<int:id>", methods=["GET"])
def get_inventory(id):
    return generic_get("RE_Inventory", "inventory_id", id)

@app.route("/api/inventory", methods=["POST"])
def create_inventory():
    return generic_create("RE_Inventory", "inventory_id")

@app.route("/api/inventory/<int:id>", methods=["PUT"])
def update_inventory(id):
    return generic_update("RE_Inventory", "inventory_id", id)

@app.route("/api/inventory/transactions", methods=["GET"])
def list_inv_txns():
    return generic_list("RE_Inventory_Transactions", "inv_txn_id", "transaction_date")

@app.route("/api/inventory/transactions", methods=["POST"])
def create_inv_txn():
    return generic_create("RE_Inventory_Transactions", "inv_txn_id")

# ============================================================================
# MODULE 19: HELPDESK / FACILITY MANAGEMENT
# ============================================================================
@app.route("/api/helpdesk/tickets", methods=["GET"])
def list_tickets():
    return generic_list("RE_Helpdesk_Tickets", "ticket_id", "reported_date")

@app.route("/api/helpdesk/tickets/<int:id>", methods=["GET"])
def get_ticket(id):
    return generic_get("RE_Helpdesk_Tickets", "ticket_id", id)

@app.route("/api/helpdesk/tickets", methods=["POST"])
def create_ticket():
    return generic_create("RE_Helpdesk_Tickets", "ticket_id")

@app.route("/api/helpdesk/tickets/<int:id>", methods=["PUT"])
def update_ticket(id):
    return generic_update("RE_Helpdesk_Tickets", "ticket_id", id)

@app.route("/api/helpdesk/maintenance", methods=["GET"])
def list_maintenance():
    return generic_list("RE_Maintenance_Schedule", "schedule_id", "next_due_date")

@app.route("/api/helpdesk/maintenance", methods=["POST"])
def create_maintenance():
    return generic_create("RE_Maintenance_Schedule", "schedule_id")

@app.route("/api/helpdesk/maintenance/<int:id>", methods=["PUT"])
def update_maintenance(id):
    return generic_update("RE_Maintenance_Schedule", "schedule_id", id)

# ============================================================================
# MODULE 20: TENANT / USER PORTAL
# ============================================================================
@app.route("/api/tenants", methods=["GET"])
def list_tenants():
    return generic_list("RE_Tenants", "tenant_id")

@app.route("/api/tenants/<int:id>", methods=["GET"])
def get_tenant(id):
    return generic_get("RE_Tenants", "tenant_id", id)

@app.route("/api/tenants", methods=["POST"])
def create_tenant():
    return generic_create("RE_Tenants", "tenant_id")

@app.route("/api/tenants/<int:id>", methods=["PUT"])
def update_tenant(id):
    return generic_update("RE_Tenants", "tenant_id", id)

@app.route("/api/notifications", methods=["GET"])
def list_notifications():
    return generic_list("RE_Portal_Notifications", "notification_id")

@app.route("/api/notifications", methods=["POST"])
def create_notification():
    return generic_create("RE_Portal_Notifications", "notification_id")

# ============================================================================
# AUDIT LOG
# ============================================================================
@app.route("/api/audit-log", methods=["GET"])
def list_audit():
    return generic_list("RE_Audit_Log", "log_id", "performed_at")

# ============================================================================
# AI ASSISTANT
# ============================================================================
@app.route("/api/ai/chat", methods=["POST"])
def ai_chat():
    try:
        data = request.json
        message = data.get("message", "")
        module = data.get("module", None)
        session_id = data.get("session_id", None)
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        result = chat_with_ai(message, module, session_id)
        
        # Log the chat
        try:
            execute_insert(
                "INSERT INTO RE_AI_Chat_History (session_id, user_query, ai_response, module_context, tokens_used, model_used) VALUES (?, ?, ?, ?, ?, ?)",
                [session_id, message, json.dumps(result, default=str), module, result.get("tokens_used", 0), "gpt-4o"]
            )
        except:
            pass
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/ai/execute-mutation", methods=["POST"])
def ai_execute():
    try:
        data = request.json
        query = data.get("query", "")
        if not query:
            return jsonify({"error": "No query provided"}), 400
        result = execute_ai_mutation(query)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/ai/history", methods=["GET"])
def ai_history():
    return generic_list("RE_AI_Chat_History", "chat_id")

# ============================================================================
# SCHEMA INFO (for frontend dynamic forms)
# ============================================================================
@app.route("/api/schema/<table_name>", methods=["GET"])
def get_schema(table_name):
    try:
        cols = execute_query("""
            SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, 
                   COLUMNPROPERTY(OBJECT_ID(TABLE_SCHEMA + '.' + TABLE_NAME), COLUMN_NAME, 'IsIdentity') as is_identity
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = ?
            ORDER BY ORDINAL_POSITION
        """, [table_name])
        return jsonify({"data": serialize_rows(cols)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Register additional sub-module routes
from additional_routes import register_additional_routes
register_additional_routes(app, generic_list, generic_get, generic_create, generic_update, generic_delete)

from facility_routes import register_facility_routes
register_facility_routes(app)

from teller_cheque_routes import register_teller_cheque_routes
register_teller_cheque_routes(app)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"Starting Real Estate ERP Backend on {host}:{port}")
    app.run(host=host, port=port, debug=True)
