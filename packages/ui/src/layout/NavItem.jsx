/**
 * One nav row. Active state is pink text over a 7% pink wash — never a pink
 * fill, which would read as a button.
 */
export function NavItem({
  icon,
  label,
  count,
  countTone = "default",
  active = false,
  href,
  onClick,
  trailing
}) {
  const Tag = href ? "a" : "div";

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: count != null || trailing ? "space-between" : "flex-start",
    gap: 10,
    padding: "8px 10px",
    borderRadius: "var(--radius-md)",
    background: active ? "var(--surface-action-soft)" : "transparent",
    fontFamily: "var(--font-sans)",
    fontSize: 13.5,
    fontWeight: active ? 600 : 500,
    color: active ? "var(--text-action)" : "var(--text-secondary)",
    textDecoration: "none",
    cursor: "pointer",
    minWidth: 0,
    transitionDuration: "var(--duration-fast)"
  };

  const countStyle =
    countTone === "attention"
      ? { color: "var(--action-primary-text)", background: "var(--action-primary)" }
      : { color: "var(--text-muted)", background: "var(--surface-hover)" };

  return (
    <Tag
      href={href}
      onClick={onClick}
      className="hover-elevate active-elevate-2"
      aria-current={active ? "page" : undefined}
      style={style}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {icon && (
          <span
            style={{
              display: "flex",
              flex: "0 0 16px",
              color: active ? "var(--action-primary)" : "var(--text-muted)"
            }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      </span>
      {count != null && (
        <span
          style={{
            ...countStyle,
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 11,
            padding: "1px 5px",
            borderRadius: "var(--radius-pill)",
            flex: "0 0 auto"
          }}
        >
          {count}
        </span>
      )}
      {trailing}
    </Tag>
  );
}
