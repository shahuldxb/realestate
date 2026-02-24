-- ============================================================================
-- Real Estate & Construction ERP - DDL Script
-- Database: BMS (Building Management System)
-- No constraints or indexes (prototyping phase)
-- ============================================================================

USE BMS;
GO

-- ============================================================================
-- MODULE 1: Project Management
-- ============================================================================
CREATE TABLE RE_Projects (
    project_id INT IDENTITY(1,1),
    project_name NVARCHAR(500),
    project_code NVARCHAR(100),
    project_type NVARCHAR(100),        -- Residential, Commercial, Mixed-Use
    status NVARCHAR(50),               -- Planning, In-Progress, Completed, On-Hold
    start_date DATE,
    end_date DATE,
    estimated_budget DECIMAL(18,2),
    actual_cost DECIMAL(18,2),
    location NVARCHAR(500),
    city NVARCHAR(200),
    state NVARCHAR(200),
    country NVARCHAR(200),
    description NVARCHAR(MAX),
    project_manager NVARCHAR(300),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    created_by NVARCHAR(200),
    is_active BIT DEFAULT 1
);
GO

CREATE TABLE RE_Project_Tasks (
    task_id INT IDENTITY(1,1),
    project_id INT,
    task_name NVARCHAR(500),
    description NVARCHAR(MAX),
    assigned_to NVARCHAR(300),
    status NVARCHAR(50),               -- Not Started, In Progress, Completed, Blocked
    priority NVARCHAR(50),             -- Low, Medium, High, Critical
    start_date DATE,
    due_date DATE,
    completion_date DATE,
    progress_pct DECIMAL(5,2),
    parent_task_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Project_Milestones (
    milestone_id INT IDENTITY(1,1),
    project_id INT,
    milestone_name NVARCHAR(500),
    description NVARCHAR(MAX),
    target_date DATE,
    actual_date DATE,
    status NVARCHAR(50),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 2: Financial Management
-- ============================================================================
CREATE TABLE RE_Financial_Accounts (
    account_id INT IDENTITY(1,1),
    account_code NVARCHAR(50),
    account_name NVARCHAR(300),
    account_type NVARCHAR(100),        -- Asset, Liability, Revenue, Expense, Equity
    parent_account_id INT,
    balance DECIMAL(18,2) DEFAULT 0,
    currency NVARCHAR(10) DEFAULT 'USD',
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Financial_Transactions (
    transaction_id INT IDENTITY(1,1),
    transaction_date DATE,
    account_id INT,
    project_id INT,
    transaction_type NVARCHAR(50),     -- Debit, Credit
    amount DECIMAL(18,2),
    description NVARCHAR(MAX),
    reference_no NVARCHAR(200),
    category NVARCHAR(200),
    created_by NVARCHAR(200),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Invoices (
    invoice_id INT IDENTITY(1,1),
    invoice_number NVARCHAR(100),
    project_id INT,
    customer_id INT,
    vendor_id INT,
    invoice_type NVARCHAR(50),         -- Receivable, Payable
    invoice_date DATE,
    due_date DATE,
    total_amount DECIMAL(18,2),
    tax_amount DECIMAL(18,2),
    paid_amount DECIMAL(18,2) DEFAULT 0,
    status NVARCHAR(50),               -- Draft, Sent, Paid, Overdue, Cancelled
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Budgets (
    budget_id INT IDENTITY(1,1),
    project_id INT,
    budget_name NVARCHAR(300),
    category NVARCHAR(200),
    planned_amount DECIMAL(18,2),
    actual_amount DECIMAL(18,2) DEFAULT 0,
    variance DECIMAL(18,2),
    fiscal_year INT,
    period NVARCHAR(50),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 3: Customer Relationship Management (CRM)
-- ============================================================================
CREATE TABLE RE_Customers (
    customer_id INT IDENTITY(1,1),
    customer_name NVARCHAR(500),
    customer_type NVARCHAR(100),       -- Individual, Corporate, Government
    email NVARCHAR(300),
    phone NVARCHAR(50),
    address NVARCHAR(MAX),
    city NVARCHAR(200),
    state NVARCHAR(200),
    country NVARCHAR(200),
    company_name NVARCHAR(500),
    notes NVARCHAR(MAX),
    source NVARCHAR(200),              -- Website, Referral, Walk-in, Portal
    created_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);
GO

CREATE TABLE RE_Leads (
    lead_id INT IDENTITY(1,1),
    lead_name NVARCHAR(500),
    email NVARCHAR(300),
    phone NVARCHAR(50),
    source NVARCHAR(200),
    status NVARCHAR(50),               -- New, Qualified, Contacted, Converted, Lost
    interest_type NVARCHAR(100),       -- Buy, Rent, Invest
    budget_range NVARCHAR(200),
    preferred_location NVARCHAR(500),
    assigned_agent NVARCHAR(300),
    project_id INT,
    notes NVARCHAR(MAX),
    follow_up_date DATE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Interactions (
    interaction_id INT IDENTITY(1,1),
    customer_id INT,
    lead_id INT,
    interaction_type NVARCHAR(100),    -- Call, Email, Meeting, Site Visit
    interaction_date DATETIME,
    summary NVARCHAR(MAX),
    outcome NVARCHAR(500),
    next_action NVARCHAR(500),
    agent_name NVARCHAR(300),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 4: Property Management
-- ============================================================================
CREATE TABLE RE_Properties (
    property_id INT IDENTITY(1,1),
    property_name NVARCHAR(500),
    property_code NVARCHAR(100),
    property_type NVARCHAR(100),       -- Apartment, Villa, Office, Retail, Warehouse
    project_id INT,
    address NVARCHAR(MAX),
    city NVARCHAR(200),
    state NVARCHAR(200),
    country NVARCHAR(200),
    area_sqft DECIMAL(12,2),
    bedrooms INT,
    bathrooms INT,
    floor_number INT,
    unit_number NVARCHAR(50),
    status NVARCHAR(50),               -- Available, Sold, Leased, Under Maintenance
    market_value DECIMAL(18,2),
    listing_price DECIMAL(18,2),
    owner_id INT,
    description NVARCHAR(MAX),
    amenities NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);
GO

-- ============================================================================
-- MODULE 5: Land Acquisition & Development
-- ============================================================================
CREATE TABLE RE_Land_Acquisitions (
    acquisition_id INT IDENTITY(1,1),
    land_name NVARCHAR(500),
    location NVARCHAR(MAX),
    area_acres DECIMAL(12,4),
    land_type NVARCHAR(100),           -- Agricultural, Commercial, Residential, Industrial
    status NVARCHAR(50),               -- Identified, Under Negotiation, Acquired, Rejected
    owner_name NVARCHAR(500),
    asking_price DECIMAL(18,2),
    negotiated_price DECIMAL(18,2),
    acquisition_date DATE,
    legal_status NVARCHAR(200),
    survey_number NVARCHAR(200),
    zoning_info NVARCHAR(500),
    feasibility_notes NVARCHAR(MAX),
    documents NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    created_by NVARCHAR(200)
);
GO

-- ============================================================================
-- MODULE 6: Bidding & Procurement
-- ============================================================================
CREATE TABLE RE_Vendors (
    vendor_id INT IDENTITY(1,1),
    vendor_name NVARCHAR(500),
    vendor_type NVARCHAR(100),         -- Supplier, Contractor, Subcontractor, Consultant
    contact_person NVARCHAR(300),
    email NVARCHAR(300),
    phone NVARCHAR(50),
    address NVARCHAR(MAX),
    city NVARCHAR(200),
    country NVARCHAR(200),
    rating DECIMAL(3,1),
    specialization NVARCHAR(500),
    license_number NVARCHAR(200),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Bids (
    bid_id INT IDENTITY(1,1),
    project_id INT,
    bid_title NVARCHAR(500),
    description NVARCHAR(MAX),
    bid_type NVARCHAR(100),            -- Open, Invited, Negotiated
    status NVARCHAR(50),               -- Open, Closed, Awarded, Cancelled
    submission_deadline DATE,
    estimated_value DECIMAL(18,2),
    awarded_vendor_id INT,
    awarded_amount DECIMAL(18,2),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Purchase_Orders (
    po_id INT IDENTITY(1,1),
    po_number NVARCHAR(100),
    vendor_id INT,
    project_id INT,
    order_date DATE,
    delivery_date DATE,
    total_amount DECIMAL(18,2),
    status NVARCHAR(50),               -- Draft, Approved, Ordered, Received, Cancelled
    items NVARCHAR(MAX),
    notes NVARCHAR(MAX),
    approved_by NVARCHAR(300),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 7: Construction Management
-- ============================================================================
CREATE TABLE RE_Construction_Activities (
    activity_id INT IDENTITY(1,1),
    project_id INT,
    activity_name NVARCHAR(500),
    phase NVARCHAR(200),               -- Foundation, Structure, MEP, Finishing
    description NVARCHAR(MAX),
    start_date DATE,
    end_date DATE,
    progress_pct DECIMAL(5,2),
    status NVARCHAR(50),
    contractor_id INT,
    estimated_cost DECIMAL(18,2),
    actual_cost DECIMAL(18,2),
    quality_score DECIMAL(5,2),
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Daily_Logs (
    log_id INT IDENTITY(1,1),
    project_id INT,
    log_date DATE,
    weather NVARCHAR(100),
    workforce_count INT,
    activities_performed NVARCHAR(MAX),
    materials_used NVARCHAR(MAX),
    issues_reported NVARCHAR(MAX),
    safety_incidents NVARCHAR(MAX),
    logged_by NVARCHAR(300),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 8: Project Controls
-- ============================================================================
CREATE TABLE RE_Project_Controls (
    control_id INT IDENTITY(1,1),
    project_id INT,
    control_date DATE,
    cost_variance DECIMAL(18,2),
    schedule_variance INT,             -- days ahead/behind
    earned_value DECIMAL(18,2),
    planned_value DECIMAL(18,2),
    actual_cost DECIMAL(18,2),
    cpi DECIMAL(6,3),                  -- Cost Performance Index
    spi DECIMAL(6,3),                  -- Schedule Performance Index
    risk_level NVARCHAR(50),
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Risk_Register (
    risk_id INT IDENTITY(1,1),
    project_id INT,
    risk_description NVARCHAR(MAX),
    risk_category NVARCHAR(200),
    probability NVARCHAR(50),          -- Low, Medium, High
    impact NVARCHAR(50),               -- Low, Medium, High, Critical
    mitigation_plan NVARCHAR(MAX),
    owner NVARCHAR(300),
    status NVARCHAR(50),               -- Open, Mitigated, Closed
    identified_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 9: Asset Management
-- ============================================================================
CREATE TABLE RE_Assets (
    asset_id INT IDENTITY(1,1),
    asset_name NVARCHAR(500),
    asset_code NVARCHAR(100),
    asset_type NVARCHAR(100),          -- Property, Equipment, Vehicle, Machinery
    property_id INT,
    project_id INT,
    purchase_date DATE,
    purchase_cost DECIMAL(18,2),
    current_value DECIMAL(18,2),
    depreciation_rate DECIMAL(5,2),
    location NVARCHAR(500),
    condition_status NVARCHAR(50),     -- New, Good, Fair, Poor
    warranty_expiry DATE,
    assigned_to NVARCHAR(300),
    notes NVARCHAR(MAX),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 10: Property Valuation & Appraisal
-- ============================================================================
CREATE TABLE RE_Valuations (
    valuation_id INT IDENTITY(1,1),
    property_id INT,
    valuation_date DATE,
    valuation_method NVARCHAR(100),    -- CMA, Income Capitalization, Cost Approach
    market_value DECIMAL(18,2),
    assessed_value DECIMAL(18,2),
    appraiser_name NVARCHAR(300),
    comparable_properties NVARCHAR(MAX),
    rental_income DECIMAL(18,2),
    cap_rate DECIMAL(6,3),
    noi DECIMAL(18,2),                 -- Net Operating Income
    notes NVARCHAR(MAX),
    report_url NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 11: Lease & Rental Management
-- ============================================================================
CREATE TABLE RE_Leases (
    lease_id INT IDENTITY(1,1),
    property_id INT,
    tenant_id INT,
    lease_type NVARCHAR(100),          -- Residential, Commercial, Gross, Net
    start_date DATE,
    end_date DATE,
    monthly_rent DECIMAL(18,2),
    security_deposit DECIMAL(18,2),
    payment_frequency NVARCHAR(50),    -- Monthly, Quarterly, Annually
    escalation_rate DECIMAL(5,2),
    status NVARCHAR(50),               -- Active, Expired, Terminated, Pending Renewal
    terms NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Rent_Payments (
    payment_id INT IDENTITY(1,1),
    lease_id INT,
    tenant_id INT,
    payment_date DATE,
    amount DECIMAL(18,2),
    payment_method NVARCHAR(100),
    reference_number NVARCHAR(200),
    period_from DATE,
    period_to DATE,
    status NVARCHAR(50),               -- Paid, Pending, Overdue, Partial
    late_fee DECIMAL(18,2) DEFAULT 0,
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 12: Sales Management
-- ============================================================================
CREATE TABLE RE_Sales (
    sale_id INT IDENTITY(1,1),
    property_id INT,
    customer_id INT,
    agent_id INT,
    sale_date DATE,
    sale_price DECIMAL(18,2),
    commission_amount DECIMAL(18,2),
    commission_pct DECIMAL(5,2),
    payment_plan NVARCHAR(MAX),
    status NVARCHAR(50),               -- Negotiation, Under Contract, Closed, Cancelled
    contract_number NVARCHAR(200),
    closing_date DATE,
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Payment_Plans (
    plan_id INT IDENTITY(1,1),
    sale_id INT,
    installment_number INT,
    due_date DATE,
    amount DECIMAL(18,2),
    paid_amount DECIMAL(18,2) DEFAULT 0,
    status NVARCHAR(50),               -- Pending, Paid, Overdue
    payment_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 13: Marketing Automation
-- ============================================================================
CREATE TABLE RE_Marketing_Campaigns (
    campaign_id INT IDENTITY(1,1),
    campaign_name NVARCHAR(500),
    campaign_type NVARCHAR(100),       -- Email, Social Media, Print, Digital, Event
    project_id INT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(18,2),
    actual_spend DECIMAL(18,2),
    target_audience NVARCHAR(MAX),
    status NVARCHAR(50),               -- Draft, Active, Paused, Completed
    leads_generated INT DEFAULT 0,
    conversions INT DEFAULT 0,
    roi DECIMAL(8,2),
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 14: Opportunity Management
-- ============================================================================
CREATE TABLE RE_Opportunities (
    opportunity_id INT IDENTITY(1,1),
    opportunity_name NVARCHAR(500),
    customer_id INT,
    project_id INT,
    property_id INT,
    stage NVARCHAR(100),               -- Prospecting, Qualification, Proposal, Negotiation, Closed Won, Closed Lost
    estimated_value DECIMAL(18,2),
    probability_pct DECIMAL(5,2),
    expected_close_date DATE,
    assigned_agent NVARCHAR(300),
    source NVARCHAR(200),
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 15: Human Capital Management (HCM) & Payroll
-- ============================================================================
CREATE TABLE RE_Employees (
    employee_id INT IDENTITY(1,1),
    employee_code NVARCHAR(50),
    first_name NVARCHAR(200),
    last_name NVARCHAR(200),
    email NVARCHAR(300),
    phone NVARCHAR(50),
    department NVARCHAR(200),
    designation NVARCHAR(200),
    hire_date DATE,
    salary DECIMAL(18,2),
    employment_type NVARCHAR(50),      -- Full-time, Part-time, Contract
    manager_id INT,
    skills NVARCHAR(MAX),
    certifications NVARCHAR(MAX),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Payroll (
    payroll_id INT IDENTITY(1,1),
    employee_id INT,
    pay_period_start DATE,
    pay_period_end DATE,
    basic_salary DECIMAL(18,2),
    allowances DECIMAL(18,2),
    deductions DECIMAL(18,2),
    overtime_hours DECIMAL(8,2),
    overtime_amount DECIMAL(18,2),
    net_pay DECIMAL(18,2),
    payment_date DATE,
    status NVARCHAR(50),               -- Pending, Processed, Paid
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Attendance (
    attendance_id INT IDENTITY(1,1),
    employee_id INT,
    attendance_date DATE,
    check_in DATETIME,
    check_out DATETIME,
    hours_worked DECIMAL(5,2),
    status NVARCHAR(50),               -- Present, Absent, Leave, Half-day
    project_id INT,
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 16: Legal & Compliance
-- ============================================================================
CREATE TABLE RE_Contracts (
    contract_id INT IDENTITY(1,1),
    contract_number NVARCHAR(200),
    contract_type NVARCHAR(100),       -- Sale, Lease, Service, Construction, Vendor
    project_id INT,
    party_name NVARCHAR(500),
    party_type NVARCHAR(100),          -- Customer, Vendor, Contractor
    start_date DATE,
    end_date DATE,
    value DECIMAL(18,2),
    status NVARCHAR(50),               -- Draft, Active, Expired, Terminated
    terms NVARCHAR(MAX),
    document_url NVARCHAR(MAX),
    signed_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Compliance_Records (
    compliance_id INT IDENTITY(1,1),
    project_id INT,
    property_id INT,
    compliance_type NVARCHAR(200),     -- Building Permit, Environmental, Safety, RERA
    description NVARCHAR(MAX),
    authority NVARCHAR(300),
    submission_date DATE,
    approval_date DATE,
    expiry_date DATE,
    status NVARCHAR(50),               -- Pending, Approved, Rejected, Expired
    reference_number NVARCHAR(200),
    document_url NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 17: Document Management
-- ============================================================================
CREATE TABLE RE_Documents (
    document_id INT IDENTITY(1,1),
    document_name NVARCHAR(500),
    document_type NVARCHAR(100),       -- Blueprint, Contract, Permit, Report, Invoice
    category NVARCHAR(200),
    project_id INT,
    property_id INT,
    file_url NVARCHAR(MAX),
    file_size BIGINT,
    version NVARCHAR(50),
    uploaded_by NVARCHAR(300),
    description NVARCHAR(MAX),
    tags NVARCHAR(MAX),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 18: Inventory Management
-- ============================================================================
CREATE TABLE RE_Inventory (
    inventory_id INT IDENTITY(1,1),
    item_name NVARCHAR(500),
    item_code NVARCHAR(100),
    category NVARCHAR(200),            -- Cement, Steel, Wood, Electrical, Plumbing
    unit NVARCHAR(50),                 -- Kg, Ton, Piece, Meter, Bag
    quantity_on_hand DECIMAL(12,2),
    reorder_level DECIMAL(12,2),
    unit_cost DECIMAL(18,2),
    warehouse_location NVARCHAR(300),
    project_id INT,
    supplier_id INT,
    last_restocked DATE,
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Inventory_Transactions (
    inv_txn_id INT IDENTITY(1,1),
    inventory_id INT,
    transaction_type NVARCHAR(50),     -- Inward, Outward, Transfer, Adjustment
    quantity DECIMAL(12,2),
    project_id INT,
    reference_number NVARCHAR(200),
    transaction_date DATE,
    performed_by NVARCHAR(300),
    notes NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 19: Helpdesk / Facility Management
-- ============================================================================
CREATE TABLE RE_Helpdesk_Tickets (
    ticket_id INT IDENTITY(1,1),
    ticket_number NVARCHAR(100),
    property_id INT,
    tenant_id INT,
    category NVARCHAR(200),            -- Plumbing, Electrical, HVAC, Cleaning, Security
    priority NVARCHAR(50),             -- Low, Medium, High, Emergency
    subject NVARCHAR(500),
    description NVARCHAR(MAX),
    status NVARCHAR(50),               -- Open, In Progress, Resolved, Closed
    assigned_to NVARCHAR(300),
    resolution NVARCHAR(MAX),
    reported_date DATETIME,
    resolved_date DATETIME,
    sla_hours INT,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Maintenance_Schedule (
    schedule_id INT IDENTITY(1,1),
    property_id INT,
    asset_id INT,
    maintenance_type NVARCHAR(100),    -- Preventive, Corrective, Emergency
    description NVARCHAR(MAX),
    frequency NVARCHAR(50),            -- Daily, Weekly, Monthly, Quarterly, Annually
    next_due_date DATE,
    last_completed DATE,
    assigned_vendor_id INT,
    estimated_cost DECIMAL(18,2),
    status NVARCHAR(50),               -- Scheduled, Overdue, Completed
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- MODULE 20: Tenant / User Portal
-- ============================================================================
CREATE TABLE RE_Tenants (
    tenant_id INT IDENTITY(1,1),
    tenant_name NVARCHAR(500),
    tenant_type NVARCHAR(100),         -- Individual, Corporate
    email NVARCHAR(300),
    phone NVARCHAR(50),
    id_number NVARCHAR(200),
    address NVARCHAR(MAX),
    emergency_contact NVARCHAR(300),
    emergency_phone NVARCHAR(50),
    property_id INT,
    lease_id INT,
    portal_username NVARCHAR(200),
    portal_password_hash NVARCHAR(500),
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE RE_Portal_Notifications (
    notification_id INT IDENTITY(1,1),
    tenant_id INT,
    customer_id INT,
    title NVARCHAR(500),
    message NVARCHAR(MAX),
    notification_type NVARCHAR(100),   -- Payment Reminder, Maintenance Update, Announcement
    is_read BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- ============================================================================
-- SYSTEM TABLES: Audit Log & AI Chat History
-- ============================================================================
CREATE TABLE RE_Audit_Log (
    log_id INT IDENTITY(1,1),
    table_name NVARCHAR(200),
    record_id INT,
    action NVARCHAR(50),               -- INSERT, UPDATE, DELETE
    old_values NVARCHAR(MAX),
    new_values NVARCHAR(MAX),
    performed_by NVARCHAR(200),
    performed_at DATETIME DEFAULT GETDATE(),
    ip_address NVARCHAR(50)
);
GO

CREATE TABLE RE_AI_Chat_History (
    chat_id INT IDENTITY(1,1),
    session_id NVARCHAR(200),
    user_query NVARCHAR(MAX),
    ai_response NVARCHAR(MAX),
    module_context NVARCHAR(200),
    tokens_used INT,
    model_used NVARCHAR(100),
    created_at DATETIME DEFAULT GETDATE()
);
GO

PRINT 'All tables created successfully.';
GO
