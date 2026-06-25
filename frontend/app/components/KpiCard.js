export default function KpiCard({ label, value, sub, tone = "default", icon }) {
  const toneConfig = {
    default: { accent: "text-indigo",  border: "border-border", bg: "bg-surface", dot: "bg-indigo" },
    positive:{ accent: "text-emerald", border: "border-border", bg: "bg-surface", dot: "bg-emerald" },
    warning: { accent: "text-amber",   border: "border-border", bg: "bg-surface", dot: "bg-amber" },
    danger:  { accent: "text-rose",    border: "border-border", bg: "bg-surface", dot: "bg-rose" },
  };
  const cfg = toneConfig[tone] || toneConfig.default;

  return (
    <div className={`relative overflow-hidden rounded-card border ${cfg.border} ${cfg.bg} p-5 flex flex-col gap-4 card-glow shadow-card transition-all duration-300`}>
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${cfg.dot} opacity-60`} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-muted">{label}</span>
        {icon && <span className={`text-lg ${cfg.accent} opacity-70`}>{icon}</span>}
      </div>
      <div>
        <div className={`font-mono text-2xl md:text-3xl font-medium tabular-nums ${cfg.accent}`}>{value}</div>
        {sub && <div className="text-xs text-muted mt-1 font-mono">{sub}</div>}
      </div>
    </div>
  );
}