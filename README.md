# Real Estate & Construction ERP

A comprehensive Enterprise Resource Planning system for real estate and construction companies, featuring property management, facility operations, financial management, CRM, and more.

## Architecture

```
├── backend/          # Python Flask API server
├── frontend/         # React 19 + Tailwind CSS 4 + shadcn/ui
│   ├── client/       # Frontend source code
│   └── dist/         # Pre-built production files
└── db/               # Database scripts (MSSQL)
    ├── ddl/          # Table creation scripts
    └── dml/          # Seed data scripts
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI, shadcn/ui |
| Backend | Python 3.11, Flask, Flask-CORS |
| Database | Microsoft SQL Server (MSSQL) |
| AI | Azure OpenAI (GPT-4o) |

## Modules

- **Project Management** — Projects, milestones, tasks, Gantt charts
- **Financial Management** — Budgets, invoices, payments, accounts
- **CRM** — Leads, contacts, opportunities, pipeline
- **Property Management** — Buildings, units, valuations
- **Facility Operations** — Owners, tenants, leases, rent collection, maintenance
- **Rent Teller / Counter** — Cash/cheque/card/bank transfer payment collection
- **Cheque Management** — PDC register, deposits, bounced cheques, clearance
- **HCM & Payroll** — Employees, attendance, payroll
- **Sales & Marketing** — Sales pipeline, campaigns, listings
- **Document Management** — Document storage and categorization
- **Inventory Management** — Stock tracking, purchase orders
- **Helpdesk** — Tickets, SLA tracking

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
# Configure .env with your MSSQL credentials
python app.py
```

### Frontend (Development)

```bash
cd frontend
pnpm install
pnpm dev
```

### Frontend (Production)

The pre-built frontend is in `frontend/dist/public/`. Serve it with any static file server or configure Flask to serve it.

### Database

Run the DDL scripts in `db/ddl/` first, then the DML scripts in `db/dml/` to create tables and seed data.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SQL_SERVER` | MSSQL server address |
| `SQL_DATABASE` | Database name |
| `SQL_USERNAME` | Database username |
| `SQL_PASSWORD` | Database password |
| `SQL_DRIVER` | ODBC driver (default: `{ODBC Driver 17 for SQL Server}`) |
| `AZURE_OPENAI_ENDPOINT` | Azure OpenAI endpoint URL |
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API key |
| `AZURE_OPENAI_CHAT_DEPLOYMENT` | Azure OpenAI deployment name |
| `AZURE_OPENAI_API_VERSION` | Azure OpenAI API version |

## Deployment on Render

### Backend (Web Service)
1. Create a new Web Service on Render
2. Connect to this GitHub repository
3. Set root directory to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `python app.py`
6. Add all environment variables from `.env`

### Frontend (Static Site)
1. Create a new Static Site on Render
2. Connect to this GitHub repository
3. Set root directory to `frontend`
4. Build command: `pnpm install && pnpm build`
5. Publish directory: `dist/public`
