export function Combobox({
  label,
  query = "",
  onQueryChange,
  options = [],
  selected = [],
  onToggle,
  multi = false,
  open = false,
  onOpenChange,
  placeholder = "Search…",
  emptyMessage = "No matches.",
  maxVisible = 6
}) {
  const isSelected = (v) => (multi ? selected.includes(v) : selected === v || selected[0] === v);
  const shown = options.slice(0, maxVisible);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", minWidth: 0 }}>
      {label && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 500, color: "var(--text-secondary)" }}>
          {label}
        </span>
      )}
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          minHeight: 34,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
          padding: "4px 10px",
          background: "var(--surface-card)",
          border: "1px solid " + (open ? "var(--action-primary)" : "var(--border-strong)"),
          borderRadius: "var(--radius-md)",
          boxShadow: open ? "0 0 0 3px rgba(253, 12, 115, 0.10)" : undefined
        }}
      >
        {multi &&
          selected.map((v) => (
            <span
              key={v}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "var(--surface-hover)",
                borderRadius: "var(--radius-sm)",
                padding: "2px 6px",
                fontFamily: "var(--font-sans)",
                fontSize: 11.5,
                color: "var(--text-secondary)"
              }}
            >
              {v}
              <span
                role="button"
                aria-label={"Remove " + v}
                onClick={() => onToggle && onToggle(v)}
                style={{ cursor: "pointer", color: "var(--text-muted)", fontSize: 12, lineHeight: 1 }}
              >
                ×
              </span>
            </span>
          ))}
        <input
          value={query}
          onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
          onFocus={() => onOpenChange && onOpenChange(true)}
          placeholder={multi && selected.length ? "" : placeholder}
          style={{
            flex: 1,
            minWidth: 60,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--text-primary)",
            padding: "2px 0"
          }}
        />
      </div>
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            background: "var(--surface-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-overlay)",
            overflow: "hidden",
            zIndex: 40
          }}
        >
          {shown.length === 0 && (
            <div style={{ padding: "10px 12px", fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-muted)" }}>
              {emptyMessage}
            </div>
          )}
          {shown.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o, meta: null } : o;
            const on = isSelected(opt.value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={on}
                onClick={() => onToggle && onToggle(opt.value)}
                className="hover-elevate"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: on ? "var(--surface-hover)" : "transparent"
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-primary)", flex: 1, minWidth: 0 }}>
                  {opt.label}
                </span>
                {opt.meta && (
                  <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 11, color: "var(--text-muted)" }}>
                    {opt.meta}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
