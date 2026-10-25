/**
 * A titled block of prose or terms on a printed page. Rule above, no box.
 */
export function PrintNote({ title, children, columns = 1 }) {
  return (
    <div data-print-keep style={{ display: "flex", flexDirection: "column", gap: 7, borderTop: "1px solid var(--print-rule-strong)", paddingTop: 9 }}>
      {title && (
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
          {title}
        </span>
      )}
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10.5,
          lineHeight: "var(--leading-normal)",
          color: "var(--print-ink-soft)",
          textWrap: "pretty",
          columnCount: columns > 1 ? columns : undefined,
          columnGap: columns > 1 ? 28 : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
}
