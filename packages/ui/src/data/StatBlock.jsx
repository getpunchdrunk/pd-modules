/**
 * One figure with its label. The value is mono because it is comparable to the
 * one next to it; the label is an eyebrow because the figure is the point.
 */
export function StatBlock({
  label,
  value,
  unit,
  icon,
  tone = "default",
  footnote,
  action,
  size = "md",
  children
}) {
  const tones = {
    default: { color: "var(--text-primary)", tint: "var(--surface-hover)", icon: "var(--text-muted)" },
    attention: { color: "var(--text-action)", tint: "var(--surface-action-tint)", icon: "var(--action-primary)" },
    positive: { color: "var(--status-positive)", tint: "var(--surface-positive-tint)", icon: "var(--status-positive)" },
    info: { color: "var(--status-info)", tint: "var(--surface-info-tint)", icon: "var(--status-info)" }
  };
  const t = tones[tone] || tones.default;

  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid hsl(var(--card-border))",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minWidth: 0
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10.5,
            fontWeight: 600,
            color: "var(--text-muted)",
            letterSpacing: "var(--tracking-eyebrow)",
            textTransform: "uppercase"
          }}
        >
          {label}
        </span>
        {icon && (
          <span
            style={{
              width: 26,
              height: 26,
              flex: "0 0 26px",
              borderRadius: "var(--radius-md)",
              background: t.tint,
              color: t.icon,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: size === "sm" ? 19 : 27,
            fontWeight: 600,
            color: t.color,
            letterSpacing: "var(--tracking-heading-sm)",
            lineHeight: "var(--leading-tight)"
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--text-muted)" }}>{unit}</span>
        )}
      </div>
      {children}
      {footnote && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--text-muted)", textWrap: "pretty" }}>
          {footnote}
        </span>
      )}
      {action}
    </div>
  );
}
