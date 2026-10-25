/**
 * A table figure that doubles as a chart: the bar sits behind the number in the
 * same track, so the column stays sortable and the row height does not change.
 * Crosses the threshold and the bar and the figure both go pink.
 */
export function BarCell({ value, max, label, threshold = 0.9, tone, align = "right", showPercent = false }) {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const over = tone === "attention" || (tone == null && ratio >= threshold);
  const barColor = over ? "var(--action-primary)" : "hsl(var(--chart-2))";
  const textColor = over ? "var(--text-action)" : "var(--text-primary)";

  return (
    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0, alignItems: "stretch" }}>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: align === "right" ? "flex-end" : "space-between",
          gap: 6,
          lineHeight: 1
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 12.5,
            fontWeight: over ? 600 : 500,
            color: textColor
          }}
        >
          {label}
        </span>
        {showPercent && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 10.5,
              color: "var(--text-muted)"
            }}
          >
            {Math.round(ratio * 100)}%
          </span>
        )}
      </span>
      <span
        role="img"
        aria-label={label + (max ? " of " + max : "")}
        style={{
          height: 4,
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-hover)",
          overflow: "hidden",
          display: "block"
        }}
      >
        <span
          style={{
            display: "block",
            width: ratio * 100 + "%",
            height: "100%",
            borderRadius: "var(--radius-pill)",
            background: barColor
          }}
        />
      </span>
    </span>
  );
}
