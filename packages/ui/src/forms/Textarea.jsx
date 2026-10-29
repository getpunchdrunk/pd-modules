import { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";

export const Textarea = forwardRef(function Textarea({
  label, hint, error, size = "md", invalid = false, disabled = false,
  rows = 3, autoGrow = false, maxRows = 10, id, value, defaultValue,
  onChange, onInput, onFocus, onBlur, style, "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid, ...rest
}, ref) {
  const generatedId = useId();
  const inputId = id || `textarea-${generatedId}`;
  const nodeRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const setRef = useCallback((node) => {
    nodeRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, [ref]);
  const resize = useCallback(() => {
    const node = nodeRef.current;
    if (!autoGrow || !node) return;
    const computed = node.ownerDocument.defaultView.getComputedStyle(node);
    const line = parseFloat(computed.lineHeight);
    const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const border = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
    const min = Math.max(1, rows) * line + padding + border;
    const max = Math.max(Math.max(1, rows), maxRows) * line + padding + border;
    node.style.height = "auto";
    const height = Math.min(max, Math.max(min, node.scrollHeight + border));
    node.style.height = `${height}px`;
    node.style.overflowY = node.scrollHeight + border > max ? "auto" : "hidden";
  }, [autoGrow, rows, maxRows]);
  useEffect(() => { resize(); }, [resize, value, defaultValue, size]);
  useEffect(() => {
    const node = nodeRef.current;
    if (!autoGrow || !node) return;
    resize();
    const win = node.ownerDocument.defaultView;
    let width;
    const observer = win.ResizeObserver ? new win.ResizeObserver(([entry]) => {
      if (entry.contentRect.width !== width) {
        width = entry.contentRect.width;
        resize();
      }
    }) : null;
    observer?.observe(node);
    win.addEventListener("resize", resize);
    return () => {
      observer?.disconnect();
      win.removeEventListener("resize", resize);
      node.style.height = "";
      node.style.overflowY = "";
    };
  }, [autoGrow, resize]);
  const description = [describedBy, error ? `${inputId}-err` : hint ? `${inputId}-hint` : null].filter(Boolean).join(" ") || undefined;
  const padding = { sm: "var(--space-2)", md: "var(--space-4)", lg: "var(--space-5)" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", minWidth: 0 }}>
      {label && <label htmlFor={inputId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-secondary)" }}>{label}</label>}
      <textarea
        {...rest}
        ref={setRef} id={inputId} value={value} defaultValue={defaultValue}
        rows={Math.max(1, rows)} disabled={disabled}
        aria-invalid={invalid || !!error || ariaInvalid || undefined}
        aria-describedby={description}
        onChange={onChange}
        onInput={(event) => { resize(); onInput?.(event); }}
        onFocus={(event) => { setFocused(true); onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); onBlur?.(event); }}
        style={{
          boxSizing: "border-box", width: "100%", minWidth: 0,
          padding: `${padding[size]} var(--space-5)`,
          background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
          border: "1px solid " + (invalid || error ? "var(--action-primary)" : "var(--border-strong)"),
          borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)",
          fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)",
          color: "var(--text-primary)", opacity: disabled ? 0.6 : 1,
          resize: autoGrow ? "none" : "vertical", ...style,
          boxShadow: focused ? "var(--focus-ring)" : style?.boxShadow
        }}
      />
      {(error || hint) && <span id={`${inputId}-${error ? "err" : "hint"}`} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: error ? "var(--text-action)" : "var(--text-muted)" }}>{error || hint}</span>}
    </div>
  );
});
