import type { SubPageConfig } from "@/components/ModuleSubPage";
const M = "CRM";

export const customerMaster: SubPageConfig = {
  title: "Customer Master", description: "Manage customer profiles and contact information",
  endpoint: "/customers", idField: "customer_id", entityName: "Customer",
  breadcrumb: { module: M, page: "Customer Master" },
  columns: [
    { key: "customer_name", label: "Name" }, { key: "customer_type", label: "Type", type: "badge" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "city", label: "City" }, { key: "source", label: "Source", type: "badge" },
  ],
  formFields: [
    { name: "customer_name", label: "Customer Name", required: true },
    { name: "customer_type", label: "Type", type: "select", options: [
      { value: "Individual", label: "Individual" }, { value: "Corporate", label: "Corporate" },
    ]},
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "textarea", width: "full" },
    { name: "city", label: "City" }, { name: "state", label: "State" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "source", label: "Source", type: "select", options: [
      { value: "Website", label: "Website" }, { value: "Referral", label: "Referral" },
      { value: "Walk-in", label: "Walk-in" }, { value: "Portal", label: "Portal" }, { value: "Social Media", label: "Social Media" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "customer_id", label: "ID" }, { key: "customer_name", label: "Name" },
    { key: "customer_type", label: "Type" }, { key: "email", label: "Email" },
    { key: "phone", label: "Phone" }, { key: "city", label: "City" },
    { key: "country", label: "Country" }, { key: "source", label: "Source" },
    { key: "created_at", label: "Created", type: "date" },
  ],
};

export const leadManagement: SubPageConfig = {
  title: "Lead Management", description: "Track, qualify, and convert leads",
  endpoint: "/leads", idField: "lead_id", entityName: "Lead",
  breadcrumb: { module: M, page: "Lead Management" },
  columns: [
    { key: "lead_name", label: "Name" }, { key: "email", label: "Email" },
    { key: "phone", label: "Phone" }, { key: "source", label: "Source", type: "badge" },
    { key: "status", label: "Status", type: "status" }, { key: "interest_type", label: "Interest", type: "badge" },
    { key: "budget_range", label: "Budget" }, { key: "assigned_agent", label: "Agent" },
  ],
  formFields: [
    { name: "lead_name", label: "Lead Name", required: true },
    { name: "email", label: "Email", type: "email" }, { name: "phone", label: "Phone", type: "tel" },
    { name: "source", label: "Source", type: "select", options: [
      { value: "Website", label: "Website" }, { value: "Social Media", label: "Social Media" },
      { value: "Referral", label: "Referral" }, { value: "Portal", label: "Portal" }, { value: "Walk-in", label: "Walk-in" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "New", label: "New" }, { value: "Contacted", label: "Contacted" },
      { value: "Qualified", label: "Qualified" }, { value: "Converted", label: "Converted" }, { value: "Lost", label: "Lost" },
    ]},
    { name: "interest_type", label: "Interest", type: "select", options: [
      { value: "Buy", label: "Buy" }, { value: "Rent", label: "Rent" }, { value: "Invest", label: "Invest" },
    ]},
    { name: "budget_range", label: "Budget Range" },
    { name: "preferred_location", label: "Preferred Location" },
    { name: "assigned_agent", label: "Assigned Agent" },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "lead_id", label: "ID" }, { key: "lead_name", label: "Name" },
    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
    { key: "source", label: "Source" }, { key: "status", label: "Status", type: "status" },
    { key: "interest_type", label: "Interest" }, { key: "budget_range", label: "Budget" },
    { key: "preferred_location", label: "Location" }, { key: "assigned_agent", label: "Agent" },
  ],
};

