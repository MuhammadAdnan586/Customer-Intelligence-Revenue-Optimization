"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import KpiCard from "./components/KpiCard";
import RfmSection from "./components/RfmSection";
import CohortSection from "./components/CohortSection";
import AffinitySection from "./components/AffinitySection";
import LeakageSection from "./components/LeakageSection";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.overview(), api.rfm(), api.cohort(), api.affinity(), api.leakage()])
      .then(([overview, rfm, cohort, affinity, leakage]) => {
        setData({ overview, rfm, cohort, affinity, leakage });
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="bg-surface border border-border rounded-card p-8 max-w-md text-center shadow-card">
          <div className="w-10 h-10 rounded-full bg-roseDim border border-rose flex items-center justify-center mx-auto mb-4">
            <span className="text-rose text-lg">⚠</span>
          </div>
          <p className="font-mono text-rose text-sm font-medium mb-2">CONNECTION FAILED</p>
          <p className="text-subtle text-sm mb-4">
            Could not reach the API at{" "}
            <code className="font-mono text-indigo bg-surface2 px-1 rounded">localhost:8000</code>
          </p>
          <p className="text-muted text-xs">
            Make sure the FastAPI backend is running:{" "}
            <code className="font-mono text-amber">uvicorn main:app --reload</code>
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-indigo"
                style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
          <p className="font-mono text-muted text-xs tracking-widest uppercase">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const { overview } = data;

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="bg-orb" />
      <div className="bg-orb-2" />
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-surface/60 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-sm bg-indigoDim border border-indigo/40 flex items-center justify-center">
                  <span className="text-indigo text-xs font-mono font-bold">CI</span>
                </div>
                <span className="font-mono text-xs text-muted tracking-widest uppercase hidden md:block">
                  Customer Intelligence
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="font-mono text-xs text-emerald">live · mysql</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="section-fade">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-indigo bg-indigoDim/40 border border-indigo/20 px-2 py-1 rounded-sm">
                verified · sql-driven
              </span>
              <span className="font-mono text-xs text-muted">olist · 2016–2018 · mysql 8.0</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-tight mb-3">
              Customer Intelligence &{" "}
              <span className="gradient-text">Revenue Optimization</span>
            </h1>
            <p className="text-subtle text-sm md:text-base leading-relaxed max-w-2xl">
              Four business questions answered directly from MySQL — who your best customers are,
              whether they return, what they buy together, and where revenue is leaking.
            </p>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12 section-fade">
            <KpiCard label="Total Customers" value={overview.total_customers?.toLocaleString()} sub="unique buyers" tone="default" icon="◈" />
            <KpiCard label="Revenue Analysed" value={`$${(Number(overview.total_revenue)/1_000_000).toFixed(2)}M`} sub="delivered orders only" tone="positive" icon="▲" />
            <KpiCard label="Avg Order Value" value={`$${Number(overview.avg_order_value).toFixed(2)}`} sub="per delivered order" tone="warning" icon="◎" />
            <KpiCard label="Revenue at Risk" value={`$${(Number(overview.lost_revenue)/1000).toFixed(0)}k`} sub="canceled + unavailable" tone="danger" icon="▼" />
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-6 pb-16">
            <RfmSection data={data.rfm} />
            <CohortSection data={data.cohort} />
            <AffinitySection data={data.affinity} />
            <LeakageSection data={data.leakage} />
          </div>

          {/* Footer */}
          <footer className="border-t border-border pt-6 pb-12">
            <p className="font-mono text-xs text-muted">
              Built with FastAPI · MySQL 8.0 · Next.js · Recharts —{" "}
              <span className="text-indigo">Olist Brazilian E-Commerce Public Dataset</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}