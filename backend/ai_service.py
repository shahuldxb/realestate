import os
import json
from openai import AzureOpenAI
from dotenv import load_dotenv
from db import execute_query, get_table_schema

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
)

DEPLOYMENT = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o")

# All RE_ tables in BMS
ALL_TABLES = [
    "RE_Projects", "RE_Project_Tasks", "RE_Project_Milestones",
    "RE_Financial_Accounts", "RE_Financial_Transactions", "RE_Invoices", "RE_Budgets",
    "RE_Customers", "RE_Leads", "RE_Interactions",
    "RE_Properties",
    "RE_Land_Acquisitions",
    "RE_Vendors", "RE_Bids", "RE_Purchase_Orders",
    "RE_Construction_Activities", "RE_Daily_Logs",
    "RE_Project_Controls", "RE_Risk_Register",
    "RE_Assets",
    "RE_Valuations",
    "RE_Leases", "RE_Rent_Payments",
    "RE_Sales", "RE_Payment_Plans",
    "RE_Marketing_Campaigns",
    "RE_Opportunities",
    "RE_Employees", "RE_Payroll", "RE_Attendance",
    "RE_Contracts", "RE_Compliance_Records",
    "RE_Documents",
    "RE_Inventory", "RE_Inventory_Transactions",
    "RE_Helpdesk_Tickets", "RE_Maintenance_Schedule",
    "RE_Tenants", "RE_Portal_Notifications",
    "RE_Audit_Log", "RE_AI_Chat_History"
]

def get_db_schema_context():
    schema_parts = []
    for table in ALL_TABLES:
        try:
            cols = get_table_schema(table)
            col_strs = [f"  {c['COLUMN_NAME']} ({c['DATA_TYPE']})" for c in cols]
            schema_parts.append(f"Table: {table}\n" + "\n".join(col_strs))
        except:
            pass
    return "\n\n".join(schema_parts)

SYSTEM_PROMPT = """You are an AI assistant for a Real Estate & Construction ERP system (BMS - Building Management System).
You help users with queries about projects, properties, finances, construction, sales, leases, HR, inventory, and all aspects of property development.

You have access to the following SQL Server database schema:

{schema}

IMPORTANT RULES:
1. When users ask data questions, generate a valid T-SQL query to answer them.
2. Return your response as JSON with format: {{"type": "sql", "query": "SELECT ...", "explanation": "..."}} for data queries
3. For general advice/knowledge questions, return: {{"type": "text", "response": "..."}}
4. For analytical questions, generate the SQL and also provide insights.
5. Always use table names with RE_ prefix. Database is BMS on SQL Server.
6. Never use DELETE or DROP statements.
7. For INSERT/UPDATE, return: {{"type": "mutation", "query": "INSERT/UPDATE ...", "explanation": "..."}}
8. Be helpful, concise, and professional.
"""

def chat_with_ai(user_message, module_context=None, session_id=None):
    schema = get_db_schema_context()
    system = SYSTEM_PROMPT.format(schema=schema)
    
    if module_context:
        system += f"\n\nThe user is currently in the '{module_context}' module of the ERP system."
    
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": user_message}
    ]
    
    try:
        response = client.chat.completions.create(
            model=DEPLOYMENT,
            messages=messages,
            temperature=0.3,
            max_tokens=2000,
        )
        
        ai_text = response.choices[0].message.content
        tokens_used = response.usage.total_tokens if response.usage else 0
        
        # Try to parse as JSON
        try:
            # Clean markdown code blocks if present
            cleaned = ai_text.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            cleaned = cleaned.strip()
            
            parsed = json.loads(cleaned)
            
            if parsed.get("type") == "sql":
                # Execute the query
                try:
                    results = execute_query(parsed["query"])
                    return {
                        "type": "sql_result",
                        "query": parsed["query"],
                        "explanation": parsed.get("explanation", ""),
                        "data": results,
                        "row_count": len(results),
                        "tokens_used": tokens_used
                    }
                except Exception as e:
                    return {
                        "type": "error",
                        "message": f"SQL execution error: {str(e)}",
                        "query": parsed["query"],
                        "tokens_used": tokens_used
                    }
            elif parsed.get("type") == "mutation":
                return {
                    "type": "mutation",
                    "query": parsed["query"],
                    "explanation": parsed.get("explanation", ""),
                    "tokens_used": tokens_used,
                    "message": "Mutation query ready. Confirm to execute."
                }
            else:
                return {
                    "type": "text",
                    "response": parsed.get("response", ai_text),
                    "tokens_used": tokens_used
                }
        except json.JSONDecodeError:
            return {
                "type": "text",
                "response": ai_text,
                "tokens_used": tokens_used
            }
    except Exception as e:
        return {
            "type": "error",
            "message": str(e),
            "tokens_used": 0
        }

def execute_ai_mutation(query):
    """Execute a mutation query that was confirmed by the user."""
    try:
        result = execute_query(query, fetch=False)
        return {"success": True, "affected_rows": result.get("affected_rows", 0)}
    except Exception as e:
        return {"success": False, "error": str(e)}
