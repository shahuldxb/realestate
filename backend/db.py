import pyodbc
import os
import threading
from dotenv import load_dotenv

load_dotenv()

# Connection pool using thread-local storage
_local = threading.local()

def _conn_str():
    return (
        f"DRIVER={os.getenv('SQL_DRIVER')};"
        f"SERVER={os.getenv('SQL_SERVER')};"
        f"DATABASE={os.getenv('SQL_DATABASE', 'bms')};"
        f"UID={os.getenv('SQL_USERNAME')};"
        f"PWD={os.getenv('SQL_PASSWORD')};"
        "TrustServerCertificate=yes;"
        "Connection Timeout=15;"
    )

def get_connection():
    """Get or reuse a thread-local connection."""
    conn = getattr(_local, 'conn', None)
    if conn is not None:
        try:
            conn.execute("SELECT 1")
            return conn
        except Exception:
            try:
                conn.close()
            except Exception:
                pass
            _local.conn = None
    conn = pyodbc.connect(_conn_str())
    _local.conn = conn
    return conn

def execute_query(query, params=None, fetch=True):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        if fetch:
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            return [dict(zip(columns, row)) for row in rows]
        else:
            conn.commit()
            return {"affected_rows": cursor.rowcount}
    except Exception as e:
        try:
            conn.rollback()
        except Exception:
            pass
        # If connection is broken, reset it
        _local.conn = None
        raise e
    finally:
        cursor.close()

def execute_insert(query, params=None):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        cursor.execute("SELECT SCOPE_IDENTITY() AS id")
        result = cursor.fetchone()
        conn.commit()
        return {"id": result[0]} if result and result[0] else {"id": None}
    except Exception as e:
        try:
            conn.rollback()
        except Exception:
            pass
        _local.conn = None
        raise e
    finally:
        cursor.close()

def get_table_schema(table_name):
    query = """
        SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ?
        ORDER BY ORDINAL_POSITION
    """
    return execute_query(query, [table_name])
