export function Badge({ children, tone = "neutral", size = "md", nowrap = true }) {
  const tones = {
    action: { color: "var(--text-action)", background: "var(--surface-action-tint)" },
    positive: { color: "var(--status-positive)", background: "var(--surface-positive-tint)" },
    info: { color: "var(--status-info)", background: "var(--surface-info-tint)" },
    neutral: { color: "var(--text-secondary)", background: "var(--surface-hover)" },
    count: { color: "var(--text-muted)", background: "var(--surface-hover)" }
  };
  const isCount = tone === "count";

  return (
    <span
      style={{
        ...tones[tone],
        fontFamily: isCount ? "var(--font-mono)" : "var(--font-sans)",
        fontVariantNumeric: isCount ? "tabular-nums" : undefined,
        fontSize: size === "sm" ? 10.5 : 11,
        fontWeight: isCount ? 400 : 600,
        padding: isCount ? "1px 5px" : "3px 7px",
        borderRadius: isCount ? "var(--radius-pill)" : "var(--radius-sm)",
        whiteSpace: nowrap ? "nowrap" : undefined,
        display: "inline-block"
      }}
    >
      {children}
    </span>
  );
}
