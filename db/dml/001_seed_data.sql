-- ============================================================================
-- Real Estate & Construction ERP - DML Script (Seed Data)
-- Database: BMS
-- ============================================================================

USE BMS;
GO

-- Projects
INSERT INTO RE_Projects (project_name, project_code, project_type, status, start_date, end_date, estimated_budget, location, city, state, country, description, project_manager, created_by)
VALUES
('Sunrise Towers', 'PRJ-001', 'Residential', 'In-Progress', '2025-01-15', '2026-12-31', 25000000.00, '123 Main Street', 'Dubai', 'Dubai', 'UAE', 'Luxury 20-story residential tower with 200 apartments', 'Ahmed Hassan', 'admin'),
('Metro Business Park', 'PRJ-002', 'Commercial', 'Planning', '2025-06-01', '2027-06-30', 45000000.00, '456 Business Ave', 'Abu Dhabi', 'Abu Dhabi', 'UAE', 'Grade A office complex with retail spaces', 'Sarah Khan', 'admin'),
('Green Valley Villas', 'PRJ-003', 'Residential', 'In-Progress', '2024-09-01', '2026-03-31', 18000000.00, '789 Valley Road', 'Sharjah', 'Sharjah', 'UAE', '50 premium villas with community amenities', 'Mohammed Ali', 'admin'),
('Coastal Mall', 'PRJ-004', 'Commercial', 'Planning', '2025-09-01', '2028-01-31', 75000000.00, '321 Coastal Blvd', 'Dubai', 'Dubai', 'UAE', 'Mixed-use retail and entertainment destination', 'Fatima Noor', 'admin'),
('Heritage Heights', 'PRJ-005', 'Mixed-Use', 'Completed', '2023-01-01', '2025-01-15', 32000000.00, '555 Heritage Lane', 'Dubai', 'Dubai', 'UAE', 'Mixed residential and commercial development', 'Omar Khalid', 'admin');
GO

-- Customers
INSERT INTO RE_Customers (customer_name, customer_type, email, phone, city, state, country, source)
VALUES
('John Smith', 'Individual', 'john.smith@email.com', '+971-50-1234567', 'Dubai', 'Dubai', 'UAE', 'Website'),
('Al Futtaim Group', 'Corporate', 'info@alfuttaim.com', '+971-4-2345678', 'Dubai', 'Dubai', 'UAE', 'Referral'),
('Maria Garcia', 'Individual', 'maria.g@email.com', '+971-55-3456789', 'Abu Dhabi', 'Abu Dhabi', 'UAE', 'Portal'),
('Emirates Holdings', 'Corporate', 'contact@emiratesholdings.ae', '+971-4-4567890', 'Dubai', 'Dubai', 'UAE', 'Walk-in'),
('David Chen', 'Individual', 'david.chen@email.com', '+971-52-5678901', 'Sharjah', 'Sharjah', 'UAE', 'Website');
GO

-- Leads
INSERT INTO RE_Leads (lead_name, email, phone, source, status, interest_type, budget_range, preferred_location, assigned_agent, project_id)
VALUES
('Robert Johnson', 'robert.j@email.com', '+971-50-1111111', 'Website', 'New', 'Buy', '1M-2M AED', 'Dubai Marina', 'Ahmed Hassan', 1),
('Lisa Wong', 'lisa.w@email.com', '+971-55-2222222', 'Social Media', 'Qualified', 'Rent', '50K-100K AED/yr', 'Downtown Dubai', 'Sarah Khan', 2),
('Ahmed Al Maktoum', 'ahmed.m@email.com', '+971-50-3333333', 'Referral', 'Contacted', 'Invest', '5M+ AED', 'Business Bay', 'Mohammed Ali', 4),
('Sophie Martin', 'sophie.m@email.com', '+971-52-4444444', 'Portal', 'New', 'Buy', '2M-5M AED', 'Sharjah', 'Fatima Noor', 3),
('James Wilson', 'james.w@email.com', '+971-55-5555555', 'Walk-in', 'Converted', 'Buy', '1M-2M AED', 'Dubai', 'Omar Khalid', 5);
GO

-- Properties
INSERT INTO RE_Properties (property_name, property_code, property_type, project_id, address, city, state, country, area_sqft, bedrooms, bathrooms, floor_number, unit_number, status, market_value, listing_price, description)
VALUES
('Sunrise Tower - Unit A101', 'ST-A101', 'Apartment', 1, '123 Main Street, Tower A', 'Dubai', 'Dubai', 'UAE', 1200.00, 2, 2, 1, 'A101', 'Available', 1500000.00, 1450000.00, '2BR apartment with sea view'),
('Sunrise Tower - Unit B501', 'ST-B501', 'Apartment', 1, '123 Main Street, Tower B', 'Dubai', 'Dubai', 'UAE', 1800.00, 3, 3, 5, 'B501', 'Sold', 2200000.00, 2100000.00, '3BR penthouse with panoramic view'),
('Metro BP - Office 201', 'MBP-201', 'Office', 2, '456 Business Ave', 'Abu Dhabi', 'Abu Dhabi', 'UAE', 3500.00, 0, 2, 2, '201', 'Available', 4500000.00, 4200000.00, 'Premium office space with parking'),
('Green Valley - Villa 12', 'GV-V12', 'Villa', 3, '789 Valley Road, Villa 12', 'Sharjah', 'Sharjah', 'UAE', 4500.00, 5, 6, 0, 'V12', 'Available', 5500000.00, 5200000.00, '5BR luxury villa with private pool'),
('Heritage Heights - Retail R1', 'HH-R1', 'Retail', 5, '555 Heritage Lane', 'Dubai', 'Dubai', 'UAE', 2000.00, 0, 1, 0, 'R1', 'Leased', 3000000.00, 2800000.00, 'Prime retail space at ground floor');
GO

