import type { SubPageConfig } from "@/components/ModuleSubPage";

// ============ M12: SALES MANAGEMENT ============
const S = "Sales Management";

export const salesTransactions: SubPageConfig = {
  title: "Sales Transactions", description: "Record and track property sales",
  endpoint: "/sales", idField: "sale_id", entityName: "Sale",
  breadcrumb: { module: S, page: "Sales Transactions" },
  columns: [
    { key: "sale_number", label: "Sale #" }, { key: "buyer_name", label: "Buyer" },
    { key: "sale_date", label: "Date", type: "date" }, { key: "sale_price", label: "Price", type: "currency" },
    { key: "payment_status", label: "Payment", type: "status" }, { key: "agent_name", label: "Agent" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "unit_id", label: "Unit ID", type: "number" },
    { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "sale_number", label: "Sale Number", required: true },
    { name: "buyer_name", label: "Buyer Name", required: true },
    { name: "sale_date", label: "Sale Date", type: "date", required: true },
    { name: "sale_price", label: "Sale Price (AED)", type: "currency", required: true },
    { name: "commission_pct", label: "Commission (%)", type: "number" },
    { name: "agent_name", label: "Agent Name" },
    { name: "payment_status", label: "Payment Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "Partial", label: "Partial" },
      { value: "Paid", label: "Paid" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Reserved", label: "Reserved" }, { value: "Contracted", label: "Contracted" },
      { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "sale_id", label: "ID" }, { key: "sale_number", label: "Sale #" },
    { key: "buyer_name", label: "Buyer" }, { key: "sale_date", label: "Date", type: "date" },
    { key: "sale_price", label: "Price", type: "currency" }, { key: "commission_pct", label: "Commission", type: "percent" },
    { key: "agent_name", label: "Agent" }, { key: "payment_status", label: "Payment", type: "status" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const paymentPlans: SubPageConfig = {
  title: "Payment Plans", description: "Manage installment payment plans for sales",
  endpoint: "/payment-plans", idField: "plan_id", entityName: "Payment Plan",
  breadcrumb: { module: S, page: "Payment Plans" },
  columns: [
    { key: "plan_name", label: "Plan" }, { key: "buyer_name", label: "Buyer" },
    { key: "total_amount", label: "Total", type: "currency" },
    { key: "installments", label: "Installments", type: "number" },
    { key: "paid_amount", label: "Paid", type: "currency" },
    { key: "next_due_date", label: "Next Due", type: "date" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "sale_id", label: "Sale ID", type: "number", required: true },
    { name: "plan_name", label: "Plan Name", required: true },
    { name: "total_amount", label: "Total Amount (AED)", type: "currency", required: true },
    { name: "installments", label: "Number of Installments", type: "number", required: true },
    { name: "paid_amount", label: "Paid Amount (AED)", type: "currency" },
    { name: "next_due_date", label: "Next Due Date", type: "date" },
    { name: "frequency", label: "Frequency", type: "select", options: [
      { value: "Monthly", label: "Monthly" }, { value: "Quarterly", label: "Quarterly" },
      { value: "Custom", label: "Custom" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Active", label: "Active" }, { value: "Completed", label: "Completed" },
      { value: "Defaulted", label: "Defaulted" },
    ]},
  ],
  detailFields: [
    { key: "plan_id", label: "ID" }, { key: "plan_name", label: "Plan" },
    { key: "total_amount", label: "Total", type: "currency" },
    { key: "installments", label: "Installments", type: "number" },
    { key: "paid_amount", label: "Paid", type: "currency" },
    { key: "next_due_date", label: "Next Due", type: "date" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const unitReservations: SubPageConfig = {
  title: "Unit Reservations", description: "Manage property unit reservations",
  endpoint: "/sales", idField: "sale_id", entityName: "Reservation",
  breadcrumb: { module: S, page: "Unit Reservations" },
  columns: salesTransactions.columns, formFields: salesTransactions.formFields, detailFields: salesTransactions.detailFields,
};

export const commissionTracker: SubPageConfig = {
  title: "Commission Tracker", description: "Track agent commissions on sales",
  endpoint: "/sales", idField: "sale_id", entityName: "Sale",
  breadcrumb: { module: S, page: "Commission Tracker" },
  columns: [
    { key: "sale_number", label: "Sale #" }, { key: "agent_name", label: "Agent" },
    { key: "sale_price", label: "Sale Price", type: "currency" },
    { key: "commission_pct", label: "Commission %", type: "percent" },
    { key: "buyer_name", label: "Buyer" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: salesTransactions.formFields, detailFields: salesTransactions.detailFields,
};

export const handoverManagement: SubPageConfig = {
  title: "Handover Management", description: "Manage property handover to buyers",
  endpoint: "/handovers", idField: "handover_id", entityName: "Handover",
  breadcrumb: { module: S, page: "Handover Management" },
  columns: [
    { key: "handover_date", label: "Date", type: "date" }, { key: "buyer_name", label: "Buyer" },
    { key: "unit_number", label: "Unit" }, { key: "inspection_status", label: "Inspection", type: "status" },
    { key: "keys_handed", label: "Keys", type: "status" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "sale_id", label: "Sale ID", type: "number", required: true },
    { name: "property_id", label: "Property ID", type: "number" },
    { name: "unit_id", label: "Unit ID", type: "number" },
    { name: "handover_date", label: "Handover Date", type: "date", required: true },
    { name: "buyer_name", label: "Buyer Name" },
    { name: "unit_number", label: "Unit Number" },
    { name: "inspection_status", label: "Inspection Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "Passed", label: "Passed" }, { value: "Failed", label: "Failed" },
    ]},
    { name: "keys_handed", label: "Keys Handed?", type: "select", options: [
      { value: "Yes", label: "Yes" }, { value: "No", label: "No" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Scheduled", label: "Scheduled" }, { value: "Completed", label: "Completed" },
      { value: "Delayed", label: "Delayed" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "handover_id", label: "ID" }, { key: "handover_date", label: "Date", type: "date" },
    { key: "buyer_name", label: "Buyer" }, { key: "unit_number", label: "Unit" },
    { key: "inspection_status", label: "Inspection", type: "status" },
    { key: "keys_handed", label: "Keys" }, { key: "status", label: "Status", type: "status" },
  ],
};

// ============ M13: MARKETING AUTOMATION ============
const MK = "Marketing Automation";

export const campaignManager: SubPageConfig = {
  title: "Campaign Manager", description: "Create and manage marketing campaigns",
  endpoint: "/campaigns", idField: "campaign_id", entityName: "Campaign",
  breadcrumb: { module: MK, page: "Campaign Manager" },
  columns: [
    { key: "campaign_name", label: "Campaign" }, { key: "campaign_type", label: "Type", type: "badge" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "budget", label: "Budget", type: "currency" }, { key: "leads_generated", label: "Leads", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "campaign_name", label: "Campaign Name", required: true },
    { name: "campaign_type", label: "Type", type: "select", options: [
      { value: "Digital", label: "Digital" }, { value: "Print", label: "Print" },
      { value: "Event", label: "Event" }, { value: "Social Media", label: "Social Media" }, { value: "Email", label: "Email" },
    ]},
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "start_date", label: "Start Date", type: "date" },
    { name: "end_date", label: "End Date", type: "date" },
    { name: "budget", label: "Budget (AED)", type: "currency" },
    { name: "target_audience", label: "Target Audience" },
    { name: "leads_generated", label: "Leads Generated", type: "number" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Planning", label: "Planning" }, { value: "Active", label: "Active" },
      { value: "Paused", label: "Paused" }, { value: "Completed", label: "Completed" },
    ]},
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "campaign_id", label: "ID" }, { key: "campaign_name", label: "Campaign" },
    { key: "campaign_type", label: "Type" }, { key: "start_date", label: "Start", type: "date" },
    { key: "end_date", label: "End", type: "date" }, { key: "budget", label: "Budget", type: "currency" },
    { key: "target_audience", label: "Audience" }, { key: "leads_generated", label: "Leads", type: "number" },
    { key: "status", label: "Status", type: "status" },
  ],
};

export const channelPerformance: SubPageConfig = {
  title: "Channel Performance", description: "Analyze marketing channel effectiveness",
  endpoint: "/campaigns", idField: "campaign_id", entityName: "Campaign",
  breadcrumb: { module: MK, page: "Channel Performance" },
  columns: campaignManager.columns, formFields: campaignManager.formFields, detailFields: campaignManager.detailFields,
};

export const contentLibrary: SubPageConfig = {
  title: "Content Library", description: "Manage marketing content and assets",
  endpoint: "/campaigns", idField: "campaign_id", entityName: "Campaign",
  breadcrumb: { module: MK, page: "Content Library" },
  columns: campaignManager.columns, formFields: campaignManager.formFields, detailFields: campaignManager.detailFields,
};

export const marketingAnalytics: SubPageConfig = {
  title: "Marketing Analytics", description: "Campaign performance metrics and ROI",
  endpoint: "/campaigns", idField: "campaign_id", entityName: "Campaign",
  breadcrumb: { module: MK, page: "Marketing Analytics" },
  columns: campaignManager.columns, formFields: campaignManager.formFields, detailFields: campaignManager.detailFields,
};

export const eventsOpenHouses: SubPageConfig = {
  title: "Events & Open Houses", description: "Manage property events and open house schedules",
  endpoint: "/campaigns", idField: "campaign_id", entityName: "Event",
  breadcrumb: { module: MK, page: "Events & Open Houses" },
  columns: campaignManager.columns, formFields: campaignManager.formFields, detailFields: campaignManager.detailFields,
};

// ============ M14: OPPORTUNITY MANAGEMENT ============
const O = "Opportunity Mgmt";

export const pipelineBoard: SubPageConfig = {
  title: "Pipeline Board", description: "Visual pipeline of opportunities",
  endpoint: "/opportunities", idField: "opportunity_id", entityName: "Opportunity",
  breadcrumb: { module: O, page: "Pipeline Board" },
  columns: [
    { key: "opportunity_name", label: "Opportunity" }, { key: "stage", label: "Stage", type: "status" },
    { key: "expected_value", label: "Value", type: "currency" },
    { key: "probability_pct", label: "Probability", type: "percent" },
    { key: "expected_close_date", label: "Close Date", type: "date" },
    { key: "assigned_to", label: "Assigned To" },
  ],
  formFields: [
    { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "lead_id", label: "Lead ID", type: "number" },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "opportunity_name", label: "Opportunity Name", required: true },
    { name: "stage", label: "Stage", type: "select", options: [
      { value: "Prospecting", label: "Prospecting" }, { value: "Qualification", label: "Qualification" },
      { value: "Proposal", label: "Proposal" }, { value: "Negotiation", label: "Negotiation" },
      { value: "Closed Won", label: "Closed Won" }, { value: "Closed Lost", label: "Closed Lost" },
    ]},
    { name: "expected_value", label: "Expected Value (AED)", type: "currency" },
    { name: "probability_pct", label: "Probability (%)", type: "number" },
    { name: "expected_close_date", label: "Expected Close Date", type: "date" },
    { name: "assigned_to", label: "Assigned To" },
    { name: "source", label: "Source" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "opportunity_id", label: "ID" }, { key: "opportunity_name", label: "Opportunity" },
    { key: "stage", label: "Stage", type: "status" }, { key: "expected_value", label: "Value", type: "currency" },
    { key: "probability_pct", label: "Probability", type: "percent" },
    { key: "expected_close_date", label: "Close", type: "date" }, { key: "assigned_to", label: "Assigned To" },
  ],
};

export const opportunityList: SubPageConfig = {
  ...pipelineBoard, title: "Opportunity List", description: "All opportunities in list view",
  breadcrumb: { module: O, page: "Opportunity List" },
};

export const revenueForecasting: SubPageConfig = {
  ...pipelineBoard, title: "Revenue Forecasting", description: "Forecast revenue from pipeline",
  breadcrumb: { module: O, page: "Revenue Forecasting" },
};

export const winLossAnalysis: SubPageConfig = {
  ...pipelineBoard, title: "Win/Loss Analysis", description: "Analyze won and lost opportunities",
  breadcrumb: { module: O, page: "Win/Loss Analysis" },
};
