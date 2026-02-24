-- ============================================================================
-- RENT TELLER & CHEQUE MANAGEMENT MODULE - DDL
-- 4 new tables for rent collection teller and cheque management
-- ============================================================================

-- 1. Teller Transactions - records every payment collected at the teller counter
CREATE TABLE RE_Teller_Transactions (
    transaction_id      INT IDENTITY(1,1) PRIMARY KEY,
    receipt_number      NVARCHAR(30),
    transaction_date    DATE,
    transaction_time    NVARCHAR(10),
    tenant_id           INT,
    tenant_name         NVARCHAR(150),
    owner_id            INT,
    owner_name          NVARCHAR(150),
    building_id         INT,
    building_name       NVARCHAR(150),
    unit_id             INT,
    unit_number         NVARCHAR(30),
    lease_id            INT,
    payment_for         NVARCHAR(50),       -- Rent, Security Deposit, Maintenance Fee, Penalty, Other
    period_from         DATE,
    period_to           DATE,
    amount              DECIMAL(14,2),
    vat_amount          DECIMAL(14,2),
    total_amount        DECIMAL(14,2),
    payment_method      NVARCHAR(30),       -- Cash, Cheque, Credit Card, Debit Card, Bank Transfer, Online
    cheque_number       NVARCHAR(30),
    cheque_date         DATE,
    cheque_bank         NVARCHAR(100),
    card_last_four      NVARCHAR(4),
    card_type           NVARCHAR(20),
    bank_reference      NVARCHAR(50),
    transfer_bank       NVARCHAR(100),
    currency            NVARCHAR(5) DEFAULT 'AED',
    exchange_rate       DECIMAL(8,4) DEFAULT 1.0,
    teller_name         NVARCHAR(100),
    teller_id           NVARCHAR(20),
    counter_number      NVARCHAR(10),
    remarks             NVARCHAR(500),
    receipt_printed     BIT DEFAULT 0,
    voided              BIT DEFAULT 0,
    void_reason         NVARCHAR(200),
    void_date           DATE,
    void_by             NVARCHAR(100),
    status              NVARCHAR(20) DEFAULT 'Completed',  -- Completed, Voided, Pending, Reversed
    created_at          DATETIME DEFAULT GETDATE()
);

-- 2. PDC Register - Post-Dated Cheque register for tracking all PDCs received
CREATE TABLE RE_PDC_Register (
    pdc_id              INT IDENTITY(1,1) PRIMARY KEY,
    cheque_number       NVARCHAR(30),
    cheque_date         DATE,
    bank_name           NVARCHAR(100),
    branch_name         NVARCHAR(100),
    account_number      NVARCHAR(30),
    tenant_id           INT,
    tenant_name         NVARCHAR(150),
    owner_id            INT,
    owner_name          NVARCHAR(150),
    building_id         INT,
    building_name       NVARCHAR(150),
    unit_id             INT,
    unit_number         NVARCHAR(30),
    lease_id            INT,
    amount              DECIMAL(14,2),
    payment_for         NVARCHAR(50),       -- Rent, Security Deposit, Commission, Other
    period_covered      NVARCHAR(100),      -- e.g. "Jan 2026 - Mar 2026"
    received_date       DATE,
    received_by         NVARCHAR(100),
    deposit_date        DATE,
    deposit_bank        NVARCHAR(100),
    deposit_slip_no     NVARCHAR(30),
    clearing_date       DATE,
    replacement_cheque  NVARCHAR(30),
    replacement_date    DATE,
    bounce_count        INT DEFAULT 0,
    last_bounce_date    DATE,
    last_bounce_reason  NVARCHAR(200),
    penalty_amount      DECIMAL(14,2) DEFAULT 0,
    penalty_collected   BIT DEFAULT 0,
    remarks             NVARCHAR(500),
    status              NVARCHAR(30) DEFAULT 'On Hand',  -- On Hand, Deposited, Cleared, Bounced, Replaced, Cancelled, Returned to Tenant
    created_at          DATETIME DEFAULT GETDATE()
);

-- 3. Cheque Deposits - batch deposit tracking
CREATE TABLE RE_Cheque_Deposits (
    deposit_id          INT IDENTITY(1,1) PRIMARY KEY,
    deposit_batch_no    NVARCHAR(30),
    deposit_date        DATE,
    bank_name           NVARCHAR(100),
    branch_name         NVARCHAR(100),
    deposit_slip_no     NVARCHAR(30),
    total_cheques       INT DEFAULT 0,
    total_amount        DECIMAL(14,2),
    deposited_by        NVARCHAR(100),
    cheque_numbers      NVARCHAR(500),      -- comma-separated list of cheque numbers in this batch
    pdc_ids             NVARCHAR(200),      -- comma-separated PDC IDs
    expected_clearing   DATE,
    actual_clearing     DATE,
    cleared_amount      DECIMAL(14,2),
    bounced_count       INT DEFAULT 0,
    bounced_amount      DECIMAL(14,2) DEFAULT 0,
    building_id         INT,
    building_name       NVARCHAR(150),
    remarks             NVARCHAR(500),
    status              NVARCHAR(30) DEFAULT 'Pending',  -- Pending, Partially Cleared, Fully Cleared, Bounced
    created_at          DATETIME DEFAULT GETDATE()
);

-- 4. Bounced Cheques - detailed bounce tracking and recovery
CREATE TABLE RE_Bounced_Cheques (
    bounce_id           INT IDENTITY(1,1) PRIMARY KEY,
    pdc_id              INT,
    cheque_number       NVARCHAR(30),
    cheque_date         DATE,
    cheque_amount       DECIMAL(14,2),
    bank_name           NVARCHAR(100),
    tenant_id           INT,
    tenant_name         NVARCHAR(150),
    owner_id            INT,
    building_id         INT,
    building_name       NVARCHAR(150),
    unit_id             INT,
    unit_number         NVARCHAR(30),
    bounce_date         DATE,
    bounce_reason       NVARCHAR(200),      -- Insufficient Funds, Account Closed, Signature Mismatch, Stop Payment, Stale Cheque, Other
    bounce_charges      DECIMAL(14,2) DEFAULT 0,
    penalty_amount      DECIMAL(14,2) DEFAULT 0,
    total_recovery      DECIMAL(14,2),      -- cheque_amount + bounce_charges + penalty
    notification_date   DATE,
    notification_method NVARCHAR(50),       -- Phone, Email, SMS, Letter, In Person
    tenant_response     NVARCHAR(200),
    replacement_cheque  NVARCHAR(30),
    replacement_date    DATE,
    replacement_amount  DECIMAL(14,2),
    cash_recovery       DECIMAL(14,2) DEFAULT 0,
    recovery_date       DATE,
    legal_action        NVARCHAR(50),       -- None, Warning Sent, Legal Notice, Police Case, Court Case
    legal_reference     NVARCHAR(50),
    assigned_to         NVARCHAR(100),
    follow_up_date      DATE,
    remarks             NVARCHAR(500),
    status              NVARCHAR(30) DEFAULT 'Open',  -- Open, Replaced, Recovered, Legal, Written Off, Closed
    created_at          DATETIME DEFAULT GETDATE()
);
