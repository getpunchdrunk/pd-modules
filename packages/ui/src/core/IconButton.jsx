export function IconButton({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled = false,
  onClick,
  ...rest
}) {
  const sizes = { sm: 26, md: 30, lg: 34 };
  const variants = {
    secondary: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      color: "var(--text-secondary)"
    },
    ghost: { background: "transparent", border: "1px solid transparent", color: "var(--text-muted)" },
    primary: {
      background: "var(--action-primary)",
      border: "1px solid transparent",
      color: "var(--action-primary-text)"
    }
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={disabled ? "" : "hover-elevate active-elevate-2"}
      style={{
        ...variants[variant],
        width: sizes[size],
        height: sizes[size],
        borderRadius: "var(--radius-md)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        flex: "0 0 " + sizes[size] + "px"
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}
