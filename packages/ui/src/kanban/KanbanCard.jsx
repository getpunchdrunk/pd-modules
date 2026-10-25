/**
 * One record on a board, whatever the record is. The card takes a title, up to
 * four facts, and one figure — a card that needs more than that is a detail
 * page with extra steps. Cross-source records carry the event palette on a 3px
 * top edge, so a board mixing systems stays attributable without going brand.
 */
export function KanbanCard({
  title,
  facts = [],
  figure,
  badge,
  source,
  tone = "default",
  synced = false,
  assignee,
  onClick
}) {
  const attention = tone === "attention";
  const pal = (source && source.palette) || null;

  return (
    <div
      onClick={onClick}
      className={onClick ? "hover-elevate active-elevate-2" : ""}
      style={{
        background: "var(--surface-card)",
        border: attention ? "1px solid var(--border-attention)" : "1px solid var(--border-default)",
        borderTop: pal ? "3px solid var(--event-" + pal + "-edge)" : undefined,
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-xs)",
        padding: "9px 11px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 0,
        cursor: onClick ? "pointer" : "default"
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: "var(--leading-snug)",
          textWrap: "pretty"
        }}
      >
        {title}
      </span>
      {facts.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          {facts.slice(0, 4).map((fact, i) => (
            <span
              key={i}
              style={{
                fontFamily: fact.mono ? "var(--font-mono)" : "var(--font-sans)",
                fontVariantNumeric: fact.mono ? "tabular-nums" : undefined,
                fontSize: fact.mono ? 11 : 11.5,
                color: fact.tone === "attention" ? "var(--text-action)" : "var(--text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {fact.label}
            </span>
          ))}
        </div>
      )}
      {(badge || figure || assignee || synced) && (
        <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
          {badge}
          {synced && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-muted)" }}>read-only</span>
          )}
          <span style={{ flex: 1 }} />
          {figure && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 12,
                fontWeight: attention ? 600 : 500,
                color: attention ? "var(--text-action)" : "var(--text-primary)"
              }}
            >
              {figure}
            </span>
          )}
          {assignee && (
            <span
              title={assignee.name}
              style={{
                width: 22,
                height: 22,
                flex: "0 0 22px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-hover)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)",
                fontSize: 9.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {assignee.initials}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
