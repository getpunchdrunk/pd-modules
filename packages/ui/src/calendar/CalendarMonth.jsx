import { EventChip } from "./EventChip.jsx";

/**
 * Month grid: six week rows, fixed cell height, line-variant chips with a
 * "+N more" overflow. Today is marked in pink — the one place a calendar earns
 * the accent, because the current day is what you act from.
 */
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function key(d) {
  return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
}

export function CalendarMonth({
  month,
  events = [],
  today = new Date(),
  cellHeight = 96,
  maxPerDay = 3,
  weekStart = 0,
  onDayClick,
  onEventClick,
  onOverflowClick
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - lead);

  const byDay = {};
  events.forEach((e) => {
    const k = key(new Date(e.date));
    (byDay[k] = byDay[k] || []).push(e);
  });

  const labels = DAY_LABELS.slice(weekStart).concat(DAY_LABELS.slice(0, weekStart));
  const cells = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          background: "var(--surface-sunken)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        {labels.map((l) => (
          <span
            key={l}
            style={{
              padding: "8px 10px",
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase"
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
        {cells.map((d, i) => {
          const outside = d.getMonth() !== month.getMonth();
          const isToday = key(d) === key(today);
          const weekend = d.getDay() === 0 || d.getDay() === 6;
          const dayEvents = byDay[key(d)] || [];
          const shown = dayEvents.slice(0, maxPerDay);
          const rest = dayEvents.length - shown.length;

          return (
            <div
              key={i}
              onClick={onDayClick ? () => onDayClick(d) : undefined}
              style={{
                minHeight: cellHeight,
                minWidth: 0,
                padding: "6px 7px 7px 7px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                borderRight: (i + 1) % 7 === 0 ? "none" : "1px solid var(--border-subtle)",
                borderBottom: i >= 35 ? "none" : "1px solid var(--border-subtle)",
                background: isToday
                  ? "var(--surface-action-faint)"
                  : outside
                    ? "var(--surface-sunken)"
                    : weekend
                      ? "var(--surface-sunken)"
                      : "transparent",
                cursor: onDayClick ? "pointer" : "default"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 11.5,
                  fontWeight: isToday ? 600 : 400,
                  color: isToday ? "var(--text-action)" : outside ? "var(--text-muted)" : "var(--text-secondary)"
                }}
              >
                {d.getDate()}
              </span>
              {shown.map((e, n) => (
                <EventChip
                  key={n}
                  variant="line"
                  title={e.title}
                  time={e.time}
                  tone={e.tone}
                  synced={e.synced}
                  source={e.source}
                  onClick={onEventClick ? () => onEventClick(e) : undefined}
                />
              ))}
              {rest > 0 && (
                <span
                  onClick={onOverflowClick ? () => onOverflowClick(d) : undefined}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    cursor: onOverflowClick ? "pointer" : "default"
                  }}
                >
                  +{rest} more
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
