"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SectionHeader from "./SectionHeader";
import InsightNote from "./InsightNote";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface2 border border-borderHi text-xs font-mono px-3 py-2 rounded-sm shadow-card max-w-xs">
      <div className="text-ink font-medium mb-1 leading-snug">{d.pair}</div>
      <div className="text-indigo">{d.times_bought_together} times bought together</div>
    </div>
  );
}

export default function AffinitySection({ data }) {
  const chartData = data.map((d, i) => ({
    ...d,
    pair: `${d.category_1.replace(/_/g, " ")} + ${d.category_2.replace(/_/g, " ")}`,
    opacity: 1 - i * 0.08,
  }));
  const top = chartData[0];

  return (
    <section className="bg-surface border border-border rounded-card p-6 md:p-8 card-glow shadow-card section-fade">
      <SectionHeader index="03" title="Product Affinity — Bought Together"
        finding="Multi-item orders broken into category pairs — revealing which products complement each other in a single basket."
        accentColor="text-indigo" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid stroke="#1E2D3D" horizontal={false} />
              <XAxis type="number"
                tick={{ fill: "#64748B", fontSize: 11, fontFamily: "var(--font-mono)" }}
                axisLine={{ stroke: "#1E2D3D" }} tickLine={false} />
              <YAxis type="category" dataKey="pair" width={200}
                tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="times_bought_together" radius={[0, 4, 4, 0]} maxBarSize={22}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill="#818CF8" opacity={entry.opacity} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <InsightNote tone="indigo"
          figure={top ? `${top.times_bought_together}×` : "—"}
          finding={top ? `"${top.category_1.replace(/_/g, " ")}" and "${top.category_2.replace(/_/g, " ")}" appear together more than any other pair — a strong cross-sell signal.` : "Loading affinity data."}
          recommendation="Surface this pairing on product pages as a 'frequently bought together' bundle to lift average order value." />
      </div>
    </section>
  );
}