/**
 * Grid table. The component owns its track math: fixed columns are declared in
 * px and flexible ones as ratios that are always wrapped in minmax(0, Nfr), so
 * a wide child (a button, a long filename) can never re-proportion the text
 * columns and desync the header from the body. Header and rows are rendered
 * from ONE template string — that is the whole point.
 */
export function Table({
  columns,
  rows,
  rowKey = (_row, i) => i,
  onRowClick,
  emptyMessage = "Nothing here yet.",
  dense = false
}) {
  const template = columns
    .map((c) => (typeof c.width === "number" ? c.width + "px" : "minmax(0, " + (c.flex || 1) + "fr)"))
    .join(" ");

  const edge = (i) => (i === 0 || i === columns.length - 1 ? 16 : 10);
  const cellPadY = dense ? 8 : 10;

  const align = (c) => (c.align === "right" ? "right" : c.align === "center" ? "center" : "left");

  const headCell = (c, i) => (
    <span
      key={c.key}
      style={{
        padding: "8px " + edge(i) + "px",
        textAlign: align(c),
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 600,
        color: "var(--text-muted)",
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase"
      }}
    >
      {c.label}
    </span>
  );

  const bodyCell = (c, i, row) => {
    const raw = c.render ? c.render(row) : row[c.key];
    const isNum = c.numeric || c.align === "right";
    return (
      <span
        key={c.key}
        title={c.truncate && typeof raw === "string" ? raw : undefined}
        style={{
          padding: cellPadY + "px " + edge(i) + "px",
          textAlign: align(c),
          fontFamily: isNum ? "var(--font-mono)" : "var(--font-sans)",
          fontVariantNumeric: isNum ? "tabular-nums" : undefined,
          fontSize: isNum ? 12.5 : 13,
          fontWeight: c.strong ? 500 : 400,
          color: c.tone === "muted" ? "var(--text-muted)" : c.strong ? "var(--text-primary)" : "var(--text-secondary)",
          minWidth: 0,
          whiteSpace: c.truncate || c.nowrap ? "nowrap" : undefined,
          overflow: c.truncate ? "hidden" : undefined,
          textOverflow: c.truncate ? "ellipsis" : undefined
        }}
      >
        {raw}
      </span>
    );
  };

  if (!rows.length) {
    return (
      <div
        style={{
          padding: "28px 16px",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          fontSize: 12.5,
          color: "var(--text-muted)"
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: template,
          background: "var(--surface-sunken)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        {columns.map(headCell)}
      </div>
      {rows.map((row, r) => (
        <div
          key={rowKey(row, r)}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
          className={onRowClick ? "hover-elevate" : ""}
          style={{
            display: "grid",
            gridTemplateColumns: template,
            alignItems: "center",
            borderBottom: r === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
            cursor: onRowClick ? "pointer" : "default",
            minWidth: 0
          }}
        >
          {columns.map((c, i) => bodyCell(c, i, row))}
        </div>
      ))}
    </div>
  );
}
