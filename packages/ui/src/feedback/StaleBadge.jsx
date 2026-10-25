/**
 * How old the number you are reading is. Fresh is quiet; stale and failed take
 * the attention surface and pink lettering — never the pink fill.
 */
const WARN = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

export function StaleBadge({ level = "fresh", at, label, prefix = "as of", size = "md" }) {
  const fresh = level === "fresh";
  const md = size === "md";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: md ? 7 : 5,
        height: md ? 30 : 22,
        padding: md ? "0 10px" : "0 6px",
        borderRadius: "var(--radius-md)",
        border: fresh ? "1px solid var(--border-default)" : "1px solid var(--border-attention)",
        background: fresh ? "var(--surface-page)" : "var(--surface-attention)",
        whiteSpace: "nowrap"
      }}
    >
      {fresh ? (
        <span
          style={{
            width: 6,
            height: 6,
            flex: "0 0 6px",
            borderRadius: "var(--radius-pill)",
            background: "var(--status-info)"
          }}
        />
      ) : (
        <span style={{ display: "flex", color: "var(--text-action)" }}>{WARN}</span>
      )}
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: md ? 11.5 : 11,
          color: fresh ? "var(--text-muted)" : "var(--text-action)",
          fontWeight: fresh ? 400 : 600
        }}
      >
        {label || (level === "failed" ? "source failed" : level === "stale" ? "stale" : prefix)}
      </span>
      {at && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: md ? 11.5 : 11,
            color: fresh ? "var(--text-primary)" : "var(--text-action)"
          }}
        >
          {at}
        </span>
      )}
    </span>
  );
}
