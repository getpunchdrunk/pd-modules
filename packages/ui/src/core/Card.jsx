export function Card({ title, eyebrow, meta, actions, padded = true, children }) {
  const hasHeader = title || eyebrow || meta || actions;

  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--card-border-color, hsl(var(--card-border)))",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0
      }}
    >
      {hasHeader && (
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--surface-page)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            {eyebrow && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "var(--tracking-eyebrow)",
                  textTransform: "uppercase"
                }}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "var(--tracking-heading-sm)"
                }}
              >
                {title}
              </span>
            )}
          </div>
          {(meta || actions) && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
              {meta && (
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--text-muted)" }}>
                  {meta}
                </span>
              )}
              {actions}
            </div>
          )}
        </div>
      )}
      <div style={{ padding: padded ? "14px 16px" : 0, minWidth: 0 }}>{children}</div>
    </div>
  );
}