-- Vendors
INSERT INTO RE_Vendors (vendor_name, vendor_type, contact_person, email, phone, city, country, rating, specialization)
VALUES
('BuildRight Construction', 'Contractor', 'Raj Patel', 'raj@buildright.com', '+971-4-1111111', 'Dubai', 'UAE', 4.5, 'High-rise construction'),
('ElectroPower Systems', 'Subcontractor', 'Ali Hassan', 'ali@electropower.ae', '+971-4-2222222', 'Abu Dhabi', 'UAE', 4.2, 'Electrical installations'),
('GreenScape Landscaping', 'Contractor', 'Nadia Malik', 'nadia@greenscape.ae', '+971-6-3333333', 'Sharjah', 'UAE', 4.8, 'Landscaping and outdoor'),
('Steel Masters Trading', 'Supplier', 'Kumar Singh', 'kumar@steelmasters.com', '+971-4-4444444', 'Dubai', 'UAE', 4.0, 'Steel and metal supplies'),
('CoolAir HVAC', 'Subcontractor', 'Tom Baker', 'tom@coolair.ae', '+971-4-5555555', 'Dubai', 'UAE', 4.3, 'HVAC systems');
GO

-- Employees
INSERT INTO RE_Employees (employee_code, first_name, last_name, email, phone, department, designation, hire_date, salary, employment_type)
VALUES
('EMP001', 'Ahmed', 'Hassan', 'ahmed.h@company.com', '+971-50-0001001', 'Projects', 'Senior Project Manager', '2020-03-15', 35000.00, 'Full-time'),
('EMP002', 'Sarah', 'Khan', 'sarah.k@company.com', '+971-50-0001002', 'Projects', 'Project Manager', '2021-06-01', 28000.00, 'Full-time'),
('EMP003', 'Mohammed', 'Ali', 'mohammed.a@company.com', '+971-50-0001003', 'Sales', 'Sales Manager', '2019-01-10', 30000.00, 'Full-time'),
('EMP004', 'Fatima', 'Noor', 'fatima.n@company.com', '+971-50-0001004', 'Marketing', 'Marketing Lead', '2022-02-20', 25000.00, 'Full-time'),
('EMP005', 'Omar', 'Khalid', 'omar.k@company.com', '+971-50-0001005', 'Finance', 'Finance Manager', '2020-08-01', 32000.00, 'Full-time'),
('EMP006', 'Aisha', 'Rahman', 'aisha.r@company.com', '+971-50-0001006', 'HR', 'HR Manager', '2021-04-15', 27000.00, 'Full-time'),
('EMP007', 'Khalid', 'Mansoor', 'khalid.m@company.com', '+971-50-0001007', 'Legal', 'Legal Advisor', '2022-09-01', 35000.00, 'Full-time'),
('EMP008', 'Priya', 'Sharma', 'priya.s@company.com', '+971-50-0001008', 'IT', 'IT Manager', '2023-01-15', 30000.00, 'Full-time');
GO

-- Tenants
INSERT INTO RE_Tenants (tenant_name, tenant_type, email, phone, property_id, is_active)
VALUES
('Global Tech Solutions', 'Corporate', 'info@globaltech.ae', '+971-4-6666666', 5, 1),
('Mike Anderson', 'Individual', 'mike.a@email.com', '+971-55-7777777', 1, 1),
('Bright Future Trading', 'Corporate', 'contact@brightfuture.ae', '+971-4-8888888', 3, 1);
GO

-- Inventory
INSERT INTO RE_Inventory (item_name, item_code, category, unit, quantity_on_hand, reorder_level, unit_cost, warehouse_location, project_id)
VALUES
('Portland Cement', 'MAT-001', 'Cement', 'Bag', 5000, 1000, 25.00, 'Warehouse A - Dubai', 1),
('Steel Rebar 12mm', 'MAT-002', 'Steel', 'Ton', 200, 50, 2500.00, 'Warehouse A - Dubai', 1),
('Ceramic Tiles 60x60', 'MAT-003', 'Finishing', 'Piece', 15000, 3000, 8.50, 'Warehouse B - Sharjah', 3),
('Copper Wire 2.5mm', 'MAT-004', 'Electrical', 'Meter', 50000, 10000, 3.75, 'Warehouse A - Dubai', 1),
('PVC Pipe 4inch', 'MAT-005', 'Plumbing', 'Meter', 8000, 2000, 12.00, 'Warehouse B - Sharjah', 3);
GO

-- Financial Accounts
INSERT INTO RE_Financial_Accounts (account_code, account_name, account_type, balance, currency)
VALUES
('1000', 'Cash and Bank', 'Asset', 15000000.00, 'AED'),
('1100', 'Accounts Receivable', 'Asset', 8500000.00, 'AED'),
('2000', 'Accounts Payable', 'Liability', 6200000.00, 'AED'),
('3000', 'Revenue - Property Sales', 'Revenue', 42000000.00, 'AED'),
('3100', 'Revenue - Rental Income', 'Revenue', 3600000.00, 'AED'),
('4000', 'Construction Costs', 'Expense', 28000000.00, 'AED'),
('4100', 'Administrative Expenses', 'Expense', 2400000.00, 'AED'),
('5000', 'Owner Equity', 'Equity', 50000000.00, 'AED');
GO

PRINT 'Seed data inserted successfully.';
GO
