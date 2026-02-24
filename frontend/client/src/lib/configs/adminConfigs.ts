import type { SubPageConfig } from "@/components/ModuleSubPage";

// ============ M15: HCM & PAYROLL ============
const H = "HCM & Payroll";

export const employeeMaster: SubPageConfig = {
  title: "Employee Master", description: "Manage employee profiles and records",
  endpoint: "/employees", idField: "employee_id", entityName: "Employee",
  breadcrumb: { module: H, page: "Employee Master" },
  columns: [
    { key: "employee_code", label: "Code" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
    { key: "department", label: "Department", type: "badge" }, { key: "designation", label: "Designation" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "employment_type", label: "Type", type: "badge" },
  ],
  formFields: [
    { name: "employee_code", label: "Employee Code", required: true },
    { name: "first_name", label: "First Name", required: true },
    { name: "last_name", label: "Last Name", required: true },
    { name: "department", label: "Department", type: "select", options: [
      { value: "Engineering", label: "Engineering" }, { value: "Finance", label: "Finance" },
      { value: "Sales", label: "Sales" }, { value: "HR", label: "HR" },
      { value: "Operations", label: "Operations" }, { value: "Legal", label: "Legal" },
    ]},
    { name: "designation", label: "Designation" },
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "hire_date", label: "Hire Date", type: "date" },
    { name: "salary", label: "Salary (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Active", label: "Active" }, { value: "On Leave", label: "On Leave" },
      { value: "Terminated", label: "Terminated" },
    ]},
    { name: "manager_name", label: "Manager" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "employee_id", label: "ID" }, { key: "employee_code", label: "Code" },
    { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
    { key: "department", label: "Department" }, { key: "designation", label: "Designation" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "hire_date", label: "Hired", type: "date" }, { key: "salary", label: "Salary", type: "currency" },
    { key: "employment_type", label: "Type" },
  ],
};

