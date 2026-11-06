import sqlite3
from typing import Generator
from app.config import DB_PATH

def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def get_db():
    conn = get_db_connection()
    try:
        yield conn
    finally:
        conn.close()

