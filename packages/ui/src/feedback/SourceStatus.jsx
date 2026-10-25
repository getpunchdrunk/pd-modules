/**
 * Per-source health, so a stale number is attributable to a named system
 * rather than mysteriously wrong. A failed source takes the attention surface.
 */
const DOTS = {
  ok: "var(--status-info)",
  stale: "var(--status-attention)",
  failed: "var(--action-primary)",
  idle: "var(--status-neutral)"
};

export function SourceStatus({ sources = [], compact = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {sources.map((s, i) => {
        const failed = s.status === "failed";
        const stale = s.status === "stale";
        return (
          <div
            key={s.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: compact ? "7px 14px" : "8px 14px",
              borderBottom: i === sources.length - 1 ? "none" : "1px solid var(--border-subtle)",
              background: failed ? "var(--surface-attention)" : "transparent",
              minWidth: 0
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                flex: "0 0 6px",
                borderRadius: "var(--radius-pill)",
                background: DOTS[s.status] || DOTS.ok
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12.5,
                color: "var(--text-primary)",
                flex: 1,
                minWidth: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {s.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                fontSize: 11,
                fontWeight: failed ? 600 : 400,
                color: failed || stale ? "var(--text-action)" : "var(--text-muted)",
                flex: "0 0 auto"
              }}
            >
              {failed ? "failed " : stale ? "stale " : ""}
              {s.at}
            </span>
          </div>
        );
      })}
    </div>
  );
}
