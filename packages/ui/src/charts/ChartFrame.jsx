/**
 * The card a chart lives in. Owns the title, the legend, the freshness slot and
 * the plot height, so no two charts in the app declare their own chrome.
 */
export function ChartFrame({ title, eyebrow, meta, legend, height = 200, footnote, children }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid hsl(var(--card-border))",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0
      }}
    >
      {(title || eyebrow || meta) && (
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--surface-page)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            minWidth: 0
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            {eyebrow && (
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
                {eyebrow}
              </span>
            )}
            {title && (
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "var(--tracking-heading-sm)"
                }}
              >
                {title}
              </span>
            )}
          </div>
          {meta && <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>{meta}</div>}
        </div>
      )}
      {legend && (
        <div
          style={{
            padding: "10px 16px 0 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            minWidth: 0
          }}
        >
          {legend}
        </div>
      )}
      <div style={{ height, padding: "10px 16px 14px 16px", minWidth: 0 }}>{children}</div>
      {footnote && (
        <div
          style={{
            padding: "0 16px 14px 16px",
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            color: "var(--text-muted)",
            textWrap: "pretty"
          }}
        >
          {footnote}
        </div>
      )}
    </div>
  );
}

/** One legend entry. The swatch is 8px so it reads as a key, not a chip. */
export function ChartLegendItem({ label, color = "var(--chart-2)", value, dashed = false }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
      <span
        style={{
          width: 8,
          height: dashed ? 0 : 8,
          flex: "0 0 8px",
          borderRadius: dashed ? 0 : "var(--radius-sm)",
          background: dashed ? "transparent" : color,
          borderTop: dashed ? "1.5px dashed " + color : undefined
        }}
      />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--text-secondary)" }}>{label}</span>
      {value != null && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 11.5,
            color: "var(--text-muted)"
          }}
        >
          {value}
        </span>
      )}
    </span>
  );
}
