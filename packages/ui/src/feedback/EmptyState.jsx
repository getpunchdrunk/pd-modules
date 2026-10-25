/**
 * Says what would be here and gives the one action that fills it. The stripe
 * texture is allowed behind it — never behind the text itself, so the copy
 * sits on a plain card.
 */
export function EmptyState({ icon, title, message, action, stripes = false, compact = false }) {
  return (
    <div
      className={stripes ? "pd-stripes" : ""}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: compact ? "24px 16px" : "48px 24px",
        textAlign: "center",
        minWidth: 0
      }}
    >
      {icon && (
        <span
          style={{
            width: 40,
            height: 40,
            flex: "0 0 40px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-default)",
            background: "var(--surface-card)",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: 340,
          background: stripes ? "var(--surface-card)" : "transparent",
          borderRadius: stripes ? "var(--radius-md)" : 0,
          padding: stripes ? "8px 12px" : 0
        }}
      >
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
        {message && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              color: "var(--text-muted)",
              lineHeight: "var(--leading-snug)",
              textWrap: "pretty"
            }}
          >
            {message}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}
