"""
Database connection setup.
Reads credentials from a .env file (copy .env.example to .env and fill in your own).
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "customer_intelligence")

DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# pool_pre_ping avoids "MySQL server has gone away" errors on idle connections
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
