/**
 * The row of controls that narrows a list: search, then dropdowns, then saved
 * filter chips, then the result count pushed to the right edge. 34px controls,
 * wraps rather than scrolls.
 */
export function FilterBar({ search, filters, chips, meta, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
      {search}
      {filters}
      {chips && (
        <>
          <span style={{ width: 1, height: 20, background: "var(--border-default)", margin: "0 2px" }} />
          {chips}
        </>
      )}
      {right}
      {meta && (
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            color: "var(--text-muted)"
          }}
        >
          {meta}
        </span>
      )}
    </div>
  );
}

/** A saved or quick filter. Pill, not a button — it toggles a view, it does not act. */
export function FilterChip({ label, count, active = false, onClick }) {
  return (
    <span
      onClick={onClick}
      className="hover-elevate"
      role="button"
      aria-pressed={active}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
        border: active ? "1px solid var(--border-positive-soft)" : "1px solid var(--border-default)",
        background: active ? "var(--surface-positive-soft)" : "transparent",
        fontFamily: "var(--font-sans)",
        fontSize: 11.5,
        fontWeight: active ? 500 : 400,
        color: active ? "var(--status-positive)" : "var(--text-secondary)",
        whiteSpace: "nowrap",
        cursor: "pointer"
      }}
    >
      {label}
      {count != null && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 11,
            color: active ? "var(--status-positive)" : "var(--text-muted)"
          }}
        >
          {count}
        </span>
      )}
    </span>
  );
}
