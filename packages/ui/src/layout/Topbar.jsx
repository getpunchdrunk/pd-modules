/**
 * 48px context strip: where you are on the left, state on the right — and the
 * identity chip ONLY on sidebar-less (External tier) screens. A sidebar screen
 * keeps identity in the sidebar head in every state, collapsed included
 * (pd-dashboard D047). Not a toolbar — page actions belong to PageHeader.
 */
export function Topbar({ icon, label, children, sticky = true }) {
  return (
    <div
      style={{
        height: "var(--topbar-height)",
        flex: "0 0 var(--topbar-height)",
        position: sticky ? "sticky" : "static",
        top: 0,
        zIndex: 20,
        borderBottom: "1px solid var(--border-default)",
        background: "var(--surface-page)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "0 20px",
        minWidth: 0
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {icon && (
          <span style={{ display: "flex", flex: "0 0 16px", color: "var(--text-muted)" }} aria-hidden="true">
            {icon}
          </span>
        )}
        {label && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13.5,
              fontWeight: 500,
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>{children}</div>
    </div>
  );
}