export const interactionLog: SubPageConfig = {
  title: "Interaction Log", description: "Log all customer and lead interactions",
  endpoint: "/interactions", idField: "interaction_id", entityName: "Interaction",
  breadcrumb: { module: M, page: "Interaction Log" },
  columns: [
    { key: "interaction_type", label: "Type", type: "badge" },
    { key: "interaction_date", label: "Date", type: "date" },
    { key: "summary", label: "Summary" },
    { key: "outcome", label: "Outcome" },
    { key: "agent_name", label: "Agent" },
    { key: "next_action", label: "Next Action" },
  ],
  formFields: [
    { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "lead_id", label: "Lead ID", type: "number" },
    { name: "interaction_type", label: "Type", type: "select", options: [
      { value: "Call", label: "Call" }, { value: "Email", label: "Email" },
      { value: "Meeting", label: "Meeting" }, { value: "Site Visit", label: "Site Visit" }, { value: "WhatsApp", label: "WhatsApp" },
    ]},
    { name: "interaction_date", label: "Date", type: "date", required: true },
    { name: "summary", label: "Summary", type: "textarea", width: "full" },
    { name: "outcome", label: "Outcome", type: "textarea", width: "full" },
    { name: "next_action", label: "Next Action" },
    { name: "next_action_date", label: "Next Action Date", type: "date" },
    { name: "agent_name", label: "Agent Name" },
  ],
  detailFields: [
    { key: "interaction_id", label: "ID" }, { key: "interaction_type", label: "Type" },
    { key: "interaction_date", label: "Date", type: "date" }, { key: "summary", label: "Summary" },
    { key: "outcome", label: "Outcome" }, { key: "next_action", label: "Next Action" },
    { key: "agent_name", label: "Agent" },
  ],
};

export const followUpScheduler: SubPageConfig = {
  title: "Follow-Up Scheduler", description: "Schedule and track follow-up activities",
  endpoint: "/follow-ups", idField: "followup_id", entityName: "Follow-Up",
  breadcrumb: { module: M, page: "Follow-Up Scheduler" },
  columns: [
    { key: "followup_type", label: "Type", type: "badge" },
    { key: "scheduled_date", label: "Scheduled", type: "date" },
    { key: "subject", label: "Subject" },
    { key: "assigned_to", label: "Assigned To" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "status" },
  ],
  formFields: [
    { name: "lead_id", label: "Lead ID", type: "number" },
    { name: "customer_id", label: "Customer ID", type: "number" },
    { name: "followup_type", label: "Type", type: "select", options: [
      { value: "Call", label: "Call" }, { value: "Email", label: "Email" },
      { value: "Meeting", label: "Meeting" }, { value: "Site Visit", label: "Site Visit" },
    ]},
    { name: "scheduled_date", label: "Scheduled Date", type: "date", required: true },
    { name: "subject", label: "Subject", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "assigned_to", label: "Assigned To" },
    { name: "priority", label: "Priority", type: "select", options: [
      { value: "Low", label: "Low" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Scheduled", label: "Scheduled" }, { value: "Completed", label: "Completed" },
      { value: "Cancelled", label: "Cancelled" }, { value: "Overdue", label: "Overdue" },
    ]},
  ],
  detailFields: [
    { key: "followup_id", label: "ID" }, { key: "followup_type", label: "Type" },
    { key: "scheduled_date", label: "Scheduled", type: "date" }, { key: "subject", label: "Subject" },
    { key: "assigned_to", label: "Assigned To" }, { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority" },
  ],
};

export const salesPipeline: SubPageConfig = {
  title: "Sales Pipeline", description: "Visual pipeline of lead-to-customer conversion",
  endpoint: "/leads", idField: "lead_id", entityName: "Lead",
  breadcrumb: { module: M, page: "Sales Pipeline" },
  columns: [
    { key: "lead_name", label: "Name" }, { key: "status", label: "Stage", type: "status" },
    { key: "interest_type", label: "Interest", type: "badge" },
    { key: "budget_range", label: "Budget" }, { key: "assigned_agent", label: "Agent" },
    { key: "source", label: "Source", type: "badge" },
  ],
  formFields: leadManagement.formFields,
  detailFields: leadManagement.detailFields,
};
