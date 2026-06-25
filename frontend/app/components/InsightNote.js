export default function InsightNote({ figure, finding, recommendation, tone = "indigo" }) {
  const toneConfig = {
    indigo:  { border: "border-indigo",  text: "text-indigo",  bg: "bg-indigoDim/30" },
    emerald: { border: "border-emerald", text: "text-emerald", bg: "bg-emeraldDim/30" },
    amber:   { border: "border-amber",   text: "text-amber",   bg: "bg-amberDim/30" },
    rose:    { border: "border-rose",    text: "text-rose",    bg: "bg-roseDim/30" },
  };
  const cfg = toneConfig[tone] || toneConfig.indigo;

  return (
    <div className="flex flex-col gap-5">
      <div className={`rounded-card border ${cfg.border} ${cfg.bg} p-4`}>
        <div className={`font-mono text-3xl font-semibold tabular-nums ${cfg.text}`}>{figure}</div>
        <div className="text-xs uppercase tracking-widest text-muted font-mono mt-1">key figure</div>
        <p className="text-sm text-subtle leading-relaxed mt-3">{finding}</p>
      </div>
      <div className="rounded-card bg-surface2 border border-border p-4">
        <div className="text-xs font-mono uppercase tracking-widest text-muted mb-2">↗ recommendation</div>
        <p className="text-sm text-subtle leading-relaxed">{recommendation}</p>
      </div>
    </div>
  );
}