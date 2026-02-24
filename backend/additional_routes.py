"""
Additional API routes for sub-module pages.
These cover all the endpoints referenced by the frontend configs
that were not in the original app.py.
"""

def register_additional_routes(app, generic_list, generic_get, generic_create, generic_update, generic_delete):
    
    # ========== PROJECT MANAGEMENT SUB-PAGES ==========
    # /api/project-milestones - All milestones (not nested under project)
    @app.route("/api/project-milestones", methods=["GET"])
    def list_all_milestones():
        return generic_list("RE_Project_Milestones", "milestone_id", "target_date")

    @app.route("/api/project-milestones", methods=["POST"])
    def create_all_milestones():
        return generic_create("RE_Project_Milestones", "milestone_id")

    @app.route("/api/project-milestones/<int:id>", methods=["PUT"])
    def update_all_milestones(id):
        return generic_update("RE_Project_Milestones", "milestone_id", id)

    @app.route("/api/project-milestones/<int:id>", methods=["DELETE"])
    def delete_all_milestones(id):
        return generic_delete("RE_Project_Milestones", "milestone_id", id)

    # /api/project-tasks - All tasks (not nested under project)
    @app.route("/api/project-tasks", methods=["GET"])
    def list_all_project_tasks():
        return generic_list("RE_Project_Tasks", "task_id")

    @app.route("/api/project-tasks", methods=["POST"])
    def create_all_project_tasks():
        return generic_create("RE_Project_Tasks", "task_id")

    @app.route("/api/project-tasks/<int:id>", methods=["PUT"])
    def update_all_project_tasks(id):
        return generic_update("RE_Project_Tasks", "task_id", id)

    @app.route("/api/project-tasks/<int:id>", methods=["DELETE"])
    def delete_all_project_tasks(id):
        return generic_delete("RE_Project_Tasks", "task_id", id)

    # ========== FINANCIAL SUB-PAGES ==========
    @app.route("/api/financial/payments", methods=["GET"])
    def list_payments():
        return generic_list("RE_Financial_Transactions", "transaction_id", "transaction_date")

    @app.route("/api/financial/payments", methods=["POST"])
    def create_payment():
        return generic_create("RE_Financial_Transactions", "transaction_id")

    @app.route("/api/financial/payments/<int:id>", methods=["PUT"])
    def update_payment(id):
        return generic_update("RE_Financial_Transactions", "transaction_id", id)

    @app.route("/api/financial/reports", methods=["GET"])
    def list_financial_reports():
        return generic_list("RE_Financial_Transactions", "transaction_id", "transaction_date")

    # ========== PROPERTY SUB-PAGES ==========
    @app.route("/api/property-units", methods=["GET"])
    def list_property_units():
        return generic_list("RE_Property_Units", "unit_id")

    @app.route("/api/property-units", methods=["POST"])
    def create_property_unit():
        return generic_create("RE_Property_Units", "unit_id")

    @app.route("/api/property-units/<int:id>", methods=["PUT"])
    def update_property_unit(id):
        return generic_update("RE_Property_Units", "unit_id", id)

    @app.route("/api/property-units/<int:id>", methods=["DELETE"])
    def delete_property_unit(id):
        return generic_delete("RE_Property_Units", "unit_id", id)

    @app.route("/api/property-amenities", methods=["GET"])
    def list_property_amenities():
        return generic_list("RE_Property_Amenities", "amenity_id")

    @app.route("/api/property-amenities", methods=["POST"])
    def create_property_amenity():
        return generic_create("RE_Property_Amenities", "amenity_id")

    @app.route("/api/property-amenities/<int:id>", methods=["PUT"])
    def update_property_amenity(id):
        return generic_update("RE_Property_Amenities", "amenity_id", id)

    @app.route("/api/property-amenities/<int:id>", methods=["DELETE"])
    def delete_property_amenity(id):
        return generic_delete("RE_Property_Amenities", "amenity_id", id)

    @app.route("/api/property-inspections", methods=["GET"])
    def list_property_inspections():
        return generic_list("RE_Property_Inspections", "inspection_id", "inspection_date")

    @app.route("/api/property-inspections", methods=["POST"])
    def create_property_inspection():
        return generic_create("RE_Property_Inspections", "inspection_id")

    @app.route("/api/property-inspections/<int:id>", methods=["PUT"])
    def update_property_inspection(id):
        return generic_update("RE_Property_Inspections", "inspection_id", id)

    # ========== LAND ACQUISITION SUB-PAGES ==========
    @app.route("/api/land-negotiations", methods=["GET"])
    def list_land_negotiations():
        return generic_list("RE_Land_Negotiations", "negotiation_id")

    @app.route("/api/land-negotiations", methods=["POST"])
    def create_land_negotiation():
        return generic_create("RE_Land_Negotiations", "negotiation_id")

    @app.route("/api/land-negotiations/<int:id>", methods=["PUT"])
    def update_land_negotiation(id):
        return generic_update("RE_Land_Negotiations", "negotiation_id", id)

    @app.route("/api/land-due-diligence", methods=["GET"])
    def list_land_dd():
        return generic_list("RE_Land_Due_Diligence", "dd_id")

    @app.route("/api/land-due-diligence", methods=["POST"])
    def create_land_dd():
        return generic_create("RE_Land_Due_Diligence", "dd_id")

    @app.route("/api/land-due-diligence/<int:id>", methods=["PUT"])
    def update_land_dd(id):
        return generic_update("RE_Land_Due_Diligence", "dd_id", id)

    @app.route("/api/land-approvals", methods=["GET"])
    def list_land_approvals():
        return generic_list("RE_Land_Approvals", "approval_id")

    @app.route("/api/land-approvals", methods=["POST"])
    def create_land_approval():
        return generic_create("RE_Land_Approvals", "approval_id")

    @app.route("/api/land-approvals/<int:id>", methods=["PUT"])
    def update_land_approval(id):
        return generic_update("RE_Land_Approvals", "approval_id", id)

    # ========== PROCUREMENT SUB-PAGES ==========
    @app.route("/api/grn", methods=["GET"])
    def list_grn():
        return generic_list("RE_GRN", "grn_id", "received_date")

    @app.route("/api/grn", methods=["POST"])
    def create_grn():
        return generic_create("RE_GRN", "grn_id")

    @app.route("/api/grn/<int:id>", methods=["PUT"])
    def update_grn(id):
        return generic_update("RE_GRN", "grn_id", id)

    # ========== CONSTRUCTION SUB-PAGES ==========
    @app.route("/api/construction-activities", methods=["GET"])
    def list_construction_activities_flat():
        return generic_list("RE_Construction_Activities", "activity_id")

    @app.route("/api/construction-activities", methods=["POST"])
    def create_construction_activity_flat():
        return generic_create("RE_Construction_Activities", "activity_id")

    @app.route("/api/construction-activities/<int:id>", methods=["PUT"])
    def update_construction_activity_flat(id):
        return generic_update("RE_Construction_Activities", "activity_id", id)

    @app.route("/api/daily-logs", methods=["GET"])
    def list_daily_logs_flat():
        return generic_list("RE_Daily_Logs", "log_id", "log_date")

    @app.route("/api/daily-logs", methods=["POST"])
    def create_daily_log_flat():
        return generic_create("RE_Daily_Logs", "log_id")

    @app.route("/api/daily-logs/<int:id>", methods=["PUT"])
    def update_daily_log_flat(id):
        return generic_update("RE_Daily_Logs", "log_id", id)

    @app.route("/api/safety-incidents", methods=["GET"])
    def list_safety_incidents():
        return generic_list("RE_Safety_Incidents", "incident_id", "incident_date")

    @app.route("/api/safety-incidents", methods=["POST"])
    def create_safety_incident():
        return generic_create("RE_Safety_Incidents", "incident_id")

    @app.route("/api/safety-incidents/<int:id>", methods=["PUT"])
    def update_safety_incident(id):
        return generic_update("RE_Safety_Incidents", "incident_id", id)

    @app.route("/api/quality-inspections", methods=["GET"])
    def list_quality_inspections():
        return generic_list("RE_Quality_Inspections", "qi_id", "inspection_date")

    @app.route("/api/quality-inspections", methods=["POST"])
    def create_quality_inspection():
        return generic_create("RE_Quality_Inspections", "qi_id")

    @app.route("/api/quality-inspections/<int:id>", methods=["PUT"])
    def update_quality_inspection(id):
        return generic_update("RE_Quality_Inspections", "qi_id", id)

    @app.route("/api/equipment", methods=["GET"])
    def list_equipment():
        return generic_list("RE_Equipment", "equipment_id")

    @app.route("/api/equipment", methods=["POST"])
    def create_equipment():
        return generic_create("RE_Equipment", "equipment_id")

    @app.route("/api/equipment/<int:id>", methods=["PUT"])
    def update_equipment(id):
        return generic_update("RE_Equipment", "equipment_id", id)

    # ========== PROJECT CONTROLS SUB-PAGES ==========
    @app.route("/api/change-orders", methods=["GET"])
    def list_change_orders():
        return generic_list("RE_Change_Orders", "co_id")

    @app.route("/api/change-orders", methods=["POST"])
    def create_change_order():
        return generic_create("RE_Change_Orders", "co_id")

    @app.route("/api/change-orders/<int:id>", methods=["PUT"])
    def update_change_order(id):
        return generic_update("RE_Change_Orders", "co_id", id)

    # ========== ASSET SUB-PAGES ==========
    @app.route("/api/asset-depreciation", methods=["GET"])
    def list_asset_depreciation():
        return generic_list("RE_Asset_Depreciation", "depreciation_id")

    @app.route("/api/asset-depreciation", methods=["POST"])
    def create_asset_depreciation():
        return generic_create("RE_Asset_Depreciation", "depreciation_id")

    @app.route("/api/asset-depreciation/<int:id>", methods=["PUT"])
    def update_asset_depreciation(id):
        return generic_update("RE_Asset_Depreciation", "depreciation_id", id)

    @app.route("/api/asset-maintenance", methods=["GET"])
    def list_asset_maintenance():
        return generic_list("RE_Asset_Maintenance", "maintenance_id")

    @app.route("/api/asset-maintenance", methods=["POST"])
    def create_asset_maintenance():
        return generic_create("RE_Asset_Maintenance", "maintenance_id")

    @app.route("/api/asset-maintenance/<int:id>", methods=["PUT"])
    def update_asset_maintenance(id):
        return generic_update("RE_Asset_Maintenance", "maintenance_id", id)

    @app.route("/api/asset-transfers", methods=["GET"])
    def list_asset_transfers():
        return generic_list("RE_Asset_Transfers", "transfer_id")

    @app.route("/api/asset-transfers", methods=["POST"])
    def create_asset_transfer():
        return generic_create("RE_Asset_Transfers", "transfer_id")

    @app.route("/api/asset-transfers/<int:id>", methods=["PUT"])
    def update_asset_transfer(id):
        return generic_update("RE_Asset_Transfers", "transfer_id", id)

    # ========== CRM SUB-PAGES ==========
    @app.route("/api/follow-ups", methods=["GET"])
    def list_follow_ups():
        return generic_list("RE_Follow_Ups", "followup_id")

    @app.route("/api/follow-ups", methods=["POST"])
    def create_follow_up():
        return generic_create("RE_Follow_Ups", "followup_id")

    @app.route("/api/follow-ups/<int:id>", methods=["PUT"])
    def update_follow_up(id):
        return generic_update("RE_Follow_Ups", "followup_id", id)

    # ========== SALES SUB-PAGES ==========
    @app.route("/api/handovers", methods=["GET"])
    def list_handovers():
        return generic_list("RE_Handovers", "handover_id")

    @app.route("/api/handovers", methods=["POST"])
    def create_handover():
        return generic_create("RE_Handovers", "handover_id")

    @app.route("/api/handovers/<int:id>", methods=["PUT"])
    def update_handover(id):
        return generic_update("RE_Handovers", "handover_id", id)

    # ========== LEGAL SUB-PAGES ==========
    @app.route("/api/permits", methods=["GET"])
    def list_permits():
        return generic_list("RE_Permits", "permit_id")

    @app.route("/api/permits", methods=["POST"])
    def create_permit():
        return generic_create("RE_Permits", "permit_id")

    @app.route("/api/permits/<int:id>", methods=["PUT"])
    def update_permit(id):
        return generic_update("RE_Permits", "permit_id", id)

    @app.route("/api/disputes", methods=["GET"])
    def list_disputes():
        return generic_list("RE_Disputes", "dispute_id")

    @app.route("/api/disputes", methods=["POST"])
    def create_dispute():
        return generic_create("RE_Disputes", "dispute_id")

    @app.route("/api/disputes/<int:id>", methods=["PUT"])
    def update_dispute(id):
        return generic_update("RE_Disputes", "dispute_id", id)

    @app.route("/api/noc", methods=["GET"])
    def list_noc():
        return generic_list("RE_NOC", "noc_id")

    @app.route("/api/noc", methods=["POST"])
    def create_noc():
        return generic_create("RE_NOC", "noc_id")

    @app.route("/api/noc/<int:id>", methods=["PUT"])
    def update_noc(id):
        return generic_update("RE_NOC", "noc_id", id)

    # ========== HR SUB-PAGES ==========
    @app.route("/api/leaves", methods=["GET"])
    def list_leaves():
        return generic_list("RE_Leaves", "leave_id")

    @app.route("/api/leaves", methods=["POST"])
    def create_leave():
        return generic_create("RE_Leaves", "leave_id")

    @app.route("/api/leaves/<int:id>", methods=["PUT"])
    def update_leave(id):
        return generic_update("RE_Leaves", "leave_id", id)

    @app.route("/api/recruitment", methods=["GET"])
    def list_recruitment():
        return generic_list("RE_Recruitment", "recruitment_id")

    @app.route("/api/recruitment", methods=["POST"])
    def create_recruitment():
        return generic_create("RE_Recruitment", "recruitment_id")

    @app.route("/api/recruitment/<int:id>", methods=["PUT"])
    def update_recruitment(id):
        return generic_update("RE_Recruitment", "recruitment_id", id)

    # ========== INVENTORY SUB-PAGES ==========
    @app.route("/api/inventory-transactions", methods=["GET"])
    def list_inv_transactions():
        return generic_list("RE_Inventory_Transactions", "inv_txn_id", "transaction_date")

    @app.route("/api/inventory-transactions", methods=["POST"])
    def create_inv_transaction():
        return generic_create("RE_Inventory_Transactions", "inv_txn_id")

    @app.route("/api/warehouses", methods=["GET"])
    def list_warehouses():
        return generic_list("RE_Warehouses", "warehouse_id")

    @app.route("/api/warehouses", methods=["POST"])
    def create_warehouse():
        return generic_create("RE_Warehouses", "warehouse_id")

    @app.route("/api/warehouses/<int:id>", methods=["PUT"])
    def update_warehouse(id):
        return generic_update("RE_Warehouses", "warehouse_id", id)

    @app.route("/api/material-requisitions", methods=["GET"])
    def list_material_requisitions():
        return generic_list("RE_Material_Requisitions", "requisition_id")

    @app.route("/api/material-requisitions", methods=["POST"])
    def create_material_requisition():
        return generic_create("RE_Material_Requisitions", "requisition_id")

    @app.route("/api/material-requisitions/<int:id>", methods=["PUT"])
    def update_material_requisition(id):
        return generic_update("RE_Material_Requisitions", "requisition_id", id)

    # ========== HELPDESK SUB-PAGES ==========
    @app.route("/api/tickets", methods=["GET"])
    def list_tickets_flat():
        return generic_list("RE_Helpdesk_Tickets", "ticket_id", "reported_date")

    @app.route("/api/tickets", methods=["POST"])
    def create_ticket_flat():
        return generic_create("RE_Helpdesk_Tickets", "ticket_id")

    @app.route("/api/tickets/<int:id>", methods=["PUT"])
    def update_ticket_flat(id):
        return generic_update("RE_Helpdesk_Tickets", "ticket_id", id)

    @app.route("/api/work-orders", methods=["GET"])
    def list_work_orders():
        return generic_list("RE_Work_Orders", "work_order_id")

    @app.route("/api/work-orders", methods=["POST"])
    def create_work_order():
        return generic_create("RE_Work_Orders", "work_order_id")

    @app.route("/api/work-orders/<int:id>", methods=["PUT"])
    def update_work_order(id):
        return generic_update("RE_Work_Orders", "work_order_id", id)

    # ========== TENANT SUB-PAGES ==========
    @app.route("/api/service-requests", methods=["GET"])
    def list_service_requests():
        return generic_list("RE_Service_Requests", "request_id")

    @app.route("/api/service-requests", methods=["POST"])
    def create_service_request():
        return generic_create("RE_Service_Requests", "request_id")

    @app.route("/api/service-requests/<int:id>", methods=["PUT"])
    def update_service_request(id):
        return generic_update("RE_Service_Requests", "request_id", id)

    print(f"  Registered additional routes successfully")
