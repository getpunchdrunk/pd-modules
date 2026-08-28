export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  size = "md",
  disabled = false,
  invalid = false,
  hint,
  error,
  id,
  ...rest
}) {
  const heights = { sm: 30, md: 34, lg: 40 };
  const selectId = id || (label ? "sel-" + String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 500, color: "var(--text-secondary)" }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          height: heights[size],
          display: "flex",
          alignItems: "center",
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: "1px solid " + (invalid || error ? "var(--action-primary)" : "var(--border-strong)"),
          borderRadius: "var(--radius-md)",
          opacity: disabled ? 0.6 : 1,
          minWidth: 0
        }}
      >
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={invalid || !!error || undefined}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: 12.5,
            fontWeight: 500,
            color: "var(--text-secondary)",
            padding: "0 28px 0 10px",
            cursor: disabled ? "not-allowed" : "pointer"
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <svg
          width="9"
          height="9"
          viewBox="0 0 10 10"
          aria-hidden="true"
          style={{ position: "absolute", right: 10, pointerEvents: "none" }}
        >
          <path d="M1 3.2 L5 7 L9 3.2" stroke="currentColor" strokeWidth="1.5" fill="none" style={{ color: "var(--text-muted)" }} />
        </svg>
      </div>
      {error ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-action)" }}>{error}</span>
      ) : hint ? (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)" }}>{hint}</span>
      ) : null}
    </div>
  );
}
