import type { SubPageConfig } from "@/components/ModuleSubPage";
const M = "Financial Management";

export const chartOfAccounts: SubPageConfig = {
  title: "Chart of Accounts", description: "Manage financial accounts, categories, and balances",
  endpoint: "/financial/accounts", idField: "account_id", entityName: "Account",
  breadcrumb: { module: M, page: "Chart of Accounts" },
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
      { value: "Asset", label: "Asset" }, { value: "Liability", label: "Liability" },
      { value: "Revenue", label: "Revenue" }, { value: "Expense", label: "Expense" }, { value: "Equity", label: "Equity" },
    ]},
    { name: "parent_account_id", label: "Parent Account ID", type: "number" },
    { name: "balance", label: "Balance (AED)", type: "currency" },
    { name: "currency", label: "Currency", defaultValue: "AED" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "account_id", label: "ID" }, { key: "account_code", label: "Code" },
    { key: "account_name", label: "Name" }, { key: "account_type", label: "Type" },
    { key: "balance", label: "Balance", type: "currency" }, { key: "currency", label: "Currency" },
  ],
};

export const journalEntries: SubPageConfig = {
  title: "Journal Entries", description: "Record and manage financial journal entries and transactions",
  endpoint: "/financial/transactions", idField: "transaction_id", entityName: "Transaction",
  breadcrumb: { module: M, page: "Journal Entries" },
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
      { value: "Debit", label: "Debit" }, { value: "Credit", label: "Credit" },
    ]},
    { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "reference_no", label: "Reference No" },
    { name: "category", label: "Category" },
    { name: "created_by", label: "Created By", defaultValue: "admin" },
  ],
  detailFields: [
    { key: "transaction_id", label: "ID" }, { key: "transaction_date", label: "Date", type: "date" },
    { key: "transaction_type", label: "Type" }, { key: "amount", label: "Amount", type: "currency" },
    { key: "category", label: "Category" }, { key: "description", label: "Description" },
    { key: "reference_no", label: "Reference" }, { key: "created_by", label: "Created By" },
  ],
};

export const invoices: SubPageConfig = {
  title: "Invoices (AP/AR)", description: "Accounts payable and receivable invoice management",
  endpoint: "/financial/invoices", idField: "invoice_id", entityName: "Invoice",
  breadcrumb: { module: M, page: "Invoices (AP/AR)" },
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
      { value: "Payable", label: "Payable" }, { value: "Receivable", label: "Receivable" },
    ]},
    { name: "invoice_date", label: "Invoice Date", type: "date", required: true },
    { name: "due_date", label: "Due Date", type: "date", required: true },
    { name: "total_amount", label: "Total Amount (AED)", type: "currency", required: true },
    { name: "tax_amount", label: "Tax Amount (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Sent", label: "Sent" },
      { value: "Paid", label: "Paid" }, { value: "Overdue", label: "Overdue" },
    ]},
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "invoice_id", label: "ID" }, { key: "invoice_number", label: "Invoice #" },
    { key: "invoice_type", label: "Type" }, { key: "invoice_date", label: "Date", type: "date" },
    { key: "due_date", label: "Due", type: "date" }, { key: "total_amount", label: "Total", type: "currency" },
    { key: "tax_amount", label: "Tax", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
};

export const budgetPlanning: SubPageConfig = {
  title: "Budget Planning", description: "Plan and allocate project budgets by category",
  endpoint: "/financial/budgets", idField: "budget_id", entityName: "Budget",
  breadcrumb: { module: M, page: "Budget Planning" },
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
    { key: "category", label: "Category" }, { key: "planned_amount", label: "Planned", type: "currency" },
    { key: "actual_amount", label: "Actual", type: "currency" },
    { key: "fiscal_year", label: "Year" }, { key: "period", label: "Period" },
  ],
};

export const paymentVouchers: SubPageConfig = {
  title: "Payment Vouchers", description: "Process and track payment vouchers and disbursements",
  endpoint: "/financial/payments", idField: "payment_id", entityName: "Payment Voucher",
  breadcrumb: { module: M, page: "Payment Vouchers" },
  columns: [
    { key: "voucher_number", label: "Voucher #" },
    { key: "payment_date", label: "Date", type: "date" },
    { key: "payee_name", label: "Payee" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "payment_method", label: "Method", type: "badge" },
    { key: "status", label: "Status", type: "status" },
    { key: "approved_by", label: "Approved By" },
  ],
  formFields: [
    { name: "voucher_number", label: "Voucher Number", required: true },
    { name: "project_id", label: "Project ID", type: "number" },
    { name: "account_id", label: "Account ID", type: "number" },
    { name: "payment_date", label: "Payment Date", type: "date", required: true },
    { name: "payee_name", label: "Payee Name", required: true },
    { name: "amount", label: "Amount (AED)", type: "currency", required: true },
    { name: "payment_method", label: "Method", type: "select", options: [
      { value: "Bank Transfer", label: "Bank Transfer" }, { value: "Cheque", label: "Cheque" },
      { value: "Cash", label: "Cash" }, { value: "Wire", label: "Wire" },
    ]},
    { name: "reference_number", label: "Reference #" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Draft", label: "Draft" }, { value: "Approved", label: "Approved" },
      { value: "Paid", label: "Paid" }, { value: "Cancelled", label: "Cancelled" },
    ]},
    { name: "approved_by", label: "Approved By" },
    { name: "notes", label: "Notes", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "payment_id", label: "ID" }, { key: "voucher_number", label: "Voucher #" },
    { key: "payment_date", label: "Date", type: "date" }, { key: "payee_name", label: "Payee" },
    { key: "amount", label: "Amount", type: "currency" }, { key: "payment_method", label: "Method" },
    { key: "status", label: "Status", type: "status" }, { key: "approved_by", label: "Approved By" },
  ],
};

export const financialReports: SubPageConfig = {
  title: "Financial Reports", description: "Generate and view financial summary reports",
  endpoint: "/financial/transactions", idField: "transaction_id", entityName: "Transaction",
  breadcrumb: { module: M, page: "Financial Reports" },
  columns: [
    { key: "transaction_date", label: "Date", type: "date" },
    { key: "transaction_type", label: "Type", type: "badge" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "reference_no", label: "Reference" },
  ],
  formFields: journalEntries.formFields,
  detailFields: journalEntries.detailFields,
};
