import type { Column } from "@/components/DataGrid";
import type { FieldDef } from "@/components/CrudForm";

interface ModuleConfig {
  title: string;
  description: string;
  endpoint: string;
  idField: string;
  entityName: string;
  columns: Column[];
  formFields: FieldDef[];
  detailFields: { key: string; label: string; type?: "text" | "currency" | "date" | "status" | "percent" | "number" }[];
  searchPlaceholder?: string;
}

// ===================== M1: PROJECT MANAGEMENT =====================
export const projectsConfig: ModuleConfig = {
  title: "Project Management",
  description: "Manage residential and commercial development projects",
  endpoint: "/projects",
  idField: "project_id",
  entityName: "Project",
  searchPlaceholder: "Search projects...",
  columns: [
    { key: "project_code", label: "Code", width: "90px" },
    { key: "project_name", label: "Project Name" },
    { key: "project_type", label: "Type", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "city", label: "City" },
    { key: "estimated_budget", label: "Budget", type: "currency" },
    { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" },
    { key: "project_manager", label: "PM" },
  ],
  formFields: [
    { name: "project_name", label: "Project Name", required: true },
    { name: "project_code", label: "Project Code", required: true },
    { name: "project_type", label: "Type", type: "select", options: [
      { value: "Residential", label: "Residential" },
      { value: "Commercial", label: "Commercial" },
      { value: "Mixed-Use", label: "Mixed-Use" },
      { value: "Industrial", label: "Industrial" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Planning", label: "Planning" },
      { value: "In-Progress", label: "In-Progress" },
      { value: "Completed", label: "Completed" },
      { value: "On-Hold", label: "On-Hold" },
    ]},
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "estimated_budget", label: "Estimated Budget (AED)", type: "currency" },
    { name: "location", label: "Location" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "project_manager", label: "Project Manager" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "created_by", label: "Created By", defaultValue: "admin" },
  ],
  detailFields: [
    { key: "project_id", label: "ID" },
    { key: "project_code", label: "Code" },
    { key: "project_name", label: "Name" },
    { key: "project_type", label: "Type" },
    { key: "status", label: "Status", type: "status" },
    { key: "start_date", label: "Start Date", type: "date" },
    { key: "end_date", label: "End Date", type: "date" },
    { key: "estimated_budget", label: "Budget", type: "currency" },
    { key: "location", label: "Location" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "project_manager", label: "Project Manager" },
    { key: "description", label: "Description" },
    { key: "created_by", label: "Created By" },
    { key: "created_at", label: "Created At", type: "date" },
  ],
};

// ===================== M2: FINANCIAL - ACCOUNTS =====================
export const accountsConfig: ModuleConfig = {
  title: "Chart of Accounts",
  description: "Financial accounts and balances",
  endpoint: "/financial/accounts",
  idField: "account_id",
  entityName: "Account",
  columns: [
    { key: "account_code", label: "Code", width: "80px" },
    { key: "account_name", label: "Account Name" },
    { key: "account_type", label: "Type", type: "badge" },
    { key: "balance", label: "Balance", type: "currency" },
    { key: "currency", label: "Currency" },
  ],
  formFields: [
    { name: "account_code", label: "Account Code", required: true },
    { name: "account_name", label: "Account Name", required: true },
    { name: "account_type", label: "Type", type: "select", options: [
      { value: "Asset", label: "Asset" },
      { value: "Liability", label: "Liability" },
      { value: "Revenue", label: "Revenue" },
      { value: "Expense", label: "Expense" },
      { value: "Equity", label: "Equity" },
    ]},
    { name: "balance", label: "Balance (AED)", type: "currency" },
    { name: "currency", label: "Currency", defaultValue: "AED" },
  ],
  detailFields: [
    { key: "account_id", label: "ID" },
    { key: "account_code", label: "Code" },
    { key: "account_name", label: "Name" },
    { key: "account_type", label: "Type" },
    { key: "balance", label: "Balance", type: "currency" },
    { key: "currency", label: "Currency" },
  ],
};

export const transactionsConfig: ModuleConfig = {
  title: "Financial Transactions",
  description: "All financial transactions across projects",
  endpoint: "/financial/transactions",
  idField: "transaction_id",
  entityName: "Transaction",
  columns: [
    { key: "transaction_date", label: "Date", type: "date" },
    { key: "transaction_type", label: "Type", type: "badge" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "reference_no", label: "Reference" },
    { key: "created_by", label: "Created By" },
  ],
  formFields: [
    { name: "transaction_date", label: "Date", type: "date", required: true },
    { name: "account_id", label: "Account ID", type: "number", required: true },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "transaction_type", label: "Type", type: "select", options: [
      { value: "Debit", label: "Debit" },
      { value: "Credit", label: "Credit" },
    ]},
    { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "reference_no", label: "Reference No" },
    { name: "category", label: "Category" },
    { name: "created_by", label: "Created By", defaultValue: "admin" },
  ],
  detailFields: [
    { key: "transaction_id", label: "ID" },
    { key: "transaction_date", label: "Date", type: "date" },
    { key: "transaction_type", label: "Type" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "reference_no", label: "Reference" },
  ],
};

