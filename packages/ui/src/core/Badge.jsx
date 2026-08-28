export function Badge({ children, tone = "neutral", size = "md", nowrap = true }) {
  const tones = {
    action: { color: "var(--text-action)", background: "rgba(253, 12, 115, 0.09)" },
    positive: { color: "var(--status-positive)", background: "rgba(49, 60, 150, 0.09)" },
    info: { color: "var(--status-info)", background: "rgba(83, 151, 209, 0.16)" },
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
