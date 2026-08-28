export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  ...rest
}) {
  const heights = { sm: 26, md: 34, lg: 40 };
  const pads = { sm: "0 10px", md: "0 13px", lg: "0 16px" };
  const fonts = { sm: 11.5, md: 12.5, lg: 13.5 };

  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--action-primary-text)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "var(--surface-card)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-default)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-muted)",
      border: "1px solid transparent"
    },
    danger: {
      background: "var(--surface-attention)",
      color: "var(--text-action)",
      border: "1px solid var(--border-attention)"
    }
  };

  const style = {
    ...variants[variant],
    height: heights[size],
    padding: pads[size],
    fontFamily: "var(--font-sans)",
    fontSize: fonts[size],
    fontWeight: variant === "primary" || variant === "danger" ? 600 : 500,
    borderRadius: "var(--radius-md)",
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
    transitionDuration: "var(--duration-fast)"
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={disabled ? "" : "hover-elevate active-elevate-2"}
      style={style}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
