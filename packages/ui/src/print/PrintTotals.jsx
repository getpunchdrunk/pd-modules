/**
 * The money stack at the foot of an invoice or budget: right column, ruled,
 * with one emphasised figure. Everything above it is arithmetic showing itself.
 */
export function PrintTotals({ rows = [], total, note, width = 268 }) {
  return (
    <div data-print-keep style={{ display: "flex", justifyContent: "space-between", gap: 32, alignItems: "flex-start" }}>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        {note && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--print-ink-faint)", textWrap: "pretty", display: "block", maxWidth: 340, lineHeight: "var(--leading-snug)" }}>
            {note}
          </span>
        )}
      </div>
      <div style={{ width, flex: `0 0 ${width}px`, display: "flex", flexDirection: "column" }}>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              padding: "6px 0",
              borderBottom: "var(--print-rule-hair) solid var(--print-rule)"
            }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: r.muted ? "var(--print-ink-faint)" : "var(--print-ink-soft)" }}>
              {r.label}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 11.5, color: "var(--print-ink)" }}>
              {r.value}
            </span>
          </div>
        ))}
        {total && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
              padding: "10px 0 0 0",
              marginTop: 2,
              borderTop: "2px solid var(--print-rule-strong)"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase",
                color: "var(--print-ink)"
              }}
            >
              {total.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: "var(--tracking-heading-sm)",
                color: "var(--print-ink)"
              }}
            >
              {total.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
