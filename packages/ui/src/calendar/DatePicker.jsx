/**
 * The month panel behind every date field. Single date or a range; 26px day
 * cells so it matches the pagination keys. The app wraps it in a popover — the
 * panel does not own its own positioning.
 */
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function same(a, b) {
  return (
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

export function DatePicker({
  month,
  value,
  rangeStart,
  rangeEnd,
  today = new Date(),
  onSelect,
  onMonth,
  footer,
  monthLabel
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
  const cells = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }

  const inRange = (d) => rangeStart && rangeEnd && d > rangeStart && d < rangeEnd;
  const isEdge = (d) => same(d, rangeStart) || same(d, rangeEnd) || same(d, value);

  const arrow = (children, onClick, k) => (
    <span
      key={k}
      onClick={onClick}
      className="hover-elevate"
      role="button"
      style={{
        width: 24,
        height: 24,
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-page)",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        cursor: "pointer"
      }}
    >
      {children}
    </span>
  );

  return (
    <div
      style={{
        width: 262,
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-overlay)",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        {arrow("\u2039", onMonth ? () => onMonth(-1) : undefined, "p")}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--text-primary)"
          }}
        >
          {monthLabel}
        </span>
        {arrow("\u203A", onMonth ? () => onMonth(1) : undefined, "n")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 34px)", justifyContent: "center" }}>
        {DAY_LABELS.map((l, i) => (
          <span
            key={i}
            style={{
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "var(--tracking-eyebrow)"
            }}
          >
            {l}
          </span>
        ))}
        {cells.map((d, i) => {
          const outside = d.getMonth() !== month.getMonth();
          const edge = isEdge(d);
          const mid = inRange(d);
          return (
            <span
              key={i}
              onClick={onSelect ? () => onSelect(d) : undefined}
              className={edge ? "" : "hover-elevate"}
              aria-current={same(d, today) ? "date" : undefined}
              style={{
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: edge ? "var(--action-primary)" : mid ? "var(--surface-action-faint)" : "transparent",
                borderRadius: edge ? "var(--radius-md)" : mid ? 0 : "var(--radius-md)",
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11.5,
                fontWeight: edge || same(d, today) ? 600 : 400,
                color: edge
                  ? "var(--action-primary-text)"
                  : same(d, today)
                    ? "var(--text-action)"
                    : outside
                      ? "var(--text-muted)"
                      : "var(--text-secondary)",
                cursor: onSelect ? "pointer" : "default"
              }}
            >
              {d.getDate()}
            </span>
          );
        })}
      </div>
      {footer && (
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
