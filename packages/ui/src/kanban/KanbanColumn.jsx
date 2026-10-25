/**
 * One column: a label, a count, and an honest WIP limit. Columns are sunken
 * panels so the cards read as objects sitting in them.
 */
export function KanbanColumn({
  label,
  count,
  wipLimit,
  width = 280,
  maxHeight,
  footer,
  children,
  tone = "default",
  accent
}) {
  const over = wipLimit != null && count > wipLimit;
  const headerBg =
    tone === "attention"
      ? "var(--surface-attention)"
      : accent
        ? "var(--event-" + accent + "-fill)"
        : "var(--surface-page)";
  const bodyBg =
    tone === "attention"
      ? "var(--surface-action-faint)"
      : accent
        ? "var(--event-" + accent + "-wash)"
        : "var(--surface-sunken)";

  return (
    <div
      style={{
        width,
        flex: "0 0 " + width + "px",
        background: bodyBg,
        border: over ? "1px solid var(--border-attention)" : "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          height: 34,
          flex: "0 0 34px",
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          gap: 7,
          borderBottom: "1px solid var(--border-subtle)",
          background: headerBg
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 600,
            color: tone === "attention" ? "var(--text-action)" : accent ? "var(--text-secondary)" : "var(--text-muted)",
            letterSpacing: "var(--tracking-eyebrow)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0
          }}
        >
          {label}
        </span>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
            fontSize: 11,
            fontWeight: over ? 600 : 400,
            color: over ? "var(--text-action)" : "var(--text-muted)",
            flex: "0 0 auto"
          }}
        >
          {count}
          {wipLimit != null ? " / " + wipLimit : ""}
        </span>
      </div>
      <div
        style={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxHeight,
          overflowY: maxHeight ? "auto" : "visible",
          minWidth: 0
        }}
      >
        {children}
      </div>
      {footer && <div style={{ padding: "0 8px 8px 8px" }}>{footer}</div>}
    </div>
  );
}
