/**
 * Appears inside the table card, directly under its header, when rows are
 * selected. Faint pink wash — enough to say "the table is in a mode", not
 * enough to compete with the actions in it.
 */
const CHECK = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CLOSE = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export function BulkActionBar({ count, noun = "item", nounPlural, actions, onClear, inCard = true }) {
  const plural = nounPlural || noun + "s";
  const word = count === 1 ? noun : plural;

  return (
    <div
      role="toolbar"
      aria-label={"Actions for " + count + " selected " + word}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "9px 16px",
        minWidth: 0,
        background: "var(--surface-action-faint)",
        borderBottom: inCard ? "1px solid var(--border-subtle)" : "none",
        border: inCard ? undefined : "1px solid var(--border-attention)",
        borderRadius: inCard ? 0 : "var(--radius-lg)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <span
          style={{
            width: 16,
            height: 16,
            flex: "0 0 16px",
            border: "1.5px solid var(--action-primary)",
            borderRadius: "var(--radius-sm)",
            background: "var(--action-primary)",
            color: "var(--action-primary-text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {CHECK}
        </span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>{count}</span> selected
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, flex: "0 0 auto" }}>
        {actions}
        {onClear && (
          <span
            onClick={onClear}
            className="hover-elevate"
            role="button"
            style={{
              height: "var(--control-height-sm)",
              padding: "0 8px",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-sans)",
              fontSize: 11.5,
              fontWeight: 500,
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            {CLOSE}
            Clear
          </span>
        )}
      </div>
    </div>
  );
}
