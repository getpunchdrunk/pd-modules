import { EventChip } from "./EventChip.jsx";

/**
 * The list view: what is next, in order, with the times in mono down the left.
 * The right view for a rail, a phone, or the block of a dashboard where a grid
 * would be unreadable.
 */
export function CalendarAgenda({ groups = [], emptyMessage = "Nothing scheduled.", onEventClick }) {
  if (!groups.length) {
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
      {groups.map((g, gi) => (
        <div key={gi} style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              background: g.today ? "var(--surface-action-faint)" : "var(--surface-sunken)",
              borderTop: gi === 0 ? "none" : "1px solid var(--border-subtle)",
              borderBottom: "1px solid var(--border-subtle)"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 600,
                color: g.today ? "var(--text-action)" : "var(--text-muted)",
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase"
              }}
            >
              {g.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11,
                color: "var(--text-muted)"
              }}
            >
              {g.date}
            </span>
            <span style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11,
                color: "var(--text-muted)"
              }}
            >
              {g.events.length}
            </span>
          </div>
          {g.events.map((e, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "104px minmax(0, 1fr)",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                borderBottom: i === g.events.length - 1 ? "none" : "1px solid var(--border-subtle)",
                minWidth: 0
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 11.5,
                  color: e.tone === "attention" ? "var(--text-action)" : "var(--text-muted)"
                }}
              >
                {e.time || "All day"}
              </span>
              <EventChip
                variant="line"
                title={e.title}
                tone={e.tone}
                synced={e.synced}
                source={e.source}
                style={{ background: "transparent", height: 20 }}
                onClick={onEventClick ? () => onEventClick(e) : undefined}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
