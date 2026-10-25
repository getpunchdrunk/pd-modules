import { EventChip } from "./EventChip.jsx";

/**
 * Time grid for a week or a single day — one component, because a day view is a
 * week with one column and nobody should maintain both. Hour rows are 44px and
 * the half-hour rule is subtle, so a 30-minute meeting is still legible.
 */
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarWeek({
  days = [],
  events = [],
  allDay = [],
  startHour = 7,
  endHour = 20,
  hourHeight = 44,
  today = new Date(),
  now,
  gutter = 64,
  onEventClick
}) {
  const hours = [];
  for (let h = startHour; h <= endHour; h++) hours.push(h);
  const bodyHeight = (endHour - startHour) * hourHeight;

  const hourLabel = (h) => {
    const ampm = h >= 12 ? "PM" : "AM";
    const base = h % 12 === 0 ? 12 : h % 12;
    return base + " " + ampm;
  };

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const cols = "repeat(" + days.length + ", minmax(0, 1fr))";
  const nowTop = now ? (now.getHours() + now.getMinutes() / 60 - startHour) * hourHeight : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gutter + "px " + cols,
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--surface-sunken)"
        }}
      >
        <span />
        {days.map((d, i) => {
          const isToday = sameDay(d, today);
          return (
            <div
              key={i}
              style={{
                padding: "7px 10px",
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                borderLeft: "1px solid var(--border-subtle)",
                background: isToday ? "var(--surface-action-faint)" : "transparent",
                minWidth: 0
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: isToday ? "var(--text-action)" : "var(--text-muted)",
                  letterSpacing: "var(--tracking-eyebrow)",
                  textTransform: "uppercase"
                }}
              >
                {DAY_LABELS[d.getDay()]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 12.5,
                  fontWeight: isToday ? 600 : 500,
                  color: isToday ? "var(--text-action)" : "var(--text-primary)"
                }}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {allDay.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gutter + "px " + cols,
            borderBottom: "1px solid var(--border-default)",
            minHeight: 30
          }}
        >
          <span
            style={{
              padding: "7px 8px",
              textAlign: "right",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase"
            }}
          >
            All day
          </span>
          <div style={{ gridColumn: "2 / -1", padding: "5px 6px", display: "flex", flexDirection: "column", gap: 3 }}>
            {allDay.map((e, i) => (
              <EventChip
                key={i}
                variant="line"
                title={e.title}
                tone={e.tone}
                synced={e.synced}
                source={e.source}
                style={{
                  marginLeft: e.spanFrom ? ((e.spanFrom - 1) / days.length) * 100 + "%" : 0,
                  width: e.spanDays ? (e.spanDays / days.length) * 100 + "%" : undefined
                }}
                onClick={onEventClick ? () => onEventClick(e) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: gutter + "px " + cols, minWidth: 0 }}>
        <div style={{ position: "relative", height: bodyHeight }}>
          {hours.map((h, i) => (
            <span
              key={h}
              style={{
                position: "absolute",
                top: i * hourHeight - 6,
                right: 8,
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 10.5,
                color: "var(--text-muted)"
              }}
            >
              {hourLabel(h)}
            </span>
          ))}
        </div>
        {days.map((d, di) => {
          const isToday = sameDay(d, today);
          const dayEvents = events.filter((e) => sameDay(new Date(e.start), d));
          return (
            <div
              key={di}
              style={{
                position: "relative",
                height: bodyHeight,
                borderLeft: "1px solid var(--border-subtle)",
                background: isToday
                  ? "var(--surface-action-faint)"
                  : d.getDay() === 0 || d.getDay() === 6
                    ? "var(--surface-sunken)"
                    : "transparent",
                minWidth: 0
              }}
            >
              {hours.slice(1).map((h, i) => (
                <span
                  key={h}
                  style={{
                    position: "absolute",
                    top: (i + 1) * hourHeight,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--border-subtle)"
                  }}
                />
              ))}
              {dayEvents.map((e, i) => {
                const s = new Date(e.start);
                const en = new Date(e.end);
                const top = (s.getHours() + s.getMinutes() / 60 - startHour) * hourHeight;
                const h = Math.max(((en - s) / 3600000) * hourHeight - 2, 17);
                return (
                  <EventChip
                    key={i}
                    title={e.title}
                    time={e.time}
                    tone={e.tone}
                    synced={e.synced}
                    source={e.source}
                    style={{ position: "absolute", top, left: 3, right: 3, height: h }}
                    onClick={onEventClick ? () => onEventClick(e) : undefined}
                  />
                );
              })}
              {isToday && nowTop != null && nowTop >= 0 && nowTop <= bodyHeight && (
                <span
                  aria-label="Current time"
                  style={{ position: "absolute", top: nowTop, left: 0, right: 0, height: 1, background: "var(--action-primary)" }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: -3,
                      top: -2.5,
                      width: 6,
                      height: 6,
                      borderRadius: "var(--radius-pill)",
                      background: "var(--action-primary)"
                    }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
