export function Toast({
  message,
  detail,
  tone = "default",
  onUndo,
  undoLabel = "Undo",
  secondsLeft,
  onDismiss,
  width = 520
}) {
  const dark = tone !== "attention";

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        width,
        maxWidth: "calc(100% - 32px)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        background: dark ? "var(--pd-ink)" : "var(--surface-attention)",
        border: dark ? "1px solid transparent" : "1px solid var(--border-attention)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-overlay)"
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
        style={{ stroke: dark ? "#FFFFFF" : "var(--text-action)", flex: "0 0 16px" }}>
        {tone === "attention" ? <path d="M12 8v5M12 16.5v.5M12 3l9 17H3z" /> : <path d="M20 6L9 17l-5-5" />}
      </svg>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12.5,
          color: dark ? "#FFFFFF" : "var(--text-primary)",
          flex: 1,
          minWidth: 0
        }}
      >
        {message}
        {detail && (
          <span style={{ color: dark ? "#D4D4D4" : "var(--text-muted)" }}> — {detail}</span>
        )}
      </span>
      {typeof secondsLeft === "number" && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 11,
            color: dark ? "#9A9A9A" : "var(--text-muted)",
            flex: "0 0 auto"
          }}
        >
          {secondsLeft}s
        </span>
      )}
      {onUndo && (
        <button
          type="button"
          onClick={onUndo}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 600,
            color: dark ? "#FF6FA8" : "var(--text-action)",
            flex: "0 0 auto"
          }}
        >
          {undoLabel}
        </button>
      )}
      {onDismiss && !onUndo && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
            color: dark ? "#9A9A9A" : "var(--text-muted)",
            flex: "0 0 auto"
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
