/**
 * Letterhead for a printed document. Wordmark and accent hairline on the left,
 * document type and number on the right, a ruled meta grid underneath.
 */
export function PrintDocHeader({
  org = "Punch Drunk",
  orgLines = [],
  docType,
  docNumber,
  status,
  meta = []
}) {
  return (
    <div data-print-keep style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 3, height: 15, background: "var(--print-accent)" }} aria-hidden="true" />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "var(--tracking-wordmark)",
                textTransform: "uppercase",
                color: "var(--print-ink)"
              }}
            >
              {org}
            </span>
          </div>
          {orgLines.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {orgLines.map((l, i) => (
                <span key={i} style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--print-ink-faint)" }}>
                  {l}
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-tight)",
              color: "var(--print-ink)"
            }}
          >
            {docType}
          </span>
          {docNumber && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--print-ink-soft)" }}>{docNumber}</span>
          )}
          {status && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase",
                color: "var(--print-ink)",
                border: "1px solid var(--print-rule-strong)",
                padding: "2px 7px"
              }}
            >
              {status}
            </span>
          )}
        </div>
      </div>
      {meta.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${meta.length}, minmax(0, 1fr))`,
            gap: 0,
            borderTop: "1px solid var(--print-rule-strong)",
            borderBottom: "var(--print-rule-hair) solid var(--print-rule)"
          }}
        >
          {meta.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "9px 12px 9px 0" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "var(--tracking-eyebrow)",
                  textTransform: "uppercase",
                  color: "var(--print-ink-faint)"
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: m.mono === false ? "var(--font-sans)" : "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 11.5,
                  color: "var(--print-ink)"
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
