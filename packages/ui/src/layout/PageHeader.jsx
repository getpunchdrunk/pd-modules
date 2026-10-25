/** The page's name and its one primary action. */
export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, minWidth: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
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
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading)",
            fontSize: 27,
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "var(--tracking-heading)",
            lineHeight: "var(--leading-tight)"
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textWrap: "pretty" }}>
            {subtitle}
          </div>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>{actions}</div>
      )}
    </div>
  );
}
