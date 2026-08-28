export function Input({
  label,
  value,
  onChange,
  placeholder,
  prefix = null,
  suffix = null,
  type = "text",
  numeric = false,
  size = "md",
  invalid = false,
  disabled = false,
  hint,
  error,
  id,
  ...rest
}) {
  const heights = { sm: 30, md: 34, lg: 40 };
  const inputId = id || (label ? "in-" + String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const describedBy = error ? inputId + "-err" : hint ? inputId + "-hint" : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            fontWeight: 500,
            color: "var(--text-secondary)"
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          height: heights[size],
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "0 10px",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: "1px solid " + (invalid || error ? "var(--action-primary)" : "var(--border-strong)"),
          borderRadius: "var(--radius-md)",
          boxShadow: invalid || error ? "0 0 0 3px rgba(253, 12, 115, 0.10)" : undefined,
          opacity: disabled ? 0.6 : 1,
          minWidth: 0
        }}
      >
        {prefix && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)", flex: "0 0 auto" }}>
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid || !!error || undefined}
          aria-describedby={describedBy}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: numeric ? "var(--font-mono)" : "var(--font-sans)",
            fontVariantNumeric: numeric ? "tabular-nums" : undefined,
            fontSize: 13,
            color: "var(--text-primary)",
            padding: 0
          }}
          {...rest}
        />
        {suffix && (
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--text-muted)", flex: "0 0 auto" }}>
            {suffix}
          </span>
        )}
      </div>
      {error ? (
        <span id={inputId + "-err"} style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-action)" }}>
          {error}
        </span>
      ) : hint ? (
        <span id={inputId + "-hint"} style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)" }}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}
