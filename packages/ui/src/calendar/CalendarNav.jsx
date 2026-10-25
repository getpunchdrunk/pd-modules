/**
 * Range label, prev/next/today, and the view switcher. One 34px row above any
 * calendar view — the views themselves never draw controls.
 */
export function CalendarNav({
  label,
  view = "Week",
  views = ["Month", "Week", "Day", "Agenda"],
  onPrev,
  onNext,
  onToday,
  onView,
  right
}) {
  const arrow = (children, onClick, k) => (
    <span
      key={k}
      onClick={onClick}
      className="hover-elevate"
      role="button"
      style={{
        width: 30,
        height: 30,
        flex: "0 0 30px",
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
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
        {arrow("\u2039", onPrev, "p")}
        {arrow("\u203A", onNext, "n")}
        <span
          onClick={onToday}
          className="hover-elevate"
          role="button"
          style={{
            height: 30,
            padding: "0 11px",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-page)",
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--text-secondary)",
            cursor: "pointer"
          }}
        >
          Today
        </span>
      </div>
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: 15,
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "var(--tracking-heading-sm)",
          whiteSpace: "nowrap"
        }}
      >
        {label}
      </span>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 2,
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-md)",
          background: "var(--surface-sunken)",
          flex: "0 0 auto"
        }}
      >
        {views.map((v) => {
          const on = v === view;
          return (
            <span
              key={v}
              onClick={onView ? () => onView(v) : undefined}
              className={on ? "" : "hover-elevate"}
              role="button"
              aria-pressed={on}
              style={{
                height: 24,
                padding: "0 10px",
                borderRadius: "var(--radius-sm)",
                background: on ? "var(--surface-page)" : "transparent",
                border: on ? "1px solid var(--border-default)" : "1px solid transparent",
                display: "flex",
                alignItems: "center",
                fontFamily: "var(--font-sans)",
                fontSize: 11.5,
                fontWeight: on ? 600 : 500,
                color: on ? "var(--text-primary)" : "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              {v}
            </span>
          );
        })}
      </div>
      {right}
    </div>
  );
}
