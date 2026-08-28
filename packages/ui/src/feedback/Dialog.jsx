export function Dialog({
  open = true,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  tone = "default",
  busy = false,
  width = 420
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(33, 33, 33, 0.32)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        style={{
          width,
          maxWidth: "calc(100% - 32px)",
          background: "var(--surface-card)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-overlay)",
          overflow: "hidden"
        }}
      >
        <div style={{ padding: "16px 18px 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {title && (
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "var(--tracking-heading-sm)"
              }}
            >
              {title}
            </span>
          )}
          {description && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.55 }}>
              {description}
            </span>
          )}
        </div>
        {children && <div style={{ padding: "12px 18px 0 18px" }}>{children}</div>}
        <div
          style={{
            padding: "16px 18px",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className="hover-elevate active-elevate-2"
            style={{
              height: 34,
              padding: "0 13px",
              background: "var(--surface-card)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              fontWeight: 500,
              color: "var(--text-secondary)",
              cursor: "pointer"
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={busy ? "" : "hover-elevate active-elevate-2"}
            style={{
              height: 34,
              padding: "0 13px",
              background: tone === "danger" ? "var(--surface-attention)" : "var(--action-primary)",
              border: "1px solid " + (tone === "danger" ? "var(--border-attention)" : "transparent"),
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              fontWeight: 600,
              color: tone === "danger" ? "var(--text-action)" : "var(--action-primary-text)",
              cursor: busy ? "wait" : "pointer",
              opacity: busy ? 0.7 : 1
            }}
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