export const payrollProcessing: SubPageConfig = {
  title: "Payroll Processing", description: "Process and manage monthly payroll",
  endpoint: "/payroll", idField: "payroll_id", entityName: "Payroll",
  breadcrumb: { module: H, page: "Payroll Processing" },
  columns: [
    { key: "employee_name", label: "Employee" }, { key: "period", label: "Period" },
    { key: "basic_salary", label: "Basic", type: "currency" },
    { key: "allowances", label: "Allowances", type: "currency" },
    { key: "deductions", label: "Deductions", type: "currency" },
    { key: "net_salary", label: "Net", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "employee_id", label: "Employee ID", type: "number", required: true },
    { name: "period", label: "Period (e.g., Jan 2026)", required: true },
    { name: "basic_salary", label: "Basic Salary (AED)", type: "currency", required: true },
    { name: "allowances", label: "Allowances (AED)", type: "currency" },
    { name: "deductions", label: "Deductions (AED)", type: "currency" },
    { name: "net_salary", label: "Net Salary (AED)", type: "currency" },
    { name: "payment_date", label: "Payment Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Processed", label: "Processed" },
      { value: "Paid", label: "Paid" },
    ]},
  ],
  detailFields: [
    { key: "payroll_id", label: "ID" }, { key: "employee_name", label: "Employee" },
    { key: "period", label: "Period" }, { key: "basic_salary", label: "Basic", type: "currency" },
    { key: "allowances", label: "Allowances", type: "currency" },
    { key: "deductions", label: "Deductions", type: "currency" },
    { key: "net_salary", label: "Net", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const attendanceTracker: SubPageConfig = {
  title: "Attendance Tracker", description: "Track employee attendance and working hours",
  endpoint: "/attendance", idField: "attendance_id", entityName: "Attendance",
  breadcrumb: { module: H, page: "Attendance Tracker" },
  columns: [
    { key: "employee_name", label: "Employee" }, { key: "date", label: "Date", type: "date" },
    { key: "check_in", label: "Check In" }, { key: "check_out", label: "Check Out" },
    { key: "hours_worked", label: "Hours", type: "number" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "employee_id", label: "Employee ID", type: "number", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "check_in", label: "Check In Time" }, { name: "check_out", label: "Check Out Time" },
    { name: "hours_worked", label: "Hours Worked", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Present", label: "Present" }, { value: "Absent", label: "Absent" },
      { value: "Late", label: "Late" }, { value: "Half Day", label: "Half Day" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "attendance_id", label: "ID" }, { key: "employee_name", label: "Employee" },
    { key: "date", label: "Date", type: "date" }, { key: "check_in", label: "In" },
    { key: "check_out", label: "Out" }, { key: "hours_worked", label: "Hours", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const leaveManagement: SubPageConfig = {
  title: "Leave Management", description: "Manage employee leave requests and balances",
  endpoint: "/leaves", idField: "leave_id", entityName: "Leave",
  breadcrumb: { module: H, page: "Leave Management" },
  columns: [
    { key: "employee_name", label: "Employee" }, { key: "leave_type", label: "Type", type: "badge" },
    { key: "start_date", label: "From", type: "date" }, { key: "end_date", label: "To", type: "date" },
    { key: "days", label: "Days", type: "number" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "employee_id", label: "Employee ID", type: "number", required: true },
    { name: "leave_type", label: "Type", type: "select", options: [
      { value: "Annual", label: "Annual" }, { value: "Sick", label: "Sick" },
      { value: "Maternity", label: "Maternity" }, { value: "Emergency", label: "Emergency" }, { value: "Unpaid", label: "Unpaid" },
    ]},
    { name: "start_date", label: "From", type: "date", required: true },
    { name: "end_date", label: "To", type: "date", required: true },
    { name: "days", label: "Days", type: "number" },
    { name: "reason", label: "Reason", type: "textarea", width: "full" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "Approved", label: "Approved" },
      { value: "Rejected", label: "Rejected" },
    ]},
  ],
  detailFields: [
    { key: "leave_id", label: "ID" }, { key: "employee_name", label: "Employee" },
    { key: "leave_type", label: "Type" }, { key: "start_date", label: "From", type: "date" },
    { key: "end_date", label: "To", type: "date" }, { key: "days", label: "Days", type: "number" },
    { key: "reason", label: "Reason" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const recruitmentPipeline: SubPageConfig = {
  title: "Recruitment Pipeline", description: "Manage job openings and candidates",
  endpoint: "/recruitment", idField: "recruitment_id", entityName: "Recruitment",
  breadcrumb: { module: H, page: "Recruitment Pipeline" },
  columns: [
    { key: "position", label: "Position" }, { key: "department", label: "Department", type: "badge" },
    { key: "candidate_name", label: "Candidate" }, { key: "stage", label: "Stage", type: "status" },
    { key: "applied_date", label: "Applied", type: "date" },
  ],
  formFields: [
    { name: "position", label: "Position", required: true },
    { name: "department", label: "Department" },
    { name: "candidate_name", label: "Candidate Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "applied_date", label: "Applied Date", type: "date" },
    { name: "stage", label: "Stage", type: "select", options: [
      { value: "Applied", label: "Applied" }, { value: "Screening", label: "Screening" },
      { value: "Interview", label: "Interview" }, { value: "Offer", label: "Offer" },
      { value: "Hired", label: "Hired" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "recruitment_id", label: "ID" }, { key: "position", label: "Position" },
    { key: "department", label: "Department" }, { key: "candidate_name", label: "Candidate" },
    { key: "email", label: "Email" }, { key: "stage", label: "Stage", type: "status" },
    { key: "applied_date", label: "Applied", type: "date" },
  ],
};

// ============ M16: LEGAL & COMPLIANCE ============
const LG = "Legal & Compliance";

export const contractManagement: SubPageConfig = {
  title: "Contract Management", description: "Manage legal contracts and agreements",
  endpoint: "/contracts", idField: "contract_id", entityName: "Contract",
  breadcrumb: { module: LG, page: "Contract Management" },
  columns: [
    { key: "contract_number", label: "Contract #" }, { key: "contract_type", label: "Type", type: "badge" },
    { key: "party_name", label: "Party" }, { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" }, { key: "value", label: "Value", type: "currency" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "contract_number", label: "Contract Number", required: true },
    { name: "contract_type", label: "Type", type: "select", options: [
      { value: "Construction", label: "Construction" }, { value: "Sales", label: "Sales" },
      { value: "Lease", label: "Lease" }, { value: "Service", label: "Service" }, { value: "Employment", label: "Employment" },
    ]},
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "party_name", label: "Party Name", required: true },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "value", label: "Contract Value (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Active", label: "Active" },
      { value: "Expired", label: "Expired" }, { value: "Terminated", label: "Terminated" },
    ]},
    { name: "terms", label: "Key Terms", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "contract_id", label: "ID" }, { key: "contract_number", label: "Contract #" },
    { key: "contract_type", label: "Type" }, { key: "party_name", label: "Party" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "value", label: "Value", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const complianceTracker: SubPageConfig = {
  title: "Compliance Tracker", description: "Track regulatory compliance requirements",
  endpoint: "/compliance", idField: "compliance_id", entityName: "Compliance",
  breadcrumb: { module: LG, page: "Compliance Tracker" },
  columns: [
    { key: "requirement", label: "Requirement" }, { key: "authority", label: "Authority" },
    { key: "due_date", label: "Due", type: "date" }, { key: "status", label: "Status", type: "status" },
    { key: "assigned_to", label: "Assigned To" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "requirement", label: "Requirement", required: true },
    { name: "authority", label: "Authority" },
    { name: "due_date", label: "Due Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "Compliant", label: "Compliant" },
      { value: "Non-Compliant", label: "Non-Compliant" }, { value: "In Progress", label: "In Progress" },
    ]},
    { name: "assigned_to", label: "Assigned To" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "compliance_id", label: "ID" }, { key: "requirement", label: "Requirement" },
    { key: "authority", label: "Authority" }, { key: "due_date", label: "Due", type: "date" },
    { key: "status", label: "Status", type: "status" }, { key: "assigned_to", label: "Assigned To" },
  ],
};

export const permitsLicenses: SubPageConfig = {
  ...complianceTracker, title: "Permits & Licenses", description: "Manage building permits and licenses",
  breadcrumb: { module: LG, page: "Permits & Licenses" },
};

export const disputeResolution: SubPageConfig = {
  ...contractManagement, title: "Dispute Resolution", description: "Track and resolve legal disputes",
  breadcrumb: { module: LG, page: "Dispute Resolution" },
};

export const nocManagement: SubPageConfig = {
  ...complianceTracker, title: "NOC Management", description: "Manage No Objection Certificates",
  breadcrumb: { module: LG, page: "NOC Management" },
};

// ============ M17: DOCUMENT MANAGEMENT ============
const D = "Document Management";

export const documentRepository: SubPageConfig = {
  title: "Document Repository", description: "Central document storage and retrieval",
  endpoint: "/documents", idField: "document_id", entityName: "Document",
  breadcrumb: { module: D, page: "Document Repository" },
  columns: [
    { key: "document_name", label: "Document" }, { key: "document_type", label: "Type", type: "badge" },
    { key: "category", label: "Category" }, { key: "uploaded_by", label: "Uploaded By" },
    { key: "upload_date", label: "Date", type: "date" }, { key: "version", label: "Version" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "document_name", label: "Document Name", required: true },
    { name: "document_type", label: "Type", type: "select", options: [
      { value: "Contract", label: "Contract" }, { value: "Drawing", label: "Drawing" },
      { value: "Report", label: "Report" }, { value: "Permit", label: "Permit" },
      { value: "Invoice", label: "Invoice" }, { value: "Other", label: "Other" },
    ]},
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "category", label: "Category" },
    { name: "uploaded_by", label: "Uploaded By" },
    { name: "upload_date", label: "Upload Date", type: "date" },
    { name: "version", label: "Version", defaultValue: "1.0" },
    { name: "file_path", label: "File Path / URL" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Active", label: "Active" }, { value: "Archived", label: "Archived" },
      { value: "Draft", label: "Draft" },
    ]},
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "document_id", label: "ID" }, { key: "document_name", label: "Name" },
    { key: "document_type", label: "Type" }, { key: "category", label: "Category" },
    { key: "uploaded_by", label: "Uploaded By" }, { key: "upload_date", label: "Date", type: "date" },
    { key: "version", label: "Version" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const documentTemplates: SubPageConfig = {
  ...documentRepository, title: "Document Templates", description: "Manage reusable document templates",
  breadcrumb: { module: D, page: "Document Templates" },
};

export const approvalWorkflows: SubPageConfig = {
  ...documentRepository, title: "Approval Workflows", description: "Document approval routing and tracking",
  breadcrumb: { module: D, page: "Approval Workflows" },
};

export const archive: SubPageConfig = {
  ...documentRepository, title: "Archive", description: "Archived documents and records",
  breadcrumb: { module: D, page: "Archive" },
};

// ============ M18: INVENTORY MANAGEMENT ============
const I = "Inventory Management";

export const itemMaster: SubPageConfig = {
  title: "Item Master", description: "Manage inventory items and materials",
  endpoint: "/inventory", idField: "item_id", entityName: "Item",
  breadcrumb: { module: I, page: "Item Master" },
  columns: [
    { key: "item_code", label: "Code" }, { key: "item_name", label: "Item" },
    { key: "category", label: "Category", type: "badge" }, { key: "unit_of_measure", label: "UOM" },
    { key: "quantity_on_hand", label: "On Hand", type: "number" },
    { key: "unit_price", label: "Unit Price", type: "currency" },
    { key: "reorder_level", label: "Reorder", type: "number" },
  ],
  formFields: [
    { name: "item_code", label: "Item Code", required: true },
    { name: "item_name", label: "Item Name", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { value: "Raw Material", label: "Raw Material" }, { value: "Finished Good", label: "Finished Good" },
      { value: "Consumable", label: "Consumable" }, { value: "Equipment", label: "Equipment" },
    ]},
    { name: "unit_of_measure", label: "UOM" },
    { name: "quantity_on_hand", label: "Qty On Hand", type: "number" },
    { name: "unit_price", label: "Unit Price (AED)", type: "currency" },
    { name: "reorder_level", label: "Reorder Level", type: "number" },
    { name: "warehouse_id", label: "Warehouse ID", type: "number" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "item_id", label: "ID" }, { key: "item_code", label: "Code" }, { key: "item_name", label: "Item" },
    { key: "category", label: "Category" }, { key: "unit_of_measure", label: "UOM" },
    { key: "quantity_on_hand", label: "On Hand", type: "number" },
    { key: "unit_price", label: "Price", type: "currency" }, { key: "reorder_level", label: "Reorder", type: "number" },
  ],
};

export const stockMovements: SubPageConfig = {
  title: "Stock Movements", description: "Track inventory in/out transactions",
  endpoint: "/inventory-transactions", idField: "txn_id", entityName: "Stock Movement",
  breadcrumb: { module: I, page: "Stock Movements" },
  columns: [
    { key: "item_name", label: "Item" }, { key: "transaction_type", label: "Type", type: "badge" },
    { key: "quantity", label: "Qty", type: "number" }, { key: "transaction_date", label: "Date", type: "date" },
    { key: "reference_number", label: "Reference" }, { key: "performed_by", label: "By" },
  ],
  formFields: [
    { name: "item_id", label: "Item ID", type: "number", required: true },
    { name: "transaction_type", label: "Type", type: "select", options: [
      { value: "Receipt", label: "Receipt" }, { value: "Issue", label: "Issue" },
      { value: "Transfer", label: "Transfer" }, { value: "Adjustment", label: "Adjustment" },
    ]},
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "transaction_date", label: "Date", type: "date", required: true },
    { name: "reference_number", label: "Reference #" },
    { name: "performed_by", label: "Performed By" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "txn_id", label: "ID" }, { key: "item_name", label: "Item" },
    { key: "transaction_type", label: "Type" }, { key: "quantity", label: "Qty", type: "number" },
    { key: "transaction_date", label: "Date", type: "date" }, { key: "reference_number", label: "Reference" },
    { key: "performed_by", label: "By" },
  ],
};

export const warehouseManagement: SubPageConfig = {
  ...itemMaster, title: "Warehouse Management", description: "Manage warehouses and storage locations",
  breadcrumb: { module: I, page: "Warehouse Management" },
};

export const materialRequisitions: SubPageConfig = {
  ...stockMovements, title: "Material Requisitions", description: "Create and track material requisitions",
  breadcrumb: { module: I, page: "Material Requisitions" },
};

export const stockReports: SubPageConfig = {
  ...itemMaster, title: "Stock Reports", description: "Inventory stock level reports",
  breadcrumb: { module: I, page: "Stock Reports" },
};

// ============ M19: HELPDESK / FACILITY ============
const HD = "Helpdesk / Facility";

export const ticketManagement: SubPageConfig = {
  title: "Ticket Management", description: "Manage helpdesk and maintenance tickets",
  endpoint: "/tickets", idField: "ticket_id", entityName: "Ticket",
  breadcrumb: { module: HD, page: "Ticket Management" },
  columns: [
    { key: "ticket_number", label: "Ticket #" }, { key: "subject", label: "Subject" },
    { key: "category", label: "Category", type: "badge" }, { key: "priority", label: "Priority", type: "status" },
    { key: "assigned_to", label: "Assigned To" }, { key: "status", label: "Status", type: "status" },
    { key: "created_date", label: "Created", type: "date" },
  ],
  formFields: [
    { name: "ticket_number", label: "Ticket Number", required: true },
    { name: "subject", label: "Subject", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "category", label: "Category", type: "select", options: [
      { value: "Maintenance", label: "Maintenance" }, { value: "Complaint", label: "Complaint" },
      { value: "Request", label: "Request" }, { value: "Emergency", label: "Emergency" },
    ]},
    { name: "priority", label: "Priority", type: "select", options: [
      { value: "Low", label: "Low" }, { value: "Medium", label: "Medium" },
      { value: "High", label: "High" }, { value: "Critical", label: "Critical" },
    ]},
    { name: "property_id", label: "Property ID", type: "number" },
    { name: "unit_id", label: "Unit ID", type: "number" },
    { name: "reported_by", label: "Reported By" },
    { name: "assigned_to", label: "Assigned To" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" }, { value: "In Progress", label: "In Progress" },
      { value: "Resolved", label: "Resolved" }, { value: "Closed", label: "Closed" },
    ]},
  ],
  detailFields: [
    { key: "ticket_id", label: "ID" }, { key: "ticket_number", label: "Ticket #" },
    { key: "subject", label: "Subject" }, { key: "category", label: "Category" },
    { key: "priority", label: "Priority", type: "status" }, { key: "assigned_to", label: "Assigned To" },
    { key: "status", label: "Status", type: "status" }, { key: "created_date", label: "Created", type: "date" },
  ],
};

export const maintenanceSchedule: SubPageConfig = {
  ...ticketManagement, title: "Maintenance Schedule", description: "Scheduled maintenance activities",
  breadcrumb: { module: HD, page: "Maintenance Schedule" },
};

export const workOrders: SubPageConfig = {
  ...ticketManagement, title: "Work Orders", description: "Manage facility work orders",
  breadcrumb: { module: HD, page: "Work Orders" },
};

export const slaTracking: SubPageConfig = {
  ...ticketManagement, title: "SLA Tracking", description: "Monitor service level agreement compliance",
  breadcrumb: { module: HD, page: "SLA Tracking" },
};

export const serviceVendors: SubPageConfig = {
  title: "Service Vendors", description: "Manage facility service vendors",
  endpoint: "/vendors", idField: "vendor_id", entityName: "Vendor",
  breadcrumb: { module: HD, page: "Service Vendors" },
  columns: [
    { key: "vendor_name", label: "Vendor" }, { key: "vendor_type", label: "Type", type: "badge" },
    { key: "contact_person", label: "Contact" }, { key: "email", label: "Email" },
    { key: "phone", label: "Phone" }, { key: "rating", label: "Rating", type: "number" },
  ],
  formFields: [
    { name: "vendor_name", label: "Vendor Name", required: true },
    { name: "vendor_type", label: "Type" },
    { name: "contact_person", label: "Contact Person" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "city", label: "City" },
    { name: "rating", label: "Rating (1-5)", type: "number" },
  ],
  detailFields: [
    { key: "vendor_id", label: "ID" }, { key: "vendor_name", label: "Name" },
    { key: "vendor_type", label: "Type" }, { key: "contact_person", label: "Contact" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "rating", label: "Rating", type: "number" },
  ],
};

// ============ M20: TENANT PORTAL ============
const T = "Tenant Portal";

export const tenantDirectory: SubPageConfig = {
  title: "Tenant Directory", description: "Manage tenant profiles and contact information",
  endpoint: "/tenants", idField: "tenant_id", entityName: "Tenant",
  breadcrumb: { module: T, page: "Tenant Directory" },
  columns: [
    { key: "tenant_name", label: "Tenant" }, { key: "tenant_type", label: "Type", type: "badge" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "unit_number", label: "Unit" }, { key: "lease_status", label: "Lease", type: "status" },
  ],
  formFields: [
    { name: "tenant_name", label: "Tenant Name", required: true },
    { name: "tenant_type", label: "Type", type: "select", options: [
      { value: "Individual", label: "Individual" }, { value: "Corporate", label: "Corporate" },
    ]},
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "unit_number", label: "Unit Number" },
    { name: "lease_id", label: "Lease ID", type: "number" },
    { name: "lease_status", label: "Lease Status", type: "select", options: [
      { value: "Active", label: "Active" }, { value: "Expired", label: "Expired" }, { value: "Pending", label: "Pending" },
    ]},
    { name: "emergency_contact", label: "Emergency Contact" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "tenant_id", label: "ID" }, { key: "tenant_name", label: "Name" },
    { key: "tenant_type", label: "Type" }, { key: "email", label: "Email" },
    { key: "phone", label: "Phone" }, { key: "unit_number", label: "Unit" },
    { key: "lease_status", label: "Lease", type: "status" },
  ],
};

export const tenantNotifications: SubPageConfig = {
  ...tenantDirectory, title: "Notifications", description: "Send and manage tenant notifications",
  breadcrumb: { module: T, page: "Notifications" },
};

export const serviceRequests: SubPageConfig = {
  ...ticketManagement, title: "Service Requests", description: "Tenant service requests",
  endpoint: "/tickets", idField: "ticket_id", entityName: "Request",
  breadcrumb: { module: T, page: "Service Requests" },
};

export const accountStatements: SubPageConfig = {
  title: "Account Statements", description: "Tenant account statements and balances",
  endpoint: "/rent-payments", idField: "payment_id", entityName: "Payment",
  breadcrumb: { module: T, page: "Account Statements" },
  columns: [
    { key: "tenant_name", label: "Tenant" }, { key: "payment_date", label: "Date", type: "date" },
    { key: "amount", label: "Amount", type: "currency" }, { key: "period", label: "Period" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "lease_id", label: "Lease ID", type: "number", required: true },
    { name: "payment_date", label: "Date", type: "date" },
    { name: "amount", label: "Amount (AED)", type: "currency" },
    { name: "period", label: "Period" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Received", label: "Received" }, { value: "Pending", label: "Pending" },
    ]},
  ],
  detailFields: [
    { key: "payment_id", label: "ID" }, { key: "tenant_name", label: "Tenant" },
    { key: "payment_date", label: "Date", type: "date" }, { key: "amount", label: "Amount", type: "currency" },
    { key: "period", label: "Period" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const communityBoard: SubPageConfig = {
  ...tenantDirectory, title: "Community Board", description: "Tenant community announcements and discussions",
  breadcrumb: { module: T, page: "Community Board" },
};
