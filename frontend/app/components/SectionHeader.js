export default function SectionHeader({ index, title, finding, accentColor = "text-indigo" }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className={`font-mono text-xs ${accentColor} bg-surface2 border border-border px-2 py-1 rounded-sm`}>
          {index}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <h2 className="font-display text-xl md:text-2xl text-ink mb-2 leading-snug">{title}</h2>
      {finding && <p className="text-muted text-sm leading-relaxed max-w-2xl">{finding}</p>}
    </div>
  );
}