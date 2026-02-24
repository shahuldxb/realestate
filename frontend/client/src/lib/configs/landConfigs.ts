import type { SubPageConfig } from "@/components/ModuleSubPage";
const M = "Land Acquisition";

export const landParcels: SubPageConfig = {
  title: "Land Parcels", description: "Manage land parcels and acquisition records",
  endpoint: "/land-acquisitions", idField: "acquisition_id", entityName: "Land Parcel",
  breadcrumb: { module: M, page: "Land Parcels" },
  columns: [
    { key: "parcel_number", label: "Parcel #" }, { key: "location", label: "Location" },
    { key: "area_sqft", label: "Area (sqft)", type: "number" },
    { key: "land_use_type", label: "Use Type", type: "badge" },
    { key: "acquisition_price", label: "Price", type: "currency" },
    { key: "status", label: "Status", type: "status" },
    { key: "acquisition_date", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "parcel_number", label: "Parcel Number", required: true },
    { name: "location", label: "Location", required: true },
    { name: "area_sqft", label: "Area (sqft)", type: "number", required: true },
    { name: "land_use_type", label: "Use Type", type: "select", options: [
      { value: "Residential", label: "Residential" }, { value: "Commercial", label: "Commercial" },
      { value: "Industrial", label: "Industrial" }, { value: "Mixed-Use", label: "Mixed-Use" }, { value: "Agricultural", label: "Agricultural" },
    ]},
    { name: "acquisition_price", label: "Price (AED)", type: "currency" },
    { name: "acquisition_date", label: "Acquisition Date", type: "date" },
    { name: "seller_name", label: "Seller Name" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Prospecting", label: "Prospecting" }, { value: "Negotiation", label: "Negotiation" },
      { value: "Due Diligence", label: "Due Diligence" }, { value: "Acquired", label: "Acquired" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "zoning_info", label: "Zoning Info", type: "textarea", width: "full" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "acquisition_id", label: "ID" }, { key: "parcel_number", label: "Parcel #" },
    { key: "location", label: "Location" }, { key: "area_sqft", label: "Area", type: "number" },
    { key: "land_use_type", label: "Use Type" }, { key: "acquisition_price", label: "Price", type: "currency" },
    { key: "acquisition_date", label: "Date", type: "date" }, { key: "seller_name", label: "Seller" },
    { key: "status", label: "Status", type: "status" }, { key: "zoning_info", label: "Zoning" },
  ],
};

export const negotiations: SubPageConfig = {
  title: "Negotiations", description: "Track land negotiation progress and offers",
  endpoint: "/land-negotiations", idField: "negotiation_id", entityName: "Negotiation",
  breadcrumb: { module: M, page: "Negotiations" },
  columns: [
    { key: "parcel_number", label: "Parcel #" }, { key: "counterparty", label: "Counterparty" },
    { key: "offer_amount", label: "Offer", type: "currency" },
    { key: "counter_offer", label: "Counter Offer", type: "currency" },
    { key: "status", label: "Status", type: "status" },
    { key: "negotiation_date", label: "Date", type: "date" },
  ],
  formFields: [
    { name: "acquisition_id", label: "Acquisition ID", type: "number", required: true },
    { name: "parcel_number", label: "Parcel Number" },
    { name: "counterparty", label: "Counterparty", required: true },
    { name: "offer_amount", label: "Offer Amount (AED)", type: "currency", required: true },
    { name: "counter_offer", label: "Counter Offer (AED)", type: "currency" },
    { name: "negotiation_date", label: "Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Open", label: "Open" }, { value: "Counter Offered", label: "Counter Offered" },
      { value: "Accepted", label: "Accepted" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "negotiation_id", label: "ID" }, { key: "parcel_number", label: "Parcel #" },
    { key: "counterparty", label: "Counterparty" }, { key: "offer_amount", label: "Offer", type: "currency" },
    { key: "counter_offer", label: "Counter", type: "currency" }, { key: "status", label: "Status", type: "status" },
    { key: "negotiation_date", label: "Date", type: "date" },
  ],
};

export const dueDiligence: SubPageConfig = {
  title: "Due Diligence", description: "Due diligence checklists and reports",
  endpoint: "/land-due-diligence", idField: "dd_id", entityName: "Due Diligence",
  breadcrumb: { module: M, page: "Due Diligence" },
  columns: [
    { key: "parcel_number", label: "Parcel #" }, { key: "check_type", label: "Check Type", type: "badge" },
    { key: "status", label: "Status", type: "status" }, { key: "assigned_to", label: "Assigned To" },
    { key: "due_date", label: "Due Date", type: "date" }, { key: "result", label: "Result", type: "status" },
  ],
  formFields: [
    { name: "acquisition_id", label: "Acquisition ID", type: "number", required: true },
    { name: "parcel_number", label: "Parcel Number" },
    { name: "check_type", label: "Check Type", type: "select", options: [
      { value: "Title Search", label: "Title Search" }, { value: "Environmental", label: "Environmental" },
      { value: "Survey", label: "Survey" }, { value: "Legal Review", label: "Legal Review" }, { value: "Zoning", label: "Zoning" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
    ]},
    { name: "result", label: "Result", type: "select", options: [
      { value: "Clear", label: "Clear" }, { value: "Issue Found", label: "Issue Found" }, { value: "Pending", label: "Pending" },
    ]},
    { name: "assigned_to", label: "Assigned To" },
    { name: "due_date", label: "Due Date", type: "date" },
    { name: "findings", label: "Findings", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "dd_id", label: "ID" }, { key: "parcel_number", label: "Parcel #" },
    { key: "check_type", label: "Type" }, { key: "status", label: "Status", type: "status" },
    { key: "result", label: "Result", type: "status" }, { key: "assigned_to", label: "Assigned To" },
    { key: "due_date", label: "Due", type: "date" }, { key: "findings", label: "Findings" },
  ],
};

export const regulatoryApprovals: SubPageConfig = {
  title: "Regulatory Approvals", description: "Track government and regulatory approvals",
  endpoint: "/land-approvals", idField: "approval_id", entityName: "Approval",
  breadcrumb: { module: M, page: "Regulatory Approvals" },
  columns: [
    { key: "approval_type", label: "Type", type: "badge" }, { key: "authority", label: "Authority" },
    { key: "application_date", label: "Applied", type: "date" },
    { key: "expected_date", label: "Expected", type: "date" },
    { key: "status", label: "Status", type: "status" }, { key: "reference_number", label: "Ref #" },
  ],
  formFields: [
    { name: "acquisition_id", label: "Acquisition ID", type: "number", required: true },
    { name: "approval_type", label: "Type", type: "select", options: [
      { value: "Zoning", label: "Zoning" }, { value: "Environmental", label: "Environmental" },
      { value: "Building Permit", label: "Building Permit" }, { value: "NOC", label: "NOC" },
    ]},
    { name: "authority", label: "Authority", required: true },
    { name: "application_date", label: "Application Date", type: "date" },
    { name: "expected_date", label: "Expected Date", type: "date" },
    { name: "approval_date", label: "Approval Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Submitted", label: "Submitted" }, { value: "Under Review", label: "Under Review" },
      { value: "Approved", label: "Approved" }, { value: "Rejected", label: "Rejected" },
    ]},
    { name: "reference_number", label: "Reference #" },
    { name: "conditions", label: "Conditions", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "approval_id", label: "ID" }, { key: "approval_type", label: "Type" },
    { key: "authority", label: "Authority" }, { key: "application_date", label: "Applied", type: "date" },
    { key: "expected_date", label: "Expected", type: "date" }, { key: "approval_date", label: "Approved", type: "date" },
    { key: "status", label: "Status", type: "status" }, { key: "reference_number", label: "Ref #" },
    { key: "conditions", label: "Conditions" },
  ],
};
