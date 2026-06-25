"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SectionHeader from "./SectionHeader";
import InsightNote from "./InsightNote";

const TYPE_COLORS = {
  "One-Time Buyer": "#F87171",
  "2 Orders":       "#FBBF24",
  "3-5 Orders":     "#34D399",
  "6+ Orders":      "#818CF8",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface2 border border-borderHi text-xs font-mono px-3 py-2 rounded-sm shadow-card">
      <div className="text-ink font-medium mb-1">{d.customer_type}</div>
      <div className="text-subtle">{d.num_customers?.toLocaleString()} customers</div>
      <div className="text-indigo">{d.percentage}% of base</div>
    </div>
  );
}

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) {
  if (percentage < 2) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#E2E8F0" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontFamily="var(--font-mono)">
      {`${Number(percentage).toFixed(1)}%`}
    </text>
  );
}

export default function CohortSection({ data }) {
  const oneTime = data.find((d) => d.customer_type === "One-Time Buyer");
  const repeatPct = oneTime ? (100 - Number(oneTime.percentage)).toFixed(1) : "—";

  return (
    <section className="bg-surface border border-border rounded-card p-6 md:p-8 card-glow shadow-card section-fade">
      <SectionHeader index="02" title="Repeat-Purchase & Cohort Retention"
        finding="Every delivered customer grouped by purchase frequency — testing whether the business retains buyers or acquires them once."
        accentColor="text-rose" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="num_customers" nameKey="customer_type"
                  cx="50%" cy="50%" innerRadius={65} outerRadius={105}
                  paddingAngle={3} stroke="none" labelLine={false} label={renderCustomLabel}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={TYPE_COLORS[entry.customer_type] || "#64748B"} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted font-mono">
                <span className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: TYPE_COLORS[d.customer_type] || "#64748B" }} />
                {d.customer_type}
              </div>
            ))}
          </div>
        </div>
        <InsightNote tone="rose"
          figure={oneTime ? `${oneTime.percentage}%` : "—"}
          finding={`${oneTime ? oneTime.percentage : "—"}% of customers never returned. Only ${repeatPct}% made a repeat purchase — a clear retention gap.`}
          recommendation="A post-delivery email sequence with a small second-order incentive could shift even 5% of one-time buyers — compounding directly into revenue." />
      </div>
    </section>
  );
}