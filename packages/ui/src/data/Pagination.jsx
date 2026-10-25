/**
 * Table footer: how many rows are shown on the left, page keys on the right.
 * Keys are 26px so the footer stays at 40px like a table row.
 */
function key(children, opts) {
  const o = opts || {};
  return (
    <span
      key={o.k}
      onClick={o.disabled ? undefined : o.onClick}
      className={o.disabled || o.current ? "" : "hover-elevate"}
      aria-current={o.current ? "page" : undefined}
      aria-disabled={o.disabled || undefined}
      style={{
        width: 26,
        height: 26,
        borderRadius: "var(--radius-md)",
        border: o.current ? "1px solid transparent" : "1px solid var(--border-default)",
        background: o.current ? "var(--text-primary)" : "var(--surface-page)",
        color: o.current ? "var(--text-inverse)" : o.muted ? "var(--text-muted)" : "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontVariantNumeric: "tabular-nums",
        fontSize: o.muted ? 11 : 11.5,
        opacity: o.disabled ? 0.45 : 1,
        cursor: o.disabled ? "not-allowed" : "pointer",
        flex: "0 0 26px"
      }}
    >
      {children}
    </span>
  );
}

export function Pagination({
  page = 1,
  pageCount = 1,
  pageSize,
  total,
  onPage,
  maxKeys = 5,
  inCard = true
}) {
  const first = Math.max(1, Math.min(page - Math.floor(maxKeys / 2), pageCount - maxKeys + 1));
  const last = Math.min(pageCount, first + maxKeys - 1);
  const keys = [];
  for (let p = first; p <= last; p++) {
    keys.push(key(p, { k: p, current: p === page, onClick: onPage ? () => onPage(p) : undefined }));
  }

  const mono = (v) => (
    <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-secondary)" }}>
      {v}
    </span>
  );

  const from = pageSize ? (page - 1) * pageSize + 1 : null;
  const to = pageSize && total != null ? Math.min(page * pageSize, total) : pageSize ? page * pageSize : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 16px",
        background: "var(--surface-sunken)",
        borderTop: inCard ? "1px solid var(--border-subtle)" : "none",
        minWidth: 0
      }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)" }}>
        {total != null && from != null ? (
          <>
            Showing {mono(from)}&ndash;{mono(to)} of {mono(total)}
          </>
        ) : pageSize != null ? (
          <>Rows per page {mono(pageSize)}</>
        ) : (
          <>
            Page {mono(page)} of {mono(pageCount)}
          </>
        )}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
        {key("\u2039", {
          k: "prev",
          muted: true,
          disabled: page <= 1,
          onClick: onPage ? () => onPage(page - 1) : undefined
        })}
        {keys}
        {key("\u203A", {
          k: "next",
          muted: true,
          disabled: page >= pageCount,
          onClick: onPage ? () => onPage(page + 1) : undefined
        })}
      </div>
    </div>
  );
}
