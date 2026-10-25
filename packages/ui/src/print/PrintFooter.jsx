/**
 * Foot of a printed page: a hairline, a left identifier, a right page marker.
 * doc-page repeats this per page when it is placed in slot="footer".
 */
export function PrintFooter({ left, center, right }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 16,
        paddingTop: 8,
        borderTop: "var(--print-rule-hair) solid var(--print-rule)",
        fontFamily: "var(--font-sans)",
        fontSize: 9.5,
        color: "var(--print-ink-faint)"
      }}
    >
      <span>{left}</span>
      {center && <span>{center}</span>}
      <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>{right}</span>
    </div>
  );
}
