/**
 * The line-item table on a printed page: hairline rules, a banded head that
 * repeats across pages, group rows and subtotals. No zebra, no card, no shadow.
 */
export function PrintLineTable({ columns = [], rows = [], caption, dense = false }) {
  const pad = dense ? "6px 10px" : "8px 10px";
  const align = (c) => c.align || "left";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {caption && (
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
          {caption}
        </span>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          {columns.map((c, i) => (
            <col key={i} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  textAlign: align(c),
                  padding: pad,
                  paddingLeft: i === 0 ? 0 : undefined,
                  paddingRight: i === columns.length - 1 ? 0 : undefined,
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "var(--tracking-eyebrow)",
                  textTransform: "uppercase",
                  color: "var(--print-ink-soft)",
                  borderTop: "1px solid var(--print-rule-strong)",
                  borderBottom: "1px solid var(--print-rule-strong)",
                  whiteSpace: "nowrap"
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => {
            const kind = r.kind || "item";
            const isGroup = kind === "group";
            const isSub = kind === "subtotal";
            const isTotal = kind === "total";
            return (
              <tr key={ri} style={{ background: isSub || isTotal ? "var(--print-band)" : "transparent" }}>
                {columns.map((c, ci) => {
                  const raw = r.cells ? r.cells[ci] : r[c.key];
                  if (isGroup && ci > 0) return null;
                  return (
                    <td
                      key={ci}
                      colSpan={isGroup && ci === 0 ? columns.length : undefined}
                      style={{
                        textAlign: isGroup ? "left" : align(c),
                        padding: isGroup ? "13px 0 5px 0" : pad,
                        paddingLeft: ci === 0 ? 0 : undefined,
                        paddingRight: ci === columns.length - 1 ? 0 : undefined,
                        verticalAlign: "top",
                        fontFamily: isGroup ? "var(--font-sans)" : c.mono ? "var(--font-mono)" : "var(--font-sans)",
                        fontVariantNumeric: "tabular-nums",
                        fontSize: isGroup ? 10 : 11,
                        fontWeight: isGroup || isSub || isTotal ? 600 : 400,
                        letterSpacing: isGroup ? "var(--tracking-eyebrow)" : undefined,
                        textTransform: isGroup ? "uppercase" : undefined,
                        color: r.muted ? "var(--print-ink-soft)" : "var(--print-ink)",
                        borderBottom: isGroup
                          ? "1px solid var(--print-rule-strong)"
                          : "var(--print-rule-hair) solid var(--print-rule)",
                        lineHeight: "var(--leading-snug)"
                      }}
                    >
                      {raw}
                      {ci === 0 && r.note && (
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 400, color: "var(--print-ink-faint)", marginTop: 2, textWrap: "pretty" }}>
                          {r.note}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
