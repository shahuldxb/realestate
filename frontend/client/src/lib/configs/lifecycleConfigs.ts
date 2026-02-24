import type { SubPageConfig } from "@/components/ModuleSubPage";

// ============ M6: BIDDING & PROCUREMENT ============
const P = "Bidding & Procurement";

export const vendorMaster: SubPageConfig = {
  title: "Vendor Master", description: "Manage vendor profiles and ratings",
  endpoint: "/vendors", idField: "vendor_id", entityName: "Vendor",
  breadcrumb: { module: P, page: "Vendor Master" },
  columns: [
    { key: "vendor_name", label: "Vendor" }, { key: "vendor_type", label: "Type", type: "badge" },
    { key: "contact_person", label: "Contact" }, { key: "email", label: "Email" },
    { key: "phone", label: "Phone" }, { key: "city", label: "City" },
    { key: "rating", label: "Rating", type: "number" },
  ],
  formFields: [
    { name: "vendor_name", label: "Vendor Name", required: true },
    { name: "vendor_type", label: "Type", type: "select", options: [
      { value: "Contractor", label: "Contractor" }, { value: "Supplier", label: "Supplier" },
      { value: "Consultant", label: "Consultant" }, { value: "Sub-Contractor", label: "Sub-Contractor" },
    ]},
    { name: "contact_person", label: "Contact Person" }, { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" }, { name: "address", label: "Address", type: "textarea", width: "full" },
    { name: "city", label: "City" }, { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "tax_registration_no", label: "Tax Reg #" }, { name: "rating", label: "Rating (1-5)", type: "number" },
  ],
  detailFields: [
    { key: "vendor_id", label: "ID" }, { key: "vendor_name", label: "Name" }, { key: "vendor_type", label: "Type" },
    { key: "contact_person", label: "Contact" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "city", label: "City" }, { key: "rating", label: "Rating", type: "number" },
  ],
};

export const bidManagement: SubPageConfig = {
  title: "Bid Management", description: "Create and manage bid requests and submissions",
  endpoint: "/bids", idField: "bid_id", entityName: "Bid",
  breadcrumb: { module: P, page: "Bid Management" },
  columns: [
    { key: "bid_number", label: "Bid #" }, { key: "bid_title", label: "Title" },
    { key: "vendor_name", label: "Vendor" }, { key: "bid_amount", label: "Amount", type: "currency" },
    { key: "submission_date", label: "Submitted", type: "date" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "vendor_id", label: "Vendor ID", type: "number", required: true },
    { name: "bid_number", label: "Bid Number", required: true },
    { name: "bid_title", label: "Bid Title", required: true },
    { name: "bid_amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "submission_date", label: "Submission Date", type: "date" },
    { name: "validity_date", label: "Validity Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Submitted", label: "Submitted" },
      { value: "Under Review", label: "Under Review" }, { value: "Awarded", label: "Awarded" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "scope_of_work", label: "Scope of Work", type: "textarea", width: "full" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "bid_id", label: "ID" }, { key: "bid_number", label: "Bid #" }, { key: "bid_title", label: "Title" },
    { key: "bid_amount", label: "Amount", type: "currency" }, { key: "submission_date", label: "Submitted", type: "date" },
    { key: "validity_date", label: "Valid Until", type: "date" }, { key: "status", label: "Status", type: "status" },
    { key: "scope_of_work", label: "Scope" },
  ],
};

export const purchaseOrders: SubPageConfig = {
  title: "Purchase Orders", description: "Create and track purchase orders",
  endpoint: "/purchase-orders", idField: "po_id", entityName: "Purchase Order",
  breadcrumb: { module: P, page: "Purchase Orders" },
  columns: [
    { key: "po_number", label: "PO #" }, { key: "vendor_name", label: "Vendor" },
    { key: "order_date", label: "Date", type: "date" }, { key: "total_amount", label: "Amount", type: "currency" },
    { key: "delivery_date", label: "Delivery", type: "date" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "vendor_id", label: "Vendor ID", type: "number", required: true },
    { name: "po_number", label: "PO Number", required: true },
    { name: "order_date", label: "Order Date", type: "date", required: true },
    { name: "delivery_date", label: "Expected Delivery", type: "date" },
    { name: "total_amount", label: "Total Amount (AED)", type: "currency", required: true },
    { name: "tax_amount", label: "Tax (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Approved", label: "Approved" },
      { value: "Ordered", label: "Ordered" }, { value: "Received", label: "Received" }, { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "terms", label: "Terms & Conditions", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "po_id", label: "ID" }, { key: "po_number", label: "PO #" },
    { key: "order_date", label: "Date", type: "date" }, { key: "delivery_date", label: "Delivery", type: "date" },
    { key: "total_amount", label: "Total", type: "currency" }, { key: "tax_amount", label: "Tax", type: "currency" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const goodsReceivedNotes: SubPageConfig = {
  title: "Goods Received Notes", description: "Record goods received against purchase orders",
  endpoint: "/grn", idField: "grn_id", entityName: "GRN",
  breadcrumb: { module: P, page: "Goods Received Notes" },
  columns: [
    { key: "grn_number", label: "GRN #" }, { key: "po_number", label: "PO #" },
    { key: "received_date", label: "Received", type: "date" }, { key: "received_by", label: "Received By" },
    { key: "status", label: "Status", type: "status" }, { key: "total_qty", label: "Qty", type: "number" },
  ],
  formFields: [
    { name: "po_id", label: "PO ID", type: "number", required: true },
    { name: "grn_number", label: "GRN Number", required: true },
    { name: "received_date", label: "Received Date", type: "date", required: true },
    { name: "received_by", label: "Received By", required: true },
    { name: "total_qty", label: "Total Quantity", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Partial", label: "Partial" }, { value: "Complete", label: "Complete" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "remarks", label: "Remarks", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "grn_id", label: "ID" }, { key: "grn_number", label: "GRN #" },
    { key: "received_date", label: "Received", type: "date" }, { key: "received_by", label: "By" },
    { key: "total_qty", label: "Qty", type: "number" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const bidComparisons: SubPageConfig = {
  title: "Bid Comparisons", description: "Compare bids side-by-side for evaluation",
  endpoint: "/bids", idField: "bid_id", entityName: "Bid",
  breadcrumb: { module: P, page: "Bid Comparisons" },
  columns: bidManagement.columns,
  formFields: bidManagement.formFields,
  detailFields: bidManagement.detailFields,
};

// ============ M7: CONSTRUCTION MANAGEMENT ============
const C = "Construction Mgmt";

export const activityTracker: SubPageConfig = {
  title: "Activity Tracker", description: "Track construction activities and progress",
  endpoint: "/construction-activities", idField: "activity_id", entityName: "Activity",
  breadcrumb: { module: C, page: "Activity Tracker" },
  columns: [
    { key: "activity_name", label: "Activity" }, { key: "category", label: "Category", type: "badge" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" }, { key: "status", label: "Status", type: "status" },
    { key: "assigned_contractor", label: "Contractor" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "activity_name", label: "Activity Name", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { value: "Foundation", label: "Foundation" }, { value: "Structure", label: "Structure" },
      { value: "MEP", label: "MEP" }, { value: "Finishing", label: "Finishing" }, { value: "Landscaping", label: "Landscaping" },
    ]},
    { name: "start_date", label: "Start Date", type: "date" }, { name: "end_date", label: "End Date", type: "date" },
    { name: "progress_pct", label: "Progress (%)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Not Started", label: "Not Started" }, { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" }, { value: "Delayed", label: "Delayed" },
    ]},
    { name: "assigned_contractor", label: "Contractor" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "activity_id", label: "ID" }, { key: "activity_name", label: "Activity" }, { key: "category", label: "Category" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" }, { key: "status", label: "Status", type: "status" },
    { key: "assigned_contractor", label: "Contractor" },
  ],
};

export const dailySiteLogs: SubPageConfig = {
  title: "Daily Site Logs", description: "Record daily construction site activities",
  endpoint: "/daily-logs", idField: "log_id", entityName: "Daily Log",
  breadcrumb: { module: C, page: "Daily Site Logs" },
  columns: [
    { key: "log_date", label: "Date", type: "date" }, { key: "weather", label: "Weather", type: "badge" },
    { key: "workers_count", label: "Workers", type: "number" }, { key: "supervisor", label: "Supervisor" },
    { key: "work_summary", label: "Summary" }, { key: "issues", label: "Issues" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "log_date", label: "Date", type: "date", required: true },
    { name: "weather", label: "Weather", type: "select", options: [
      { value: "Clear", label: "Clear" }, { value: "Cloudy", label: "Cloudy" },
      { value: "Rain", label: "Rain" }, { value: "Hot", label: "Hot" }, { value: "Sandstorm", label: "Sandstorm" },
    ]},
    { name: "workers_count", label: "Workers on Site", type: "number" },
    { name: "supervisor", label: "Supervisor" },
    { name: "work_summary", label: "Work Summary", type: "textarea", width: "full" },
    { name: "materials_used", label: "Materials Used", type: "textarea", width: "full" },
    { name: "issues", label: "Issues", type: "textarea", width: "full" },
    { name: "safety_notes", label: "Safety Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "log_id", label: "ID" }, { key: "log_date", label: "Date", type: "date" },
    { key: "weather", label: "Weather" }, { key: "workers_count", label: "Workers", type: "number" },
    { key: "supervisor", label: "Supervisor" }, { key: "work_summary", label: "Summary" },
    { key: "materials_used", label: "Materials" }, { key: "issues", label: "Issues" },
  ],
};

export const safetyIncidents: SubPageConfig = {
  title: "Safety Incidents", description: "Report and track safety incidents on site",
  endpoint: "/safety-incidents", idField: "incident_id", entityName: "Incident",
  breadcrumb: { module: C, page: "Safety Incidents" },
  columns: [
    { key: "incident_date", label: "Date", type: "date" }, { key: "severity", label: "Severity", type: "status" },
    { key: "incident_type", label: "Type", type: "badge" }, { key: "location", label: "Location" },
    { key: "reported_by", label: "Reported By" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "incident_date", label: "Date", type: "date", required: true },
    { name: "incident_type", label: "Type", type: "select", options: [
      { value: "Fall", label: "Fall" }, { value: "Electrical", label: "Electrical" },
      { value: "Fire", label: "Fire" }, { value: "Equipment", label: "Equipment" }, { value: "Other", label: "Other" },
    ]},
    { name: "severity", label: "Severity", type: "select", options: [
      { value: "Minor", label: "Minor" }, { value: "Moderate", label: "Moderate" },
      { value: "Major", label: "Major" }, { value: "Critical", label: "Critical" },
    ]},
    { name: "location", label: "Location" }, { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "reported_by", label: "Reported By" }, { name: "injured_person", label: "Injured Person" },
    { name: "corrective_action", label: "Corrective Action", type: "textarea", width: "full" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" }, { value: "Investigating", label: "Investigating" },
      { value: "Resolved", label: "Resolved" }, { value: "Closed", label: "Closed" },
    ]},
  ],
  detailFields: [
    { key: "incident_id", label: "ID" }, { key: "incident_date", label: "Date", type: "date" },
    { key: "incident_type", label: "Type" }, { key: "severity", label: "Severity", type: "status" },
    { key: "location", label: "Location" }, { key: "description", label: "Description" },
    { key: "reported_by", label: "Reported By" }, { key: "corrective_action", label: "Action" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const qualityInspections: SubPageConfig = {
  title: "Quality Inspections", description: "Quality control inspections and results",
  endpoint: "/quality-inspections", idField: "qi_id", entityName: "Quality Inspection",
  breadcrumb: { module: C, page: "Quality Inspections" },
  columns: [
    { key: "inspection_date", label: "Date", type: "date" }, { key: "area", label: "Area" },
    { key: "inspection_type", label: "Type", type: "badge" }, { key: "inspector", label: "Inspector" },
    { key: "result", label: "Result", type: "status" }, { key: "score", label: "Score", type: "number" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "inspection_date", label: "Date", type: "date", required: true },
    { name: "area", label: "Area / Zone" },
    { name: "inspection_type", label: "Type", type: "select", options: [
      { value: "Structural", label: "Structural" }, { value: "MEP", label: "MEP" },
      { value: "Finishing", label: "Finishing" }, { value: "Safety", label: "Safety" },
    ]},
    { name: "inspector", label: "Inspector" },
    { name: "result", label: "Result", type: "select", options: [
      { value: "Pass", label: "Pass" }, { value: "Fail", label: "Fail" }, { value: "Conditional", label: "Conditional" },
    ]},
    { name: "score", label: "Score (0-100)", type: "number" },
    { name: "findings", label: "Findings", type: "textarea", width: "full" },
    { name: "corrective_actions", label: "Corrective Actions", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "qi_id", label: "ID" }, { key: "inspection_date", label: "Date", type: "date" },
    { key: "area", label: "Area" }, { key: "inspection_type", label: "Type" },
    { key: "inspector", label: "Inspector" }, { key: "result", label: "Result", type: "status" },
    { key: "score", label: "Score", type: "number" }, { key: "findings", label: "Findings" },
  ],
};

export const equipmentAllocation: SubPageConfig = {
  title: "Equipment Allocation", description: "Manage equipment assignment to projects",
  endpoint: "/equipment", idField: "equipment_id", entityName: "Equipment",
  breadcrumb: { module: C, page: "Equipment Allocation" },
  columns: [
    { key: "equipment_name", label: "Equipment" }, { key: "equipment_type", label: "Type", type: "badge" },
    { key: "serial_number", label: "Serial #" }, { key: "status", label: "Status", type: "status" },
    { key: "assigned_project", label: "Project" }, { key: "daily_rate", label: "Rate/Day", type: "currency" },
  ],
  formFields: [
    { name: "equipment_name", label: "Equipment Name", required: true },
    { name: "equipment_type", label: "Type", type: "select", options: [
      { value: "Crane", label: "Crane" }, { value: "Excavator", label: "Excavator" },
      { value: "Loader", label: "Loader" }, { value: "Mixer", label: "Mixer" }, { value: "Scaffolding", label: "Scaffolding" },
    ]},
    { name: "serial_number", label: "Serial Number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Available" }, { value: "In Use", label: "In Use" },
      { value: "Maintenance", label: "Maintenance" }, { value: "Retired", label: "Retired" },
    ]},
    { name: "assigned_project", label: "Assigned Project" },
    { name: "daily_rate", label: "Daily Rate (AED)", type: "currency" },
    { name: "last_maintenance", label: "Last Maintenance", type: "date" },
  ],
  detailFields: [
    { key: "equipment_id", label: "ID" }, { key: "equipment_name", label: "Equipment" },
    { key: "equipment_type", label: "Type" }, { key: "serial_number", label: "Serial #" },
    { key: "status", label: "Status", type: "status" }, { key: "assigned_project", label: "Project" },
    { key: "daily_rate", label: "Rate", type: "currency" }, { key: "last_maintenance", label: "Last Maint.", type: "date" },
  ],
};

// ============ M8: PROJECT CONTROLS ============
const CT = "Project Controls";

export const earnedValueAnalysis: SubPageConfig = {
  title: "Earned Value Analysis", description: "EVM metrics and performance indicators",
  endpoint: "/project-controls", idField: "control_id", entityName: "Control Record",
  breadcrumb: { module: CT, page: "Earned Value Analysis" },
  columns: [
    { key: "control_type", label: "Type", type: "badge" }, { key: "metric_name", label: "Metric" },
    { key: "planned_value", label: "PV", type: "currency" }, { key: "earned_value", label: "EV", type: "currency" },
    { key: "actual_cost", label: "AC", type: "currency" }, { key: "variance", label: "Variance", type: "currency" },
    { key: "report_date", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "control_type", label: "Type", type: "select", options: [
      { value: "Cost", label: "Cost" }, { value: "Schedule", label: "Schedule" }, { value: "Scope", label: "Scope" },
    ]},
    { name: "metric_name", label: "Metric Name", required: true },
    { name: "planned_value", label: "Planned Value (AED)", type: "currency" },
    { name: "earned_value", label: "Earned Value (AED)", type: "currency" },
    { name: "actual_cost", label: "Actual Cost (AED)", type: "currency" },
    { name: "variance", label: "Variance (AED)", type: "currency" },
    { name: "report_date", label: "Report Date", type: "date" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "control_id", label: "ID" }, { key: "control_type", label: "Type" }, { key: "metric_name", label: "Metric" },
    { key: "planned_value", label: "PV", type: "currency" }, { key: "earned_value", label: "EV", type: "currency" },
    { key: "actual_cost", label: "AC", type: "currency" }, { key: "variance", label: "Variance", type: "currency" },
    { key: "report_date", label: "Date", type: "date" },
  ],
};

export const riskRegister: SubPageConfig = {
  title: "Risk Register", description: "Identify, assess, and mitigate project risks",
  endpoint: "/risks", idField: "risk_id", entityName: "Risk",
  breadcrumb: { module: CT, page: "Risk Register" },
  columns: [
    { key: "risk_title", label: "Risk" }, { key: "category", label: "Category", type: "badge" },
    { key: "probability", label: "Probability", type: "status" }, { key: "impact", label: "Impact", type: "status" },
    { key: "risk_score", label: "Score", type: "number" }, { key: "status", label: "Status", type: "status" },
    { key: "owner", label: "Owner" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "risk_title", label: "Risk Title", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "category", label: "Category", type: "select", options: [
      { value: "Financial", label: "Financial" }, { value: "Technical", label: "Technical" },
      { value: "Schedule", label: "Schedule" }, { value: "Safety", label: "Safety" }, { value: "Legal", label: "Legal" },
    ]},
    { name: "probability", label: "Probability", type: "select", options: [
      { value: "Low", label: "Low" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" },
    ]},
    { name: "impact", label: "Impact", type: "select", options: [
      { value: "Low", label: "Low" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" }, { value: "Critical", label: "Critical" },
    ]},
    { name: "risk_score", label: "Risk Score (1-25)", type: "number" },
    { name: "mitigation_plan", label: "Mitigation Plan", type: "textarea", width: "full" },
    { name: "owner", label: "Owner" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" }, { value: "Mitigating", label: "Mitigating" },
      { value: "Closed", label: "Closed" }, { value: "Accepted", label: "Accepted" },
    ]},
  ],
  detailFields: [
    { key: "risk_id", label: "ID" }, { key: "risk_title", label: "Risk" }, { key: "category", label: "Category" },
    { key: "probability", label: "Probability" }, { key: "impact", label: "Impact" },
    { key: "risk_score", label: "Score", type: "number" }, { key: "mitigation_plan", label: "Mitigation" },
    { key: "owner", label: "Owner" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const changeOrders: SubPageConfig = {
  title: "Change Orders", description: "Track scope changes and their cost/schedule impact",
  endpoint: "/change-orders", idField: "co_id", entityName: "Change Order",
  breadcrumb: { module: CT, page: "Change Orders" },
  columns: [
    { key: "co_number", label: "CO #" }, { key: "title", label: "Title" },
    { key: "requested_by", label: "Requested By" }, { key: "cost_impact", label: "Cost Impact", type: "currency" },
    { key: "schedule_impact_days", label: "Days Impact", type: "number" },
    { key: "status", label: "Status", type: "status" }, { key: "request_date", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "co_number", label: "CO Number", required: true },
    { name: "title", label: "Title", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "requested_by", label: "Requested By" },
    { name: "request_date", label: "Request Date", type: "date" },
    { name: "cost_impact", label: "Cost Impact (AED)", type: "currency" },
    { name: "schedule_impact_days", label: "Schedule Impact (Days)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Requested", label: "Requested" }, { value: "Under Review", label: "Under Review" },
      { value: "Approved", label: "Approved" }, { value: "Rejected", label: "Rejected" }, { value: "Implemented", label: "Implemented" },
    ]},
    { name: "justification", label: "Justification", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "co_id", label: "ID" }, { key: "co_number", label: "CO #" }, { key: "title", label: "Title" },
    { key: "requested_by", label: "Requested By" }, { key: "request_date", label: "Date", type: "date" },
    { key: "cost_impact", label: "Cost", type: "currency" }, { key: "schedule_impact_days", label: "Days", type: "number" },
    { key: "status", label: "Status", type: "status" }, { key: "justification", label: "Justification" },
  ],
};

export const schedulePerformance: SubPageConfig = {
  title: "Schedule Performance", description: "Monitor schedule performance index (SPI)",
  endpoint: "/project-controls", idField: "control_id", entityName: "Control Record",
  breadcrumb: { module: CT, page: "Schedule Performance" },
  columns: earnedValueAnalysis.columns,
  formFields: earnedValueAnalysis.formFields,
  detailFields: earnedValueAnalysis.detailFields,
};

export const costReports: SubPageConfig = {
  title: "Cost Reports", description: "Detailed cost analysis and variance reports",
  endpoint: "/project-controls", idField: "control_id", entityName: "Control Record",
  breadcrumb: { module: CT, page: "Cost Reports" },
  columns: earnedValueAnalysis.columns,
  formFields: earnedValueAnalysis.formFields,
  detailFields: earnedValueAnalysis.detailFields,
};
