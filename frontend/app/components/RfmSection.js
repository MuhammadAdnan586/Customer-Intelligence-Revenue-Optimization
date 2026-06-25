"use client";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SectionHeader from "./SectionHeader";
import InsightNote from "./InsightNote";

const SEGMENT_COLORS = {
  "Champions":       "#FBBF24",
  "Loyal Customers": "#34D399",
  "New Customers":   "#818CF8",
  "At Risk":         "#F87171",
  "Lost":            "#475569",
  "Need Attention":  "#C084FC",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface2 border border-borderHi text-xs font-mono px-3 py-2 rounded-sm shadow-card">
      <div className="text-ink font-medium mb-1">{d.customer_segment}</div>
      <div className="text-subtle">{d.num_customers.toLocaleString()} customers</div>
      <div className="text-emerald">${Number(d.total_revenue).toLocaleString()} revenue</div>
      <div className="text-amber">{d.revenue_percentage}% of total</div>
    </div>
  );
}

export default function RfmSection({ data }) {
  const champions = data.find((d) => d.customer_segment === "Champions");
  const totalCustomers = data.reduce((s, d) => s + d.num_customers, 0);
  const totalRevenue = data.reduce((s, d) => s + Number(d.total_revenue), 0);
  const overallAvg = totalRevenue / totalCustomers;
  const championShare = champions ? (champions.num_customers / totalCustomers * 100).toFixed(1) : "—";
  const champMultiplier = champions ? (Number(champions.avg_revenue_per_customer) / overallAvg).toFixed(1) : "—";

  return (
    <section className="bg-surface border border-border rounded-card p-6 md:p-8 card-glow shadow-card section-fade">
      <SectionHeader index="01" title="RFM Customer Segmentation"
        finding={`${totalCustomers.toLocaleString()} customers scored on Recency, Frequency, and Monetary value — grouped into actionable segments.`}
        accentColor="text-amber" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid stroke="#1E2D3D" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "#1E2D3D" }} tickLine={false} />
              <YAxis type="category" dataKey="customer_segment" width={130}
                tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="revenue_percentage" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={SEGMENT_COLORS[entry.customer_segment] || "#64748B"} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <InsightNote tone="amber"
          figure={champions ? `$${Number(champions.avg_revenue_per_customer).toFixed(0)}` : "—"}
          finding={champions ? `Champions are just ${championShare}% of customers but spend ${champMultiplier}x the overall average — the highest-value segment by far.` : "Loading segment data."}
          recommendation="Build a retention track for Champions (early access, dedicated support) and nudge New Customers toward a second purchase with a targeted offer." />
      </div>
    </section>
  );
}