export const invoicesConfig: ModuleConfig = {
  title: "Invoices",
  description: "Payable and receivable invoices",
  endpoint: "/financial/invoices",
  idField: "invoice_id",
  entityName: "Invoice",
  columns: [
    { key: "invoice_number", label: "Invoice #" },
    { key: "invoice_type", label: "Type", type: "badge" },
    { key: "invoice_date", label: "Date", type: "date" },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "total_amount", label: "Amount", type: "currency" },
    { key: "tax_amount", label: "Tax", type: "currency" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "invoice_number", label: "Invoice Number", required: true },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "vendor_id", label: "Vendor ID", type: "number" },
    { name: "invoice_type", label: "Type", type: "select", options: [
      { value: "Payable", label: "Payable" },
      { value: "Receivable", label: "Receivable" },
    ]},
    { name: "invoice_date", label: "Invoice Date", type: "date", required: true },
    { name: "due_date", label: "Due Date", type: "date", required: true },
    { name: "total_amount", label: "Total Amount (AED)", type: "currency", required: true },
    { name: "tax_amount", label: "Tax Amount (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" },
      { value: "Sent", label: "Sent" },
      { value: "Paid", label: "Paid" },
      { value: "Overdue", label: "Overdue" },
    ]},
  ],
  detailFields: [
    { key: "invoice_id", label: "ID" },
    { key: "invoice_number", label: "Invoice #" },
    { key: "invoice_type", label: "Type" },
    { key: "invoice_date", label: "Date", type: "date" },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "total_amount", label: "Total", type: "currency" },
    { key: "tax_amount", label: "Tax", type: "currency" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const budgetsConfig: ModuleConfig = {
  title: "Budgets",
  description: "Project budgets and cost tracking",
  endpoint: "/financial/budgets",
  idField: "budget_id",
  entityName: "Budget",
  columns: [
    { key: "budget_name", label: "Budget Name" },
    { key: "category", label: "Category", type: "badge" },
    { key: "planned_amount", label: "Planned", type: "currency" },
    { key: "actual_amount", label: "Actual", type: "currency" },
    { key: "fiscal_year", label: "Year" },
    { key: "period", label: "Period" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "budget_name", label: "Budget Name", required: true },
    { name: "category", label: "Category" },
    { name: "planned_amount", label: "Planned Amount (AED)", type: "currency", required: true },
    { name: "actual_amount", label: "Actual Amount (AED)", type: "currency" },
    { name: "fiscal_year", label: "Fiscal Year", type: "number" },
    { name: "period", label: "Period" },
  ],
  detailFields: [
    { key: "budget_id", label: "ID" },
    { key: "budget_name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "planned_amount", label: "Planned", type: "currency" },
    { key: "actual_amount", label: "Actual", type: "currency" },
    { key: "fiscal_year", label: "Year" },
    { key: "period", label: "Period" },
  ],
};

// ===================== M3: CRM =====================
export const customersConfig: ModuleConfig = {
  title: "Customers",
  description: "Customer relationship management",
  endpoint: "/customers",
  idField: "customer_id",
  entityName: "Customer",
  searchPlaceholder: "Search customers...",
  columns: [
    { key: "customer_name", label: "Name" },
    { key: "customer_type", label: "Type", type: "badge" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "source", label: "Source", type: "badge" },
  ],
  formFields: [
    { name: "customer_name", label: "Customer Name", required: true },
    { name: "customer_type", label: "Type", type: "select", options: [
      { value: "Individual", label: "Individual" },
      { value: "Corporate", label: "Corporate" },
    ]},
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "source", label: "Source", type: "select", options: [
      { value: "Website", label: "Website" },
      { value: "Referral", label: "Referral" },
      { value: "Walk-in", label: "Walk-in" },
      { value: "Portal", label: "Portal" },
      { value: "Social Media", label: "Social Media" },
    ]},
  ],
  detailFields: [
    { key: "customer_id", label: "ID" },
    { key: "customer_name", label: "Name" },
    { key: "customer_type", label: "Type" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    { key: "source", label: "Source" },
    { key: "created_at", label: "Created", type: "date" },
  ],
};

export const leadsConfig: ModuleConfig = {
  title: "Leads",
  description: "Lead tracking and qualification",
  endpoint: "/leads",
  idField: "lead_id",
  entityName: "Lead",
  searchPlaceholder: "Search leads...",
  columns: [
    { key: "lead_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "source", label: "Source", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "interest_type", label: "Interest", type: "badge" },
    { key: "budget_range", label: "Budget" },
    { key: "assigned_agent", label: "Agent" },
  ],
  formFields: [
    { name: "lead_name", label: "Lead Name", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "source", label: "Source", type: "select", options: [
      { value: "Website", label: "Website" },
      { value: "Social Media", label: "Social Media" },
      { value: "Referral", label: "Referral" },
      { value: "Portal", label: "Portal" },
      { value: "Walk-in", label: "Walk-in" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "New", label: "New" },
      { value: "Contacted", label: "Contacted" },
      { value: "Qualified", label: "Qualified" },
      { value: "Converted", label: "Converted" },
      { value: "Lost", label: "Lost" },
    ]},
    { name: "interest_type", label: "Interest", type: "select", options: [
      { value: "Buy", label: "Buy" },
      { value: "Rent", label: "Rent" },
      { value: "Invest", label: "Invest" },
    ]},
    { name: "budget_range", label: "Budget Range" },
    { name: "preferred_location", label: "Preferred Location" },
    { name: "assigned_agent", label: "Assigned Agent" },
    { name: "project_id", label: "Project ID", type: "number" },
  ],
  detailFields: [
    { key: "lead_id", label: "ID" },
    { key: "lead_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "source", label: "Source" },
    { key: "status", label: "Status", type: "status" },
    { key: "interest_type", label: "Interest" },
    { key: "budget_range", label: "Budget" },
    { key: "preferred_location", label: "Location" },
    { key: "assigned_agent", label: "Agent" },
    { key: "created_at", label: "Created", type: "date" },
  ],
};

export const interactionsConfig: ModuleConfig = {
  title: "Interactions",
  description: "Customer and lead interaction history",
  endpoint: "/interactions",
  idField: "interaction_id",
  entityName: "Interaction",
  columns: [
    { key: "interaction_type", label: "Type", type: "badge" },
    { key: "interaction_date", label: "Date", type: "date" },
    { key: "summary", label: "Summary" },
    { key: "outcome", label: "Outcome" },
    { key: "agent_name", label: "Agent" },
  ],
  formFields: [
    { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "lead_id", label: "Lead ID", type: "number" },
    { name: "interaction_type", label: "Type", type: "select", options: [
      { value: "Call", label: "Call" },
      { value: "Email", label: "Email" },
      { value: "Meeting", label: "Meeting" },
      { value: "Site Visit", label: "Site Visit" },
    ]},
    { name: "interaction_date", label: "Date", type: "date", required: true },
    { name: "summary", label: "Summary", type: "textarea", width: "full" },
    { name: "outcome", label: "Outcome", type: "textarea", width: "full" },
    { name: "next_action", label: "Next Action" },
    { name: "agent_name", label: "Agent Name" },
  ],
  detailFields: [
    { key: "interaction_id", label: "ID" },
    { key: "interaction_type", label: "Type" },
    { key: "interaction_date", label: "Date", type: "date" },
    { key: "summary", label: "Summary" },
    { key: "outcome", label: "Outcome" },
    { key: "next_action", label: "Next Action" },
    { key: "agent_name", label: "Agent" },
  ],
};

// ===================== M4: PROPERTY MANAGEMENT =====================
export const propertiesConfig: ModuleConfig = {
  title: "Property Management",
  description: "Manage all residential and commercial properties",
  endpoint: "/properties",
  idField: "property_id",
  entityName: "Property",
  searchPlaceholder: "Search properties...",
  columns: [
    { key: "property_code", label: "Code", width: "100px" },
    { key: "property_name", label: "Property Name" },
    { key: "property_type", label: "Type", type: "badge" },
    { key: "city", label: "City" },
    { key: "area_sqft", label: "Area (sqft)", type: "number" },
    { key: "bedrooms", label: "Beds", type: "number" },
    { key: "status", label: "Status", type: "status" },
    { key: "listing_price", label: "Price", type: "currency" },
  ],
  formFields: [
    { name: "property_name", label: "Property Name", required: true },
    { name: "property_code", label: "Property Code", required: true },
    { name: "property_type", label: "Type", type: "select", options: [
      { value: "Apartment", label: "Apartment" },
      { value: "Villa", label: "Villa" },
      { value: "Office", label: "Office" },
      { value: "Retail", label: "Retail" },
      { value: "Warehouse", label: "Warehouse" },
      { value: "Land", label: "Land" },
    ]},
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "address", label: "Address", width: "full" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "area_sqft", label: "Area (sqft)", type: "number" },
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    { name: "floor_number", label: "Floor", type: "number" },
    { name: "unit_number", label: "Unit Number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Available" },
      { value: "Sold", label: "Sold" },
      { value: "Leased", label: "Leased" },
      { value: "Under Construction", label: "Under Construction" },
    ]},
    { name: "market_value", label: "Market Value (AED)", type: "currency" },
    { name: "listing_price", label: "Listing Price (AED)", type: "currency" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "property_id", label: "ID" },
    { key: "property_code", label: "Code" },
    { key: "property_name", label: "Name" },
    { key: "property_type", label: "Type" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "area_sqft", label: "Area (sqft)", type: "number" },
    { key: "bedrooms", label: "Bedrooms" },
    { key: "bathrooms", label: "Bathrooms" },
    { key: "floor_number", label: "Floor" },
    { key: "unit_number", label: "Unit" },
    { key: "status", label: "Status", type: "status" },
    { key: "market_value", label: "Market Value", type: "currency" },
    { key: "listing_price", label: "Listing Price", type: "currency" },
    { key: "description", label: "Description" },
  ],
};

// ===================== M5: LAND ACQUISITION =====================
export const landConfig: ModuleConfig = {
  title: "Land Acquisition & Development",
  description: "Track land parcels, negotiations, and acquisitions",
  endpoint: "/land-acquisitions",
  idField: "acquisition_id",
  entityName: "Land Acquisition",
  columns: [
    { key: "land_name", label: "Land Name" },
    { key: "location", label: "Location" },
    { key: "area_acres", label: "Area (acres)", type: "number" },
    { key: "land_type", label: "Type", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "asking_price", label: "Asking Price", type: "currency" },
    { key: "negotiated_price", label: "Negotiated", type: "currency" },
    { key: "legal_status", label: "Legal Status", type: "badge" },
  ],
  formFields: [
    { name: "land_name", label: "Land Name", required: true },
    { name: "location", label: "Location", required: true },
    { name: "area_acres", label: "Area (acres)", type: "number" },
    { name: "land_type", label: "Type", type: "select", options: [
      { value: "Residential", label: "Residential" },
      { value: "Commercial", label: "Commercial" },
      { value: "Industrial", label: "Industrial" },
      { value: "Agricultural", label: "Agricultural" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Identified", label: "Identified" },
      { value: "Under Negotiation", label: "Under Negotiation" },
      { value: "Acquired", label: "Acquired" },
      { value: "Rejected", label: "Rejected" },
    ]},
    { name: "owner_name", label: "Owner Name" },
    { name: "asking_price", label: "Asking Price (AED)", type: "currency" },
    { name: "negotiated_price", label: "Negotiated Price (AED)", type: "currency" },
    { name: "legal_status", label: "Legal Status" },
    { name: "survey_number", label: "Survey Number" },
    { name: "zoning_info", label: "Zoning Info" },
    { name: "created_by", label: "Created By", defaultValue: "admin" },
  ],
  detailFields: [
    { key: "acquisition_id", label: "ID" },
    { key: "land_name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "area_acres", label: "Area (acres)", type: "number" },
    { key: "land_type", label: "Type" },
    { key: "status", label: "Status", type: "status" },
    { key: "owner_name", label: "Owner" },
    { key: "asking_price", label: "Asking Price", type: "currency" },
    { key: "negotiated_price", label: "Negotiated", type: "currency" },
    { key: "legal_status", label: "Legal Status" },
    { key: "survey_number", label: "Survey #" },
    { key: "zoning_info", label: "Zoning" },
  ],
};

// ===================== M6: BIDDING & PROCUREMENT =====================
export const vendorsConfig: ModuleConfig = {
  title: "Vendors",
  description: "Contractor and supplier management",
  endpoint: "/vendors",
  idField: "vendor_id",
  entityName: "Vendor",
  columns: [
    { key: "vendor_name", label: "Vendor Name" },
    { key: "vendor_type", label: "Type", type: "badge" },
    { key: "contact_person", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "rating", label: "Rating", type: "number" },
    { key: "specialization", label: "Specialization" },
  ],
  formFields: [
    { name: "vendor_name", label: "Vendor Name", required: true },
    { name: "vendor_type", label: "Type", type: "select", options: [
      { value: "Contractor", label: "Contractor" },
      { value: "Subcontractor", label: "Subcontractor" },
      { value: "Supplier", label: "Supplier" },
      { value: "Consultant", label: "Consultant" },
    ]},
    { name: "contact_person", label: "Contact Person" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "city", label: "City" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "rating", label: "Rating (1-5)", type: "number" },
    { name: "specialization", label: "Specialization" },
  ],
  detailFields: [
    { key: "vendor_id", label: "ID" },
    { key: "vendor_name", label: "Name" },
    { key: "vendor_type", label: "Type" },
    { key: "contact_person", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "city", label: "City" },
    { key: "rating", label: "Rating" },
    { key: "specialization", label: "Specialization" },
  ],
};

export const bidsConfig: ModuleConfig = {
  title: "Bids",
  description: "Bid management and tracking",
  endpoint: "/bids",
  idField: "bid_id",
  entityName: "Bid",
  columns: [
    { key: "bid_title", label: "Title" },
    { key: "bid_type", label: "Type", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "submission_deadline", label: "Deadline", type: "date" },
    { key: "estimated_value", label: "Est. Value", type: "currency" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "bid_title", label: "Bid Title", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "bid_type", label: "Type", type: "select", options: [
      { value: "Open", label: "Open" },
      { value: "Invited", label: "Invited" },
      { value: "Negotiated", label: "Negotiated" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" },
      { value: "Closed", label: "Closed" },
      { value: "Awarded", label: "Awarded" },
      { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "submission_deadline", label: "Deadline", type: "date" },
    { name: "estimated_value", label: "Estimated Value (AED)", type: "currency" },
  ],
  detailFields: [
    { key: "bid_id", label: "ID" },
    { key: "bid_title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "bid_type", label: "Type" },
    { key: "status", label: "Status", type: "status" },
    { key: "submission_deadline", label: "Deadline", type: "date" },
    { key: "estimated_value", label: "Value", type: "currency" },
  ],
};

export const purchaseOrdersConfig: ModuleConfig = {
  title: "Purchase Orders",
  description: "Procurement purchase orders",
  endpoint: "/purchase-orders",
  idField: "po_id",
  entityName: "Purchase Order",
  columns: [
    { key: "po_number", label: "PO #" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "delivery_date", label: "Delivery", type: "date" },
    { key: "total_amount", label: "Amount", type: "currency" },
    { key: "status", label: "Status", type: "status" },
    { key: "approved_by", label: "Approved By" },
  ],
  formFields: [
    { name: "po_number", label: "PO Number", required: true },
    { name: "vendor_id", label: "Vendor ID", type: "number", required: true },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "order_date", label: "Order Date", type: "date", required: true },
    { name: "delivery_date", label: "Delivery Date", type: "date" },
    { name: "total_amount", label: "Total Amount (AED)", type: "currency", required: true },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" },
      { value: "Approved", label: "Approved" },
      { value: "Ordered", label: "Ordered" },
      { value: "Received", label: "Received" },
      { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "approved_by", label: "Approved By" },
  ],
  detailFields: [
    { key: "po_id", label: "ID" },
    { key: "po_number", label: "PO #" },
    { key: "order_date", label: "Order Date", type: "date" },
    { key: "delivery_date", label: "Delivery", type: "date" },
    { key: "total_amount", label: "Amount", type: "currency" },
    { key: "status", label: "Status", type: "status" },
    { key: "approved_by", label: "Approved By" },
  ],
};

// ===================== M7: CONSTRUCTION MANAGEMENT =====================
export const constructionConfig: ModuleConfig = {
  title: "Construction Activities",
  description: "Track construction phases and progress",
  endpoint: "/construction/activities",
  idField: "activity_id",
  entityName: "Activity",
  columns: [
    { key: "activity_name", label: "Activity" },
    { key: "phase", label: "Phase", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" },
    { key: "estimated_cost", label: "Est. Cost", type: "currency" },
    { key: "actual_cost", label: "Actual Cost", type: "currency" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "activity_name", label: "Activity Name", required: true },
    { name: "phase", label: "Phase", type: "select", options: [
      { value: "Foundation", label: "Foundation" },
      { value: "Structure", label: "Structure" },
      { value: "MEP", label: "MEP" },
      { value: "Finishing", label: "Finishing" },
      { value: "Landscaping", label: "Landscaping" },
    ]},
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "progress_pct", label: "Progress (%)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Not Started", label: "Not Started" },
      { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
      { value: "Delayed", label: "Delayed" },
    ]},
    { name: "estimated_cost", label: "Estimated Cost (AED)", type: "currency" },
    { name: "actual_cost", label: "Actual Cost (AED)", type: "currency" },
  ],
  detailFields: [
    { key: "activity_id", label: "ID" },
    { key: "activity_name", label: "Activity" },
    { key: "phase", label: "Phase" },
    { key: "status", label: "Status", type: "status" },
    { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" },
    { key: "estimated_cost", label: "Est. Cost", type: "currency" },
    { key: "actual_cost", label: "Actual Cost", type: "currency" },
    { key: "description", label: "Description" },
  ],
};

export const dailyLogsConfig: ModuleConfig = {
  title: "Daily Logs",
  description: "Construction site daily activity logs",
  endpoint: "/construction/daily-logs",
  idField: "log_id",
  entityName: "Daily Log",
  columns: [
    { key: "log_date", label: "Date", type: "date" },
    { key: "weather", label: "Weather" },
    { key: "workforce_count", label: "Workforce", type: "number" },
    { key: "activities_performed", label: "Activities" },
    { key: "logged_by", label: "Logged By" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "log_date", label: "Date", type: "date", required: true },
    { name: "weather", label: "Weather" },
    { name: "workforce_count", label: "Workforce Count", type: "number" },
    { name: "activities_performed", label: "Activities Performed", type: "textarea", width: "full" },
    { name: "materials_used", label: "Materials Used", type: "textarea", width: "full" },
    { name: "issues_reported", label: "Issues Reported", type: "textarea", width: "full" },
    { name: "logged_by", label: "Logged By" },
  ],
  detailFields: [
    { key: "log_id", label: "ID" },
    { key: "log_date", label: "Date", type: "date" },
    { key: "weather", label: "Weather" },
    { key: "workforce_count", label: "Workforce", type: "number" },
    { key: "activities_performed", label: "Activities" },
    { key: "materials_used", label: "Materials" },
    { key: "issues_reported", label: "Issues" },
    { key: "logged_by", label: "Logged By" },
  ],
};

// ===================== M8: PROJECT CONTROLS =====================
export const controlsConfig: ModuleConfig = {
  title: "Project Controls",
  description: "Earned value, cost and schedule performance",
  endpoint: "/project-controls",
  idField: "control_id",
  entityName: "Control Record",
  columns: [
    { key: "control_date", label: "Date", type: "date" },
    { key: "cost_variance", label: "Cost Var.", type: "currency" },
    { key: "schedule_variance", label: "Sched. Var.", type: "number" },
    { key: "earned_value", label: "EV", type: "currency" },
    { key: "planned_value", label: "PV", type: "currency" },
    { key: "actual_cost", label: "AC", type: "currency" },
    { key: "cpi", label: "CPI", type: "number" },
    { key: "spi", label: "SPI", type: "number" },
    { key: "risk_level", label: "Risk", type: "status" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "control_date", label: "Date", type: "date", required: true },
    { name: "cost_variance", label: "Cost Variance (AED)", type: "currency" },
    { name: "schedule_variance", label: "Schedule Variance (days)", type: "number" },
    { name: "earned_value", label: "Earned Value (AED)", type: "currency" },
    { name: "planned_value", label: "Planned Value (AED)", type: "currency" },
    { name: "actual_cost", label: "Actual Cost (AED)", type: "currency" },
    { name: "cpi", label: "CPI", type: "number" },
    { name: "spi", label: "SPI", type: "number" },
    { name: "risk_level", label: "Risk Level", type: "select", options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ]},
  ],
  detailFields: [
    { key: "control_id", label: "ID" },
    { key: "control_date", label: "Date", type: "date" },
    { key: "cost_variance", label: "Cost Var.", type: "currency" },
    { key: "schedule_variance", label: "Sched. Var." },
    { key: "earned_value", label: "EV", type: "currency" },
    { key: "planned_value", label: "PV", type: "currency" },
    { key: "actual_cost", label: "AC", type: "currency" },
    { key: "cpi", label: "CPI" },
    { key: "spi", label: "SPI" },
    { key: "risk_level", label: "Risk", type: "status" },
  ],
};

export const risksConfig: ModuleConfig = {
  title: "Risk Register",
  description: "Project risk identification and mitigation",
  endpoint: "/risks",
  idField: "risk_id",
  entityName: "Risk",
  columns: [
    { key: "risk_description", label: "Description" },
    { key: "risk_category", label: "Category", type: "badge" },
    { key: "probability", label: "Probability", type: "status" },
    { key: "impact", label: "Impact", type: "status" },
    { key: "status", label: "Status", type: "status" },
    { key: "owner", label: "Owner" },
    { key: "identified_date", label: "Identified", type: "date" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "risk_description", label: "Description", type: "textarea", width: "full", required: true },
    { name: "risk_category", label: "Category", type: "select", options: [
      { value: "Financial", label: "Financial" },
      { value: "Schedule", label: "Schedule" },
      { value: "Resource", label: "Resource" },
      { value: "Technical", label: "Technical" },
      { value: "Legal", label: "Legal" },
    ]},
    { name: "probability", label: "Probability", type: "select", options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ]},
    { name: "impact", label: "Impact", type: "select", options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ]},
    { name: "mitigation_plan", label: "Mitigation Plan", type: "textarea", width: "full" },
    { name: "owner", label: "Owner" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" },
      { value: "Mitigated", label: "Mitigated" },
      { value: "Closed", label: "Closed" },
    ]},
    { name: "identified_date", label: "Identified Date", type: "date" },
  ],
  detailFields: [
    { key: "risk_id", label: "ID" },
    { key: "risk_description", label: "Description" },
    { key: "risk_category", label: "Category" },
    { key: "probability", label: "Probability" },
    { key: "impact", label: "Impact" },
    { key: "mitigation_plan", label: "Mitigation" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status", type: "status" },
    { key: "identified_date", label: "Identified", type: "date" },
  ],
};

// ===================== M9-M20: Remaining modules =====================
export const assetsConfig: ModuleConfig = {
  title: "Asset Management", description: "Equipment and asset tracking", endpoint: "/assets", idField: "asset_id", entityName: "Asset",
  columns: [
    { key: "asset_code", label: "Code", width: "90px" }, { key: "asset_name", label: "Name" }, { key: "asset_type", label: "Type", type: "badge" },
    { key: "purchase_date", label: "Purchased", type: "date" }, { key: "purchase_cost", label: "Cost", type: "currency" },
    { key: "current_value", label: "Current Value", type: "currency" }, { key: "condition_status", label: "Condition", type: "status" }, { key: "location", label: "Location" },
  ],
  formFields: [
    { name: "asset_name", label: "Asset Name", required: true }, { name: "asset_code", label: "Code", required: true },
    { name: "asset_type", label: "Type", type: "select", options: [{ value: "Equipment", label: "Equipment" }, { value: "Machinery", label: "Machinery" }, { value: "Vehicle", label: "Vehicle" }, { value: "IT", label: "IT" }] },
    { name: "project_id", label: "Project ID", type: "number" }, { name: "purchase_date", label: "Purchase Date", type: "date" },
    { name: "purchase_cost", label: "Purchase Cost (AED)", type: "currency" }, { name: "current_value", label: "Current Value (AED)", type: "currency" },
    { name: "depreciation_rate", label: "Depreciation Rate (%)", type: "number" }, { name: "location", label: "Location" },
    { name: "condition_status", label: "Condition", type: "select", options: [{ value: "New", label: "New" }, { value: "Good", label: "Good" }, { value: "Fair", label: "Fair" }, { value: "Poor", label: "Poor" }] },
    { name: "assigned_to", label: "Assigned To" },
  ],
  detailFields: [
    { key: "asset_id", label: "ID" }, { key: "asset_code", label: "Code" }, { key: "asset_name", label: "Name" }, { key: "asset_type", label: "Type" },
    { key: "purchase_date", label: "Purchased", type: "date" }, { key: "purchase_cost", label: "Cost", type: "currency" },
    { key: "current_value", label: "Value", type: "currency" }, { key: "depreciation_rate", label: "Depr. Rate", type: "percent" },
    { key: "location", label: "Location" }, { key: "condition_status", label: "Condition", type: "status" }, { key: "assigned_to", label: "Assigned To" },
  ],
};

export const valuationsConfig: ModuleConfig = {
  title: "Property Valuation", description: "Property appraisals and market valuations", endpoint: "/valuations", idField: "valuation_id", entityName: "Valuation",
  columns: [
    { key: "valuation_date", label: "Date", type: "date" }, { key: "valuation_method", label: "Method", type: "badge" },
    { key: "market_value", label: "Market Value", type: "currency" }, { key: "assessed_value", label: "Assessed Value", type: "currency" },
    { key: "appraiser_name", label: "Appraiser" }, { key: "cap_rate", label: "Cap Rate", type: "percent" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true }, { name: "valuation_date", label: "Date", type: "date", required: true },
    { name: "valuation_method", label: "Method", type: "select", options: [{ value: "CMA", label: "CMA" }, { value: "Income Capitalization", label: "Income Capitalization" }, { value: "Cost Approach", label: "Cost Approach" }, { value: "DCF", label: "DCF" }] },
    { name: "market_value", label: "Market Value (AED)", type: "currency" }, { name: "assessed_value", label: "Assessed Value (AED)", type: "currency" },
    { name: "appraiser_name", label: "Appraiser Name" }, { name: "cap_rate", label: "Cap Rate (%)", type: "number" }, { name: "noi", label: "NOI (AED)", type: "currency" },
  ],
  detailFields: [
    { key: "valuation_id", label: "ID" }, { key: "valuation_date", label: "Date", type: "date" }, { key: "valuation_method", label: "Method" },
    { key: "market_value", label: "Market Value", type: "currency" }, { key: "assessed_value", label: "Assessed Value", type: "currency" },
    { key: "appraiser_name", label: "Appraiser" }, { key: "cap_rate", label: "Cap Rate", type: "percent" }, { key: "noi", label: "NOI", type: "currency" },
  ],
};

export const leasesConfig: ModuleConfig = {
  title: "Lease & Rental Management", description: "Manage property leases and rental agreements", endpoint: "/leases", idField: "lease_id", entityName: "Lease",
  columns: [
    { key: "lease_type", label: "Type", type: "badge" }, { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "monthly_rent", label: "Monthly Rent", type: "currency" }, { key: "security_deposit", label: "Deposit", type: "currency" },
    { key: "escalation_rate", label: "Escalation", type: "percent" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true }, { name: "tenant_id", label: "Tenant ID", type: "number", required: true },
    { name: "lease_type", label: "Type", type: "select", options: [{ value: "Residential", label: "Residential" }, { value: "Commercial", label: "Commercial" }] },
    { name: "start_date", label: "Start Date", type: "date", required: true }, { name: "end_date", label: "End Date", type: "date", required: true },
    { name: "monthly_rent", label: "Monthly Rent (AED)", type: "currency", required: true }, { name: "security_deposit", label: "Security Deposit (AED)", type: "currency" },
    { name: "payment_frequency", label: "Payment Frequency", type: "select", options: [{ value: "Monthly", label: "Monthly" }, { value: "Quarterly", label: "Quarterly" }, { value: "Annually", label: "Annually" }] },
    { name: "escalation_rate", label: "Escalation Rate (%)", type: "number" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Active", label: "Active" }, { value: "Expired", label: "Expired" }, { value: "Terminated", label: "Terminated" }] },
  ],
  detailFields: [
    { key: "lease_id", label: "ID" }, { key: "lease_type", label: "Type" }, { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" }, { key: "monthly_rent", label: "Rent", type: "currency" },
    { key: "security_deposit", label: "Deposit", type: "currency" }, { key: "escalation_rate", label: "Escalation", type: "percent" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const rentPaymentsConfig: ModuleConfig = {
  title: "Rent Payments", description: "Track rental payment collections", endpoint: "/rent-payments", idField: "payment_id", entityName: "Rent Payment",
  columns: [
    { key: "payment_date", label: "Date", type: "date" }, { key: "amount", label: "Amount", type: "currency" },
    { key: "payment_method", label: "Method", type: "badge" }, { key: "reference_number", label: "Reference" },
    { key: "period_from", label: "From", type: "date" }, { key: "period_to", label: "To", type: "date" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "lease_id", label: "Lease ID", type: "number", required: true }, { name: "tenant_id", label: "Tenant ID", type: "number", required: true },
    { name: "payment_date", label: "Payment Date", type: "date", required: true }, { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "payment_method", label: "Method", type: "select", options: [{ value: "Bank Transfer", label: "Bank Transfer" }, { value: "Cash", label: "Cash" }, { value: "Cheque", label: "Cheque" }] },
    { name: "reference_number", label: "Reference #" }, { name: "period_from", label: "Period From", type: "date" }, { name: "period_to", label: "Period To", type: "date" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Paid", label: "Paid" }, { value: "Pending", label: "Pending" }, { value: "Overdue", label: "Overdue" }] },
  ],
  detailFields: [
    { key: "payment_id", label: "ID" }, { key: "payment_date", label: "Date", type: "date" }, { key: "amount", label: "Amount", type: "currency" },
    { key: "payment_method", label: "Method" }, { key: "reference_number", label: "Reference" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const salesConfig: ModuleConfig = {
  title: "Sales Management", description: "Property sales and transactions", endpoint: "/sales", idField: "sale_id", entityName: "Sale",
  columns: [
    { key: "contract_number", label: "Contract #" }, { key: "sale_date", label: "Date", type: "date" },
    { key: "sale_price", label: "Sale Price", type: "currency" }, { key: "commission_amount", label: "Commission", type: "currency" },
    { key: "commission_pct", label: "Comm %", type: "percent" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true }, { name: "customer_id", label: "Customer ID", type: "number", required: true },
    { name: "agent_id", label: "Agent ID", type: "number" }, { name: "sale_date", label: "Sale Date", type: "date", required: true },
    { name: "sale_price", label: "Sale Price (AED)", type: "currency", required: true }, { name: "commission_amount", label: "Commission (AED)", type: "currency" },
    { name: "commission_pct", label: "Commission %", type: "number" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Under Contract", label: "Under Contract" }, { value: "Closed", label: "Closed" }, { value: "Cancelled", label: "Cancelled" }] },
    { name: "contract_number", label: "Contract Number" },
  ],
  detailFields: [
    { key: "sale_id", label: "ID" }, { key: "contract_number", label: "Contract #" }, { key: "sale_date", label: "Date", type: "date" },
    { key: "sale_price", label: "Price", type: "currency" }, { key: "commission_amount", label: "Commission", type: "currency" },
    { key: "commission_pct", label: "Comm %", type: "percent" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const paymentPlansConfig: ModuleConfig = {
  title: "Payment Plans", description: "Installment payment tracking", endpoint: "/payment-plans", idField: "plan_id", entityName: "Payment Plan",
  columns: [
    { key: "installment_number", label: "Inst. #", type: "number" }, { key: "due_date", label: "Due Date", type: "date" },
    { key: "amount", label: "Amount", type: "currency" }, { key: "paid_amount", label: "Paid", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "sale_id", label: "Sale ID", type: "number", required: true }, { name: "installment_number", label: "Installment #", type: "number", required: true },
    { name: "due_date", label: "Due Date", type: "date", required: true }, { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "paid_amount", label: "Paid Amount (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Pending", label: "Pending" }, { value: "Paid", label: "Paid" }, { value: "Overdue", label: "Overdue" }] },
  ],
  detailFields: [
    { key: "plan_id", label: "ID" }, { key: "installment_number", label: "Inst. #" }, { key: "due_date", label: "Due", type: "date" },
    { key: "amount", label: "Amount", type: "currency" }, { key: "paid_amount", label: "Paid", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const campaignsConfig: ModuleConfig = {
  title: "Marketing Campaigns", description: "Marketing campaign management and tracking", endpoint: "/campaigns", idField: "campaign_id", entityName: "Campaign",
  columns: [
    { key: "campaign_name", label: "Campaign" }, { key: "campaign_type", label: "Type", type: "badge" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "budget", label: "Budget", type: "currency" }, { key: "actual_spend", label: "Spent", type: "currency" },
    { key: "leads_generated", label: "Leads", type: "number" }, { key: "conversions", label: "Conversions", type: "number" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "campaign_name", label: "Campaign Name", required: true },
    { name: "campaign_type", label: "Type", type: "select", options: [{ value: "Digital", label: "Digital" }, { value: "Event", label: "Event" }, { value: "Email", label: "Email" }, { value: "Print", label: "Print" }] },
    { name: "project_id", label: "Project ID", type: "number" }, { name: "start_date", label: "Start Date", type: "date" }, { name: "end_date", label: "End Date", type: "date" },
    { name: "budget", label: "Budget (AED)", type: "currency" }, { name: "actual_spend", label: "Actual Spend (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Draft", label: "Draft" }, { value: "Active", label: "Active" }, { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" }] },
    { name: "leads_generated", label: "Leads Generated", type: "number" }, { name: "conversions", label: "Conversions", type: "number" },
  ],
  detailFields: [
    { key: "campaign_id", label: "ID" }, { key: "campaign_name", label: "Name" }, { key: "campaign_type", label: "Type" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "budget", label: "Budget", type: "currency" }, { key: "actual_spend", label: "Spent", type: "currency" },
    { key: "leads_generated", label: "Leads" }, { key: "conversions", label: "Conversions" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const opportunitiesConfig: ModuleConfig = {
  title: "Opportunity Management", description: "Sales pipeline and opportunity tracking", endpoint: "/opportunities", idField: "opportunity_id", entityName: "Opportunity",
  columns: [
    { key: "opportunity_name", label: "Opportunity" }, { key: "stage", label: "Stage", type: "status" },
    { key: "estimated_value", label: "Value", type: "currency" }, { key: "probability_pct", label: "Probability", type: "percent" },
    { key: "expected_close_date", label: "Close Date", type: "date" }, { key: "assigned_agent", label: "Agent" }, { key: "source", label: "Source", type: "badge" },
  ],
  formFields: [
    { name: "opportunity_name", label: "Opportunity Name", required: true }, { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "project_id", label: "Project ID", type: "number" }, { name: "property_id", label: "Property ID", type: "number" },
    { name: "stage", label: "Stage", type: "select", options: [{ value: "Qualification", label: "Qualification" }, { value: "Proposal", label: "Proposal" }, { value: "Negotiation", label: "Negotiation" }, { value: "Closed Won", label: "Closed Won" }, { value: "Closed Lost", label: "Closed Lost" }] },
    { name: "estimated_value", label: "Estimated Value (AED)", type: "currency" }, { name: "probability_pct", label: "Probability (%)", type: "number" },
    { name: "expected_close_date", label: "Expected Close", type: "date" }, { name: "assigned_agent", label: "Assigned Agent" },
    { name: "source", label: "Source", type: "select", options: [{ value: "Website", label: "Website" }, { value: "Referral", label: "Referral" }, { value: "Walk-in", label: "Walk-in" }, { value: "Social Media", label: "Social Media" }] },
  ],
  detailFields: [
    { key: "opportunity_id", label: "ID" }, { key: "opportunity_name", label: "Name" }, { key: "stage", label: "Stage", type: "status" },
    { key: "estimated_value", label: "Value", type: "currency" }, { key: "probability_pct", label: "Probability", type: "percent" },
    { key: "expected_close_date", label: "Close Date", type: "date" }, { key: "assigned_agent", label: "Agent" }, { key: "source", label: "Source" },
  ],
};

export const employeesConfig: ModuleConfig = {
  title: "HCM & Payroll", description: "Employee management, payroll, and attendance", endpoint: "/employees", idField: "employee_id", entityName: "Employee",
  columns: [
    { key: "employee_code", label: "Code", width: "80px" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
    { key: "department", label: "Department", type: "badge" }, { key: "designation", label: "Designation" },
    { key: "email", label: "Email" }, { key: "salary", label: "Salary", type: "currency" }, { key: "employment_type", label: "Type", type: "status" },
  ],
  formFields: [
    { name: "employee_code", label: "Employee Code", required: true }, { name: "first_name", label: "First Name", required: true }, { name: "last_name", label: "Last Name", required: true },
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "department", label: "Department", type: "select", options: [{ value: "Projects", label: "Projects" }, { value: "Sales", label: "Sales" }, { value: "Marketing", label: "Marketing" }, { value: "Finance", label: "Finance" }, { value: "HR", label: "HR" }, { value: "Legal", label: "Legal" }, { value: "IT", label: "IT" }] },
    { name: "designation", label: "Designation" }, { name: "hire_date", label: "Hire Date", type: "date" }, { name: "salary", label: "Salary (AED)", type: "currency" },
    { name: "employment_type", label: "Type", type: "select", options: [{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }, { value: "Contract", label: "Contract" }] },
  ],
  detailFields: [
    { key: "employee_id", label: "ID" }, { key: "employee_code", label: "Code" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "department", label: "Department" }, { key: "designation", label: "Designation" },
    { key: "hire_date", label: "Hire Date", type: "date" }, { key: "salary", label: "Salary", type: "currency" }, { key: "employment_type", label: "Type" },
  ],
};

export const payrollConfig: ModuleConfig = {
  title: "Payroll", description: "Monthly payroll processing", endpoint: "/payroll", idField: "payroll_id", entityName: "Payroll Record",
  columns: [
    { key: "pay_period_start", label: "Period Start", type: "date" }, { key: "pay_period_end", label: "Period End", type: "date" },
    { key: "basic_salary", label: "Basic", type: "currency" }, { key: "allowances", label: "Allowances", type: "currency" },
    { key: "deductions", label: "Deductions", type: "currency" }, { key: "net_pay", label: "Net Pay", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "employee_id", label: "Employee ID", type: "number", required: true }, { name: "pay_period_start", label: "Period Start", type: "date", required: true },
    { name: "pay_period_end", label: "Period End", type: "date", required: true }, { name: "basic_salary", label: "Basic Salary (AED)", type: "currency" },
    { name: "allowances", label: "Allowances (AED)", type: "currency" }, { name: "deductions", label: "Deductions (AED)", type: "currency" },
    { name: "overtime_hours", label: "OT Hours", type: "number" }, { name: "overtime_amount", label: "OT Amount (AED)", type: "currency" },
    { name: "net_pay", label: "Net Pay (AED)", type: "currency" }, { name: "payment_date", label: "Payment Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Draft", label: "Draft" }, { value: "Processed", label: "Processed" }, { value: "Paid", label: "Paid" }] },
  ],
  detailFields: [
    { key: "payroll_id", label: "ID" }, { key: "pay_period_start", label: "Start", type: "date" }, { key: "pay_period_end", label: "End", type: "date" },
    { key: "basic_salary", label: "Basic", type: "currency" }, { key: "allowances", label: "Allowances", type: "currency" },
    { key: "deductions", label: "Deductions", type: "currency" }, { key: "net_pay", label: "Net Pay", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const attendanceConfig: ModuleConfig = {
  title: "Attendance", description: "Employee attendance tracking", endpoint: "/attendance", idField: "attendance_id", entityName: "Attendance Record",
  columns: [
    { key: "attendance_date", label: "Date", type: "date" }, { key: "check_in", label: "Check In" }, { key: "check_out", label: "Check Out" },
    { key: "hours_worked", label: "Hours", type: "number" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "employee_id", label: "Employee ID", type: "number", required: true }, { name: "attendance_date", label: "Date", type: "date", required: true },
    { name: "check_in", label: "Check In", type: "datetime" }, { name: "check_out", label: "Check Out", type: "datetime" },
    { name: "hours_worked", label: "Hours Worked", type: "number" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Present", label: "Present" }, { value: "Absent", label: "Absent" }, { value: "Leave", label: "Leave" }, { value: "Half-day", label: "Half-day" }] },
    { name: "project_id", label: "Project ID", type: "number" },
  ],
  detailFields: [
    { key: "attendance_id", label: "ID" }, { key: "attendance_date", label: "Date", type: "date" }, { key: "check_in", label: "Check In" },
    { key: "check_out", label: "Check Out" }, { key: "hours_worked", label: "Hours" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const contractsConfig: ModuleConfig = {
  title: "Contracts", description: "Legal contracts and agreements", endpoint: "/contracts", idField: "contract_id", entityName: "Contract",
  columns: [
    { key: "contract_number", label: "Contract #" }, { key: "contract_type", label: "Type", type: "badge" }, { key: "party_name", label: "Party" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "value", label: "Value", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "contract_number", label: "Contract #", required: true },
    { name: "contract_type", label: "Type", type: "select", options: [{ value: "Construction", label: "Construction" }, { value: "Service", label: "Service" }, { value: "Vendor", label: "Vendor" }, { value: "Lease", label: "Lease" }] },
    { name: "project_id", label: "Project ID", type: "number" }, { name: "party_name", label: "Party Name", required: true },
    { name: "party_type", label: "Party Type", type: "select", options: [{ value: "Contractor", label: "Contractor" }, { value: "Supplier", label: "Supplier" }, { value: "Client", label: "Client" }] },
    { name: "start_date", label: "Start Date", type: "date" }, { name: "end_date", label: "End Date", type: "date" },
    { name: "value", label: "Value (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Draft", label: "Draft" }, { value: "Active", label: "Active" }, { value: "Expired", label: "Expired" }, { value: "Terminated", label: "Terminated" }] },
    { name: "signed_date", label: "Signed Date", type: "date" },
  ],
  detailFields: [
    { key: "contract_id", label: "ID" }, { key: "contract_number", label: "Contract #" }, { key: "contract_type", label: "Type" },
    { key: "party_name", label: "Party" }, { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "value", label: "Value", type: "currency" }, { key: "status", label: "Status", type: "status" }, { key: "signed_date", label: "Signed", type: "date" },
  ],
};

export const complianceConfig: ModuleConfig = {
  title: "Compliance Records", description: "Regulatory compliance and permits", endpoint: "/compliance", idField: "compliance_id", entityName: "Compliance Record",
  columns: [
    { key: "compliance_type", label: "Type", type: "badge" }, { key: "description", label: "Description" }, { key: "authority", label: "Authority" },
    { key: "submission_date", label: "Submitted", type: "date" }, { key: "approval_date", label: "Approved", type: "date" },
    { key: "status", label: "Status", type: "status" }, { key: "reference_number", label: "Reference" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "compliance_type", label: "Type", type: "select", options: [{ value: "Building Permit", label: "Building Permit" }, { value: "Environmental", label: "Environmental" }, { value: "Safety", label: "Safety" }, { value: "Fire", label: "Fire" }] },
    { name: "description", label: "Description", type: "textarea", width: "full" }, { name: "authority", label: "Authority" },
    { name: "submission_date", label: "Submission Date", type: "date" }, { name: "approval_date", label: "Approval Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Pending", label: "Pending" }, { value: "Approved", label: "Approved" }, { value: "Rejected", label: "Rejected" }, { value: "Expired", label: "Expired" }] },
    { name: "reference_number", label: "Reference Number" },
  ],
  detailFields: [
    { key: "compliance_id", label: "ID" }, { key: "compliance_type", label: "Type" }, { key: "description", label: "Description" },
    { key: "authority", label: "Authority" }, { key: "submission_date", label: "Submitted", type: "date" },
    { key: "approval_date", label: "Approved", type: "date" }, { key: "status", label: "Status", type: "status" }, { key: "reference_number", label: "Reference" },
  ],
};

export const documentsConfig: ModuleConfig = {
  title: "Document Management", description: "Project documents and file management", endpoint: "/documents", idField: "document_id", entityName: "Document",
  columns: [
    { key: "document_name", label: "Name" }, { key: "document_type", label: "Type", type: "badge" }, { key: "category", label: "Category", type: "badge" },
    { key: "version", label: "Version" }, { key: "uploaded_by", label: "Uploaded By" }, { key: "created_at", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "document_name", label: "Document Name", required: true },
    { name: "document_type", label: "Type", type: "select", options: [{ value: "Blueprint", label: "Blueprint" }, { value: "Report", label: "Report" }, { value: "Permit", label: "Permit" }, { value: "Contract", label: "Contract" }, { value: "Invoice", label: "Invoice" }] },
    { name: "category", label: "Category", type: "select", options: [{ value: "Design", label: "Design" }, { value: "Survey", label: "Survey" }, { value: "Finance", label: "Finance" }, { value: "Legal", label: "Legal" }, { value: "HR", label: "HR" }] },
    { name: "project_id", label: "Project ID", type: "number" }, { name: "version", label: "Version" },
    { name: "uploaded_by", label: "Uploaded By" }, { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "tags", label: "Tags (comma separated)" },
  ],
  detailFields: [
    { key: "document_id", label: "ID" }, { key: "document_name", label: "Name" }, { key: "document_type", label: "Type" },
    { key: "category", label: "Category" }, { key: "version", label: "Version" }, { key: "uploaded_by", label: "Uploaded By" },
    { key: "description", label: "Description" }, { key: "tags", label: "Tags" }, { key: "created_at", label: "Created", type: "date" },
  ],
};

export const inventoryConfig: ModuleConfig = {
  title: "Inventory Management", description: "Materials and supplies inventory", endpoint: "/inventory", idField: "inventory_id", entityName: "Inventory Item",
  columns: [
    { key: "item_code", label: "Code", width: "90px" }, { key: "item_name", label: "Item Name" }, { key: "category", label: "Category", type: "badge" },
    { key: "unit", label: "Unit" }, { key: "quantity_on_hand", label: "Qty On Hand", type: "number" }, { key: "reorder_level", label: "Reorder Level", type: "number" },
    { key: "unit_cost", label: "Unit Cost", type: "currency" }, { key: "warehouse_location", label: "Warehouse" },
  ],
  formFields: [
    { name: "item_name", label: "Item Name", required: true }, { name: "item_code", label: "Item Code", required: true },
    { name: "category", label: "Category" }, { name: "unit", label: "Unit" },
    { name: "quantity_on_hand", label: "Quantity On Hand", type: "number" }, { name: "reorder_level", label: "Reorder Level", type: "number" },
    { name: "unit_cost", label: "Unit Cost (AED)", type: "currency" }, { name: "warehouse_location", label: "Warehouse Location" },
    { name: "project_id", label: "Project ID", type: "number" },
  ],
  detailFields: [
    { key: "inventory_id", label: "ID" }, { key: "item_code", label: "Code" }, { key: "item_name", label: "Name" },
    { key: "category", label: "Category" }, { key: "unit", label: "Unit" }, { key: "quantity_on_hand", label: "Qty", type: "number" },
    { key: "reorder_level", label: "Reorder", type: "number" }, { key: "unit_cost", label: "Unit Cost", type: "currency" }, { key: "warehouse_location", label: "Warehouse" },
  ],
};

export const invTransactionsConfig: ModuleConfig = {
  title: "Inventory Transactions", description: "Material inward/outward movements", endpoint: "/inventory/transactions", idField: "inv_txn_id", entityName: "Inventory Transaction",
  columns: [
    { key: "transaction_type", label: "Type", type: "status" }, { key: "quantity", label: "Qty", type: "number" },
    { key: "reference_number", label: "Reference" }, { key: "transaction_date", label: "Date", type: "date" }, { key: "performed_by", label: "By" },
  ],
  formFields: [
    { name: "inventory_id", label: "Inventory ID", type: "number", required: true },
    { name: "transaction_type", label: "Type", type: "select", options: [{ value: "Inward", label: "Inward" }, { value: "Outward", label: "Outward" }] },
    { name: "quantity", label: "Quantity", type: "number", required: true }, { name: "project_id", label: "Project ID", type: "number" },
    { name: "reference_number", label: "Reference #" }, { name: "transaction_date", label: "Date", type: "date" }, { name: "performed_by", label: "Performed By" },
  ],
  detailFields: [
    { key: "inv_txn_id", label: "ID" }, { key: "transaction_type", label: "Type" }, { key: "quantity", label: "Qty", type: "number" },
    { key: "reference_number", label: "Reference" }, { key: "transaction_date", label: "Date", type: "date" }, { key: "performed_by", label: "By" },
  ],
};

export const ticketsConfig: ModuleConfig = {
  title: "Helpdesk Tickets", description: "Facility maintenance and support tickets", endpoint: "/helpdesk/tickets", idField: "ticket_id", entityName: "Ticket",
  columns: [
    { key: "ticket_number", label: "Ticket #" }, { key: "category", label: "Category", type: "badge" }, { key: "priority", label: "Priority", type: "status" },
    { key: "subject", label: "Subject" }, { key: "status", label: "Status", type: "status" }, { key: "assigned_to", label: "Assigned To" },
    { key: "reported_date", label: "Reported", type: "date" },
  ],
  formFields: [
    { name: "ticket_number", label: "Ticket #", required: true }, { name: "property_id", label: "Property ID", type: "number" },
    { name: "tenant_id", label: "Tenant ID", type: "number" },
    { name: "category", label: "Category", type: "select", options: [{ value: "HVAC", label: "HVAC" }, { value: "Plumbing", label: "Plumbing" }, { value: "Electrical", label: "Electrical" }, { value: "General", label: "General" }] },
    { name: "priority", label: "Priority", type: "select", options: [{ value: "Low", label: "Low" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" }, { value: "Critical", label: "Critical" }] },
    { name: "subject", label: "Subject", required: true }, { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Open", label: "Open" }, { value: "In Progress", label: "In Progress" }, { value: "Resolved", label: "Resolved" }, { value: "Closed", label: "Closed" }] },
    { name: "assigned_to", label: "Assigned To" }, { name: "reported_date", label: "Reported Date", type: "date" },
  ],
  detailFields: [
    { key: "ticket_id", label: "ID" }, { key: "ticket_number", label: "Ticket #" }, { key: "category", label: "Category" },
    { key: "priority", label: "Priority" }, { key: "subject", label: "Subject" }, { key: "description", label: "Description" },
    { key: "status", label: "Status", type: "status" }, { key: "assigned_to", label: "Assigned To" }, { key: "reported_date", label: "Reported", type: "date" },
  ],
};

export const maintenanceConfig: ModuleConfig = {
  title: "Maintenance Schedule", description: "Preventive and corrective maintenance", endpoint: "/helpdesk/maintenance", idField: "schedule_id", entityName: "Maintenance",
  columns: [
    { key: "maintenance_type", label: "Type", type: "badge" }, { key: "description", label: "Description" }, { key: "frequency", label: "Frequency" },
    { key: "next_due_date", label: "Next Due", type: "date" }, { key: "estimated_cost", label: "Est. Cost", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "maintenance_type", label: "Type", type: "select", options: [{ value: "Preventive", label: "Preventive" }, { value: "Corrective", label: "Corrective" }, { value: "Emergency", label: "Emergency" }] },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "frequency", label: "Frequency", type: "select", options: [{ value: "Monthly", label: "Monthly" }, { value: "Quarterly", label: "Quarterly" }, { value: "Annually", label: "Annually" }] },
    { name: "next_due_date", label: "Next Due Date", type: "date" }, { name: "assigned_vendor_id", label: "Vendor ID", type: "number" },
    { name: "estimated_cost", label: "Estimated Cost (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [{ value: "Scheduled", label: "Scheduled" }, { value: "In Progress", label: "In Progress" }, { value: "Completed", label: "Completed" }] },
  ],
  detailFields: [
    { key: "schedule_id", label: "ID" }, { key: "maintenance_type", label: "Type" }, { key: "description", label: "Description" },
    { key: "frequency", label: "Frequency" }, { key: "next_due_date", label: "Next Due", type: "date" },
    { key: "estimated_cost", label: "Est. Cost", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const tenantsConfig: ModuleConfig = {
  title: "Tenant Portal", description: "Tenant management and communications", endpoint: "/tenants", idField: "tenant_id", entityName: "Tenant",
  columns: [
    { key: "tenant_name", label: "Tenant Name" }, { key: "tenant_type", label: "Type", type: "badge" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "is_active", label: "Active", render: (v: any) => v ? "Yes" : "No" },
  ],
  formFields: [
    { name: "tenant_name", label: "Tenant Name", required: true },
    { name: "tenant_type", label: "Type", type: "select", options: [{ value: "Individual", label: "Individual" }, { value: "Corporate", label: "Corporate" }] },
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "property_id", label: "Property ID", type: "number" },
    { name: "is_active", label: "Active", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
  ],
  detailFields: [
    { key: "tenant_id", label: "ID" }, { key: "tenant_name", label: "Name" }, { key: "tenant_type", label: "Type" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "is_active", label: "Active" },
  ],
};

export const notificationsConfig: ModuleConfig = {
  title: "Notifications", description: "Tenant portal notifications", endpoint: "/notifications", idField: "notification_id", entityName: "Notification",
  columns: [
    { key: "title", label: "Title" }, { key: "notification_type", label: "Type", type: "badge" },
    { key: "message", label: "Message" }, { key: "is_read", label: "Read", render: (v: any) => v ? "Yes" : "No" },
    { key: "created_at", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "tenant_id", label: "Tenant ID", type: "number", required: true }, { name: "title", label: "Title", required: true },
    { name: "message", label: "Message", type: "textarea", width: "full", required: true },
    { name: "notification_type", label: "Type", type: "select", options: [{ value: "Payment Reminder", label: "Payment Reminder" }, { value: "Maintenance Update", label: "Maintenance Update" }, { value: "Announcement", label: "Announcement" }] },
  ],
  detailFields: [
    { key: "notification_id", label: "ID" }, { key: "title", label: "Title" }, { key: "notification_type", label: "Type" },
    { key: "message", label: "Message" }, { key: "is_read", label: "Read" }, { key: "created_at", label: "Date", type: "date" },
  ],
};
