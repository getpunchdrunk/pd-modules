/**
 * One event, in every calendar view. The 2px left edge is the source app, so a
 * synced event is attributable at a glance; pink means the event needs
 * something from you (unconfirmed crew, an unanswered hold), never decoration.
 */
const LINK = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export function EventChip({
  title,
  time,
  source,
  tone = "default",
  synced = false,
  variant = "block",
  style,
  onClick
}) {
  const attention = tone === "attention";
  const pal = (source && source.palette) || 1;
  const edge = attention ? "var(--action-primary)" : (source && source.color) || "var(--event-" + pal + "-edge)";
  const fill = attention ? "var(--surface-attention)" : "var(--event-" + pal + "-fill)";

  const base = {
    display: "flex",
    minWidth: 0,
    cursor: onClick ? "pointer" : "default",
    background: fill,
    borderLeft: "2px solid " + edge,
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    ...style
  };

  if (variant === "line") {
    return (
      <span
        className={onClick ? "hover-elevate" : ""}
        onClick={onClick}
        title={synced ? title + " — synced, read-only here" : title}
        style={{ ...base, alignItems: "center", gap: 5, height: 17, padding: "0 5px" }}
      >
        {time && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 9.5,
              color: attention ? "var(--text-action)" : "var(--text-muted)",
              flex: "0 0 auto"
            }}
          >
            {time}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 500,
            color: attention ? "var(--text-action)" : "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0
          }}
        >
          {title}
        </span>
        {synced && <span style={{ display: "flex", color: "var(--text-muted)", flex: "0 0 auto" }}>{LINK}</span>}
      </span>
    );
  }

  return (
    <span
      className={onClick ? "hover-elevate" : ""}
      onClick={onClick}
      title={synced ? title + " — synced, read-only here" : title}
      style={{ ...base, flexDirection: "column", gap: 1, padding: "4px 6px" }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            fontWeight: 600,
            color: attention ? "var(--text-action)" : "var(--text-primary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            flex: 1
          }}
        >
          {title}
        </span>
        {synced && <span style={{ display: "flex", color: "var(--text-muted)", flex: "0 0 auto" }}>{LINK}</span>}
      </span>
      {time && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 10.5,
            color: attention ? "var(--text-action)" : "var(--text-muted)"
          }}
        >
          {time}
        </span>
      )}
      {source && source.label && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-muted)" }}>{source.label}</span>
      )}
    </span>
  );
}
