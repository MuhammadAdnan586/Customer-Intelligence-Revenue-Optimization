"""
Customer Intelligence & Revenue Optimization System — API layer.

Run with:  uvicorn main:app --reload --port 8000
Docs available at: http://localhost:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from database import engine
import queries as q

app = FastAPI(title="Customer Intelligence API", version="1.0.0")

# Next.js dev server runs on :3000 — allow it to call this API from the browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def run_query(sql: str):
    """Execute a SQL string and return a list of plain dicts (JSON-ready)."""
    try:
        with engine.connect() as conn:
            result = conn.execute(text(sql))
            return [dict(row) for row in result.mappings()]
    except Exception as exc:
        # Surfaces a readable error instead of a raw 500 if the DB isn't reachable
        raise HTTPException(status_code=500, detail=f"Database error: {exc}")


@app.get("/")
def root():
    return {"status": "ok", "message": "Customer Intelligence API is running"}


@app.get("/api/overview")
def overview():
    rows = run_query(q.OVERVIEW_SQL)
    return rows[0] if rows else {}


@app.get("/api/rfm")
def rfm():
    return run_query(q.RFM_SQL)


@app.get("/api/cohort")
def cohort():
    return run_query(q.COHORT_SQL)


@app.get("/api/affinity")
def affinity():
    return run_query(q.AFFINITY_SQL)


@app.get("/api/leakage")
def leakage():
    return {
        "by_status": run_query(q.LEAKAGE_STATUS_SQL),
        "by_category": run_query(q.LEAKAGE_CATEGORY_SQL),
    }
