/**
 * "From" / "Bill to" / "Prepared for". A labelled address block, ruled off.
 */
export function PrintPartyBlock({ label, name, lines = [], attn }) {
  return (
    <div data-print-keep style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
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
        {label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "var(--print-ink)" }}>
          {name}
        </span>
        {attn && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--print-ink-soft)" }}>Attn: {attn}</span>
        )}
        {lines.map((l, i) => (
          <span key={i} style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--print-ink-soft)", lineHeight: "var(--leading-snug)" }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
