import type { SubPageConfig } from "@/components/ModuleSubPage";

// ============ M9: ASSET MANAGEMENT ============
const A = "Asset Management";

export const assetRegister: SubPageConfig = {
  title: "Asset Register", description: "Comprehensive register of all company assets",
  endpoint: "/assets", idField: "asset_id", entityName: "Asset",
  breadcrumb: { module: A, page: "Asset Register" },
  columns: [
    { key: "asset_code", label: "Code" }, { key: "asset_name", label: "Asset" },
    { key: "asset_type", label: "Type", type: "badge" }, { key: "location", label: "Location" },
    { key: "purchase_value", label: "Purchase Value", type: "currency" },
    { key: "current_value", label: "Current Value", type: "currency" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "asset_code", label: "Asset Code", required: true },
    { name: "asset_name", label: "Asset Name", required: true },
    { name: "asset_type", label: "Type", type: "select", options: [
      { value: "Building", label: "Building" }, { value: "Land", label: "Land" },
      { value: "Vehicle", label: "Vehicle" }, { value: "Equipment", label: "Equipment" },
      { value: "Furniture", label: "Furniture" }, { value: "IT", label: "IT" },
    ]},
    { name: "property_id", label: "Property ID", type: "number" },
    { name: "location", label: "Location" },
    { name: "purchase_date", label: "Purchase Date", type: "date" },
    { name: "purchase_value", label: "Purchase Value (AED)", type: "currency", required: true },
    { name: "current_value", label: "Current Value (AED)", type: "currency" },
    { name: "depreciation_method", label: "Depreciation Method", type: "select", options: [
      { value: "Straight Line", label: "Straight Line" }, { value: "Declining Balance", label: "Declining Balance" },
      { value: "None", label: "None" },
    ]},
    { name: "useful_life_years", label: "Useful Life (Years)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Active", label: "Active" }, { value: "Disposed", label: "Disposed" },
      { value: "Under Maintenance", label: "Under Maintenance" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "asset_id", label: "ID" }, { key: "asset_code", label: "Code" }, { key: "asset_name", label: "Name" },
    { key: "asset_type", label: "Type" }, { key: "location", label: "Location" },
    { key: "purchase_date", label: "Purchased", type: "date" },
    { key: "purchase_value", label: "Purchase Value", type: "currency" },
    { key: "current_value", label: "Current Value", type: "currency" },
    { key: "depreciation_method", label: "Depreciation" }, { key: "useful_life_years", label: "Useful Life", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const depreciationSchedule: SubPageConfig = {
  title: "Depreciation Schedule", description: "Asset depreciation calculations and schedules",
  endpoint: "/asset-depreciation", idField: "depreciation_id", entityName: "Depreciation Entry",
  breadcrumb: { module: A, page: "Depreciation Schedule" },
  columns: [
    { key: "asset_name", label: "Asset" }, { key: "period", label: "Period" },
    { key: "opening_value", label: "Opening", type: "currency" },
    { key: "depreciation_amount", label: "Depreciation", type: "currency" },
    { key: "closing_value", label: "Closing", type: "currency" },
    { key: "method", label: "Method", type: "badge" },
  ],
  formFields: [
    { name: "asset_id", label: "Asset ID", type: "number", required: true },
    { name: "period", label: "Period (e.g., 2026-Q1)", required: true },
    { name: "opening_value", label: "Opening Value (AED)", type: "currency" },
    { name: "depreciation_amount", label: "Depreciation (AED)", type: "currency", required: true },
    { name: "closing_value", label: "Closing Value (AED)", type: "currency" },
    { name: "method", label: "Method" },
  ],
  detailFields: [
    { key: "depreciation_id", label: "ID" }, { key: "asset_name", label: "Asset" }, { key: "period", label: "Period" },
    { key: "opening_value", label: "Opening", type: "currency" },
    { key: "depreciation_amount", label: "Depreciation", type: "currency" },
    { key: "closing_value", label: "Closing", type: "currency" },
  ],
};

export const assetMaintenance: SubPageConfig = {
  title: "Asset Maintenance", description: "Schedule and track asset maintenance activities",
  endpoint: "/asset-maintenance", idField: "maintenance_id", entityName: "Maintenance",
  breadcrumb: { module: A, page: "Asset Maintenance" },
  columns: [
    { key: "asset_name", label: "Asset" }, { key: "maintenance_type", label: "Type", type: "badge" },
    { key: "scheduled_date", label: "Scheduled", type: "date" }, { key: "completed_date", label: "Completed", type: "date" },
    { key: "cost", label: "Cost", type: "currency" }, { key: "status", label: "Status", type: "status" },
    { key: "vendor_name", label: "Vendor" },
  ],
  formFields: [
    { name: "asset_id", label: "Asset ID", type: "number", required: true },
    { name: "maintenance_type", label: "Type", type: "select", options: [
      { value: "Preventive", label: "Preventive" }, { value: "Corrective", label: "Corrective" },
      { value: "Emergency", label: "Emergency" },
    ]},
    { name: "scheduled_date", label: "Scheduled Date", type: "date", required: true },
    { name: "completed_date", label: "Completed Date", type: "date" },
    { name: "cost", label: "Cost (AED)", type: "currency" },
    { name: "vendor_name", label: "Vendor" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Scheduled", label: "Scheduled" }, { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "maintenance_id", label: "ID" }, { key: "asset_name", label: "Asset" },
    { key: "maintenance_type", label: "Type" }, { key: "scheduled_date", label: "Scheduled", type: "date" },
    { key: "completed_date", label: "Completed", type: "date" }, { key: "cost", label: "Cost", type: "currency" },
    { key: "vendor_name", label: "Vendor" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const assetTransfers: SubPageConfig = {
  title: "Asset Transfers", description: "Transfer assets between projects or locations",
  endpoint: "/asset-transfers", idField: "transfer_id", entityName: "Transfer",
  breadcrumb: { module: A, page: "Asset Transfers" },
  columns: [
    { key: "asset_name", label: "Asset" }, { key: "from_location", label: "From" },
    { key: "to_location", label: "To" }, { key: "transfer_date", label: "Date", type: "date" },
    { key: "reason", label: "Reason" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "asset_id", label: "Asset ID", type: "number", required: true },
    { name: "from_location", label: "From Location", required: true },
    { name: "to_location", label: "To Location", required: true },
    { name: "transfer_date", label: "Transfer Date", type: "date", required: true },
    { name: "reason", label: "Reason" },
    { name: "approved_by", label: "Approved By" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Requested", label: "Requested" }, { value: "Approved", label: "Approved" },
      { value: "Completed", label: "Completed" }, { value: "Rejected", label: "Rejected" },
    ]},
  ],
  detailFields: [
    { key: "transfer_id", label: "ID" }, { key: "asset_name", label: "Asset" },
    { key: "from_location", label: "From" }, { key: "to_location", label: "To" },
    { key: "transfer_date", label: "Date", type: "date" }, { key: "reason", label: "Reason" },
    { key: "approved_by", label: "Approved By" }, { key: "status", label: "Status", type: "status" },
  ],
};

// ============ M10: PROPERTY VALUATION ============
const V = "Property Valuation";

export const appraisalReports: SubPageConfig = {
  title: "Appraisal Reports", description: "Property appraisal and valuation reports",
  endpoint: "/valuations", idField: "valuation_id", entityName: "Valuation",
  breadcrumb: { module: V, page: "Appraisal Reports" },
  columns: [
    { key: "valuation_date", label: "Date", type: "date" }, { key: "valuation_type", label: "Type", type: "badge" },
    { key: "appraiser_name", label: "Appraiser" }, { key: "market_value", label: "Market Value", type: "currency" },
    { key: "assessed_value", label: "Assessed Value", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "valuation_date", label: "Date", type: "date", required: true },
    { name: "valuation_type", label: "Type", type: "select", options: [
      { value: "Market", label: "Market" }, { value: "Insurance", label: "Insurance" },
      { value: "Tax", label: "Tax" }, { value: "Investment", label: "Investment" },
    ]},
    { name: "appraiser_name", label: "Appraiser Name" },
    { name: "market_value", label: "Market Value (AED)", type: "currency", required: true },
    { name: "assessed_value", label: "Assessed Value (AED)", type: "currency" },
    { name: "methodology", label: "Methodology", type: "textarea", width: "full" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Final", label: "Final" }, { value: "Expired", label: "Expired" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "valuation_id", label: "ID" }, { key: "valuation_date", label: "Date", type: "date" },
    { key: "valuation_type", label: "Type" }, { key: "appraiser_name", label: "Appraiser" },
    { key: "market_value", label: "Market Value", type: "currency" },
    { key: "assessed_value", label: "Assessed Value", type: "currency" },
    { key: "methodology", label: "Methodology" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const marketAnalysis: SubPageConfig = {
  title: "Market Analysis", description: "Market trends and comparative analysis",
  endpoint: "/valuations", idField: "valuation_id", entityName: "Valuation",
  breadcrumb: { module: V, page: "Market Analysis" },
  columns: appraisalReports.columns, formFields: appraisalReports.formFields, detailFields: appraisalReports.detailFields,
};

export const comparableSales: SubPageConfig = {
  title: "Comparable Sales", description: "Track comparable property sales for valuation",
  endpoint: "/valuations", idField: "valuation_id", entityName: "Valuation",
  breadcrumb: { module: V, page: "Comparable Sales" },
  columns: appraisalReports.columns, formFields: appraisalReports.formFields, detailFields: appraisalReports.detailFields,
};

export const valuationHistory: SubPageConfig = {
  title: "Valuation History", description: "Historical valuation records and trends",
  endpoint: "/valuations", idField: "valuation_id", entityName: "Valuation",
  breadcrumb: { module: V, page: "Valuation History" },
  columns: appraisalReports.columns, formFields: appraisalReports.formFields, detailFields: appraisalReports.detailFields,
};

// ============ M11: LEASE & RENTAL ============
const L = "Lease & Rental";

export const leaseAgreements: SubPageConfig = {
  title: "Lease Agreements", description: "Manage lease contracts and terms",
  endpoint: "/leases", idField: "lease_id", entityName: "Lease",
  breadcrumb: { module: L, page: "Lease Agreements" },
  columns: [
    { key: "lease_number", label: "Lease #" }, { key: "tenant_name", label: "Tenant" },
    { key: "lease_type", label: "Type", type: "badge" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "monthly_rent", label: "Rent/Month", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "unit_id", label: "Unit ID", type: "number" },
    { name: "tenant_id", label: "Tenant ID", type: "number" },
    { name: "lease_number", label: "Lease Number", required: true },
    { name: "lease_type", label: "Type", type: "select", options: [
      { value: "Residential", label: "Residential" }, { value: "Commercial", label: "Commercial" },
      { value: "Short-Term", label: "Short-Term" },
    ]},
    { name: "start_date", label: "Start Date", type: "date", required: true },
    { name: "end_date", label: "End Date", type: "date", required: true },
    { name: "monthly_rent", label: "Monthly Rent (AED)", type: "currency", required: true },
    { name: "security_deposit", label: "Security Deposit (AED)", type: "currency" },
    { name: "payment_frequency", label: "Payment Frequency", type: "select", options: [
      { value: "Monthly", label: "Monthly" }, { value: "Quarterly", label: "Quarterly" },
      { value: "Annual", label: "Annual" },
    ]},
    { name: "escalation_pct", label: "Escalation (%)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Active", label: "Active" },
      { value: "Expired", label: "Expired" }, { value: "Terminated", label: "Terminated" },
    ]},
    { name: "terms", label: "Terms & Conditions", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "lease_id", label: "ID" }, { key: "lease_number", label: "Lease #" },
    { key: "tenant_name", label: "Tenant" }, { key: "lease_type", label: "Type" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "monthly_rent", label: "Rent", type: "currency" }, { key: "security_deposit", label: "Deposit", type: "currency" },
    { key: "escalation_pct", label: "Escalation", type: "percent" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const rentCollection: SubPageConfig = {
  title: "Rent Collection", description: "Track rent payments and receipts",
  endpoint: "/rent-payments", idField: "payment_id", entityName: "Rent Payment",
  breadcrumb: { module: L, page: "Rent Collection" },
  columns: [
    { key: "tenant_name", label: "Tenant" }, { key: "payment_date", label: "Date", type: "date" },
    { key: "amount", label: "Amount", type: "currency" }, { key: "payment_method", label: "Method", type: "badge" },
    { key: "period", label: "Period" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "lease_id", label: "Lease ID", type: "number", required: true },
    { name: "payment_date", label: "Payment Date", type: "date", required: true },
    { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "payment_method", label: "Method", type: "select", options: [
      { value: "Bank Transfer", label: "Bank Transfer" }, { value: "Cheque", label: "Cheque" },
      { value: "Cash", label: "Cash" }, { value: "Card", label: "Card" },
    ]},
    { name: "period", label: "Period (e.g., Jan 2026)" },
    { name: "reference_number", label: "Reference #" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Received", label: "Received" }, { value: "Pending", label: "Pending" },
      { value: "Late", label: "Late" }, { value: "Bounced", label: "Bounced" },
    ]},
  ],
  detailFields: [
    { key: "payment_id", label: "ID" }, { key: "tenant_name", label: "Tenant" },
    { key: "payment_date", label: "Date", type: "date" }, { key: "amount", label: "Amount", type: "currency" },
    { key: "payment_method", label: "Method" }, { key: "period", label: "Period" },
    { key: "reference_number", label: "Reference" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const renewalTracker: SubPageConfig = {
  title: "Renewal Tracker", description: "Track lease renewals and expiry dates",
  endpoint: "/leases", idField: "lease_id", entityName: "Lease",
  breadcrumb: { module: L, page: "Renewal Tracker" },
  columns: leaseAgreements.columns, formFields: leaseAgreements.formFields, detailFields: leaseAgreements.detailFields,
};

export const rentEscalations: SubPageConfig = {
  title: "Rent Escalations", description: "Manage rent escalation schedules",
  endpoint: "/leases", idField: "lease_id", entityName: "Lease",
  breadcrumb: { module: L, page: "Rent Escalations" },
  columns: [
    { key: "lease_number", label: "Lease #" }, { key: "tenant_name", label: "Tenant" },
    { key: "monthly_rent", label: "Current Rent", type: "currency" },
    { key: "escalation_pct", label: "Escalation %", type: "percent" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: leaseAgreements.formFields, detailFields: leaseAgreements.detailFields,
};

export const arrearsReport: SubPageConfig = {
  title: "Arrears Report", description: "Outstanding rent and overdue payments",
  endpoint: "/rent-payments", idField: "payment_id", entityName: "Rent Payment",
  breadcrumb: { module: L, page: "Arrears Report" },
  columns: rentCollection.columns, formFields: rentCollection.formFields, detailFields: rentCollection.detailFields,
};
