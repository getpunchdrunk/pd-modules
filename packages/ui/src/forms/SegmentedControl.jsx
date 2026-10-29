import { useId, useRef, useState } from "react";

export function SegmentedControl({
  options = [], value, onChange, label, size = "md", disabled = false,
  id, style, "aria-labelledby": labelledBy, "aria-label": ariaLabel, ...rest
}) {
  const generatedId = useId();
  const groupId = id || `segments-${generatedId}`;
  const buttons = useRef([]);
  const [focused, setFocused] = useState(null);
  const enabled = options.map((option, index) => !disabled && !option.disabled ? index : -1).filter((index) => index >= 0);
  const selected = enabled.find((index) => options[index].value === value);
  const tabStop = selected ?? enabled[0];
  function move(event, index) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key) || !enabled.length) return;
    event.preventDefault();
    const position = enabled.indexOf(index);
    const backwards = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const next = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled[enabled.length - 1]
      : enabled[(position + (backwards ? -1 : 1) + enabled.length) % enabled.length];
    buttons.current[next]?.focus();
    if (options[next].value !== value) onChange(options[next].value);
  }
  const heights = { sm: "var(--control-height-sm)", md: "var(--control-height)", lg: "var(--control-height-lg)" };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "var(--space-2)", minWidth: 0 }}>
      {label && <span id={`${groupId}-label`} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-secondary)" }}>{label}</span>}
      <div {...rest} id={groupId} role="radiogroup" aria-disabled={disabled || undefined}
        aria-label={ariaLabel} aria-labelledby={labelledBy || (label ? `${groupId}-label` : undefined)}
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", padding: "var(--space-1)", background: "var(--surface-sunken)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)", ...style }}>
        {options.map((option, index) => {
          const unavailable = disabled || !!option.disabled;
          const checked = option.value === value;
          return <button key={option.value} ref={(node) => { buttons.current[index] = node; }}
            type="button" role="radio" aria-checked={checked} disabled={unavailable}
            aria-describedby={option.marker ? `${groupId}-marker-${index}` : undefined}
            tabIndex={index === tabStop ? 0 : -1}
            onClick={() => { if (!unavailable && option.value !== value) onChange(option.value); }}
            onKeyDown={(event) => move(event, index)}
            onFocus={() => setFocused(index)} onBlur={() => setFocused(null)}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
              minHeight: heights[size], padding: size === "sm" ? "0 var(--space-3)" : "0 var(--space-5)",
              border: "1px solid " + (checked ? "var(--border-strong)" : "transparent"),
              borderRadius: "var(--radius-sm)", background: checked ? "var(--surface-card)" : "transparent",
              color: checked ? "var(--text-primary)" : "var(--text-secondary)",
              fontFamily: "var(--font-sans)", fontSize: size === "sm" ? "var(--text-xs)" : "var(--text-base)",
              fontWeight: checked ? "var(--weight-semibold)" : "var(--weight-medium)",
              whiteSpace: "nowrap", opacity: unavailable ? 0.6 : 1, cursor: unavailable ? "not-allowed" : "pointer",
              boxShadow: focused === index ? "var(--focus-ring)" : undefined, position: "relative", zIndex: focused === index ? 1 : undefined
            }}>
            {option.label}
            {option.marker && <span id={`${groupId}-marker-${index}`} style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", fontWeight: "var(--weight-regular)" }}>{option.marker}</span>}
          </button>;
        })}
      </div>
    </div>
  );
}
