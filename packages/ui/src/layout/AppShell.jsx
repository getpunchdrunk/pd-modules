/**
 * The page frame every screen sits in: a fixed sidebar track, then a single
 * scrolling column with the topbar pinned above it. Owns no chrome of its own
 * — Sidebar and Topbar bring their own borders — so this file is only geometry.
 *
 * Content is capped at 1160px in all three shell tiers, so collapsing the
 * sidebar adds gutter instead of reflowing tables.
 */
export function AppShell({
  sidebar,
  topbar,
  children,
  maxWidth = 1160,
  width = "100%",
  minHeight = "100vh",
  padded = true,
  gap = 16,
  scroll = true
}) {
  return (
    <div
      style={{
        display: "flex",
        width,
        minHeight,
        background: "var(--surface-page)",
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)"
      }}
    >
      {sidebar && (
        <div
          style={{
            width: "var(--sidebar-width)",
            flex: "0 0 var(--sidebar-width)",
            minWidth: 0,
            display: "flex"
          }}
        >
          {sidebar}
        </div>
      )}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          background: "var(--surface-sunken)"
        }}
      >
        {topbar}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            overflowY: scroll ? "auto" : "visible",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: padded ? "22px var(--page-padding) 26px var(--page-padding)" : 0
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: maxWidth === false ? "none" : maxWidth,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
