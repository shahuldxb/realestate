import type { SubPageConfig } from "@/components/ModuleSubPage";

const M = "Project Management";

export const projectList: SubPageConfig = {
  title: "Project List", description: "All residential and commercial development projects",
  endpoint: "/projects", idField: "project_id", entityName: "Project",
  breadcrumb: { module: M, page: "Project List" },
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
      { value: "Residential", label: "Residential" }, { value: "Commercial", label: "Commercial" },
      { value: "Mixed-Use", label: "Mixed-Use" }, { value: "Industrial", label: "Industrial" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Planning", label: "Planning" }, { value: "In-Progress", label: "In-Progress" },
      { value: "Completed", label: "Completed" }, { value: "On-Hold", label: "On-Hold" },
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
    { key: "project_id", label: "ID" }, { key: "project_code", label: "Code" },
    { key: "project_name", label: "Name" }, { key: "project_type", label: "Type" },
    { key: "status", label: "Status", type: "status" },
    { key: "start_date", label: "Start", type: "date" }, { key: "end_date", label: "End", type: "date" },
    { key: "estimated_budget", label: "Budget", type: "currency" },
    { key: "location", label: "Location" }, { key: "city", label: "City" },
    { key: "project_manager", label: "PM" }, { key: "description", label: "Description" },
  ],
};

export const projectMilestones: SubPageConfig = {
  title: "Milestones & Phases", description: "Track project milestones, phases, and deliverables",
  endpoint: "/project-milestones", idField: "milestone_id", entityName: "Milestone",
  breadcrumb: { module: M, page: "Milestones & Phases" },
  columns: [
    { key: "milestone_name", label: "Milestone" },
    { key: "phase", label: "Phase", type: "badge" },
    { key: "target_date", label: "Target Date", type: "date" },
    { key: "actual_date", label: "Actual Date", type: "date" },
    { key: "status", label: "Status", type: "status" },
    { key: "deliverable", label: "Deliverable" },
    { key: "owner", label: "Owner" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "milestone_name", label: "Milestone Name", required: true },
    { name: "phase", label: "Phase", type: "select", options: [
      { value: "Initiation", label: "Initiation" }, { value: "Planning", label: "Planning" },
      { value: "Execution", label: "Execution" }, { value: "Closure", label: "Closure" },
    ]},
    { name: "target_date", label: "Target Date", type: "date" },
    { name: "actual_date", label: "Actual Date", type: "date" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Pending", label: "Pending" }, { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" }, { value: "Delayed", label: "Delayed" },
    ]},
    { name: "deliverable", label: "Deliverable" },
    { name: "owner", label: "Owner" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "milestone_id", label: "ID" }, { key: "milestone_name", label: "Milestone" },
    { key: "phase", label: "Phase" }, { key: "target_date", label: "Target", type: "date" },
    { key: "actual_date", label: "Actual", type: "date" }, { key: "status", label: "Status", type: "status" },
    { key: "deliverable", label: "Deliverable" }, { key: "owner", label: "Owner" }, { key: "notes", label: "Notes" },
  ],
};

export const projectTasks: SubPageConfig = {
  title: "Task Assignments", description: "Assign and track tasks across project teams",
  endpoint: "/project-tasks", idField: "task_id", entityName: "Task",
  breadcrumb: { module: M, page: "Task Assignments" },
  columns: [
    { key: "task_name", label: "Task" },
    { key: "assigned_to", label: "Assigned To" },
    { key: "priority", label: "Priority", type: "status" },
    { key: "status", label: "Status", type: "status" },
    { key: "due_date", label: "Due Date", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" },
    { key: "estimated_hours", label: "Est. Hours", type: "number" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "milestone_id", label: "Milestone ID", type: "number" },
    { name: "task_name", label: "Task Name", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "assigned_to", label: "Assigned To" },
    { name: "priority", label: "Priority", type: "select", options: [
      { value: "Low", label: "Low" }, { value: "Medium", label: "Medium" },
      { value: "High", label: "High" }, { value: "Critical", label: "Critical" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "To Do", label: "To Do" }, { value: "In Progress", label: "In Progress" },
      { value: "Review", label: "Review" }, { value: "Done", label: "Done" },
    ]},
    { name: "due_date", label: "Due Date", type: "date" },
    { name: "estimated_hours", label: "Estimated Hours", type: "number" },
    { name: "actual_hours", label: "Actual Hours", type: "number" },
    { name: "progress_pct", label: "Progress (%)", type: "number" },
  ],
  detailFields: [
    { key: "task_id", label: "ID" }, { key: "task_name", label: "Task" },
    { key: "assigned_to", label: "Assigned To" }, { key: "priority", label: "Priority" },
    { key: "status", label: "Status", type: "status" }, { key: "due_date", label: "Due", type: "date" },
    { key: "progress_pct", label: "Progress", type: "percent" },
    { key: "estimated_hours", label: "Est. Hours", type: "number" },
    { key: "actual_hours", label: "Actual Hours", type: "number" },
    { key: "description", label: "Description" },
  ],
};

export const projectGantt: SubPageConfig = {
  title: "Gantt / Timeline", description: "Project timeline and scheduling overview",
  endpoint: "/project-tasks", idField: "task_id", entityName: "Task",
  breadcrumb: { module: M, page: "Gantt / Timeline" },
  columns: [
    { key: "task_name", label: "Task" },
    { key: "assigned_to", label: "Assigned To" },
    { key: "start_date", label: "Start", type: "date" },
    { key: "due_date", label: "End", type: "date" },
    { key: "status", label: "Status", type: "status" },
    { key: "progress_pct", label: "Progress", type: "percent" },
    { key: "priority", label: "Priority", type: "status" },
  ],
  formFields: projectTasks.formFields,
  detailFields: projectTasks.detailFields,
};

export const projectBudgetTracking: SubPageConfig = {
  title: "Budget vs Actual", description: "Compare planned budgets against actual expenditure",
  endpoint: "/financial/budgets", idField: "budget_id", entityName: "Budget",
  breadcrumb: { module: M, page: "Budget vs Actual" },
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
    { key: "budget_id", label: "ID" }, { key: "budget_name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "planned_amount", label: "Planned", type: "currency" },
    { key: "actual_amount", label: "Actual", type: "currency" },
    { key: "fiscal_year", label: "Year" }, { key: "period", label: "Period" },
  ],
};
