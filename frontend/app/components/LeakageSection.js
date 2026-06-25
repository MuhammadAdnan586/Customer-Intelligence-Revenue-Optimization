"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SectionHeader from "./SectionHeader";
import InsightNote from "./InsightNote";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface2 border border-borderHi text-xs font-mono px-3 py-2 rounded-sm shadow-card">
      <div className="text-ink font-medium mb-1">{d.product_category_name?.replace(/_/g, " ")}</div>
      <div className="text-subtle">{d.canceled_orders} canceled orders</div>
      <div className="text-rose">${Number(d.lost_revenue).toLocaleString()} lost</div>
    </div>
  );
}

export default function LeakageSection({ data }) {
  const byStatus = data.by_status || [];
  const byCategory = data.by_category || [];
  const totalLost = byStatus.reduce((s, d) => s + Number(d.lost_revenue), 0);
  const totalOrders = byStatus.reduce((s, d) => s + d.num_orders, 0);
  const topCategory = byCategory[0];
  const maxRevenue = Math.max(...byCategory.map(d => Number(d.lost_revenue)));
  const chartData = byCategory.map(d => ({
    ...d,
    name: d.product_category_name?.replace(/_/g, " "),
    opacity: 0.5 + 0.5 * (Number(d.lost_revenue) / maxRevenue),
  }));

  return (
    <section className="bg-surface border border-border rounded-card p-6 md:p-8 card-glow shadow-card section-fade">
      <SectionHeader index="04" title="Revenue Leakage Detection"
        finding="Canceled and unavailable orders traced back to product category — sizing the revenue lost to fulfilment failure."
        accentColor="text-rose" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 0, right: 8, top: 4 }}>
              <CartesianGrid stroke="#1E2D3D" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 9.5 }}
                axisLine={{ stroke: "#1E2D3D" }} tickLine={false}
                interval={0} angle={-30} textAnchor="end" height={64} />
              <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="lost_revenue" radius={[4, 4, 0, 0]} maxBarSize={36}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill="#F87171" opacity={entry.opacity} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <InsightNote tone="rose"
          figure={`$${(totalLost/1000).toFixed(0)}k`}
          finding={`${totalOrders.toLocaleString()} canceled or unavailable orders — $${totalLost.toLocaleString()} in lost revenue.${topCategory ? ` "${topCategory.product_category_name.replace(/_/g, " ")}" carries the largest single-category loss.` : ""}`}
          recommendation="Prioritise inventory accuracy for high-value categories first — the loss per cancellation is far larger there than in high-volume, low-margin ones." />
      </div>
    </section>
  );
}