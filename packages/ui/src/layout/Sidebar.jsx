/**
 * Mark + product wordmark + identity chip in the head, nav, Settings at the foot.
 *
 * Three shell tiers (adopted 08/30/2026, see readme.md):
 *   - Sub-app internal (DEFAULT): mark, wordmark, identity, nav, Settings.
 *   - Dashboard: passes search / pinned / launcher / collapsible in addition.
 *   - External: no Sidebar at all — AppShell gets no `sidebar`.
 *
 * The lean shell is the default on purpose: five-plus sub-apps against one
 * Dashboard, so if the heavy chrome defaulted on, every new app would start by
 * switching things off and one would forget.
 */

/** Hue -> the two theme values, on the family axis. An app configures a HUE,
 *  never a colour, so a custom accent cannot break either theme. Matches
 *  --app-accent-1…6 in tokens/colors.css.
 *
 *  `vars` is the pair to inline on the element being coloured; the
 *  `.pd-app-accent` class in tokens/colors.css picks one per theme. Both values
 *  must reach the element itself — a custom property substitutes where it is
 *  DECLARED, so a single --app-accent-resolved declared on :root/.dark can
 *  never see a light/dark pair set down here. That is the same trap that once
 *  froze every triplet-derived alias at its light value. */
export function accentFromHue(hue) {
  const h = Math.round(((hue % 360) + 360) % 360);
  const light = `oklch(0.47 0.095 ${h})`;
  const dark = `oklch(0.74 0.105 ${h})`;
  return {
    light,
    dark,
    vars: { "--app-accent-light": light, "--app-accent-dark": dark }
  };
}

export function Sidebar({
  logo,
  appName,
  accentHue,
  accent,
  identity,
  children,
  footer,
  search,
  pinned,
  launcher,
  collapsible = false,
  collapsed = false
}) {
  /* An explicit `accent` is only for the two grandfathered brand values, which
     keep hand-tuned dark values because their chroma sits far above the axis.
     Pass it as a TOKEN REFERENCE — var(--app-accent-brand-pink) or -navy —
     which already flips in .dark; both slots take it and colors.css supplies
     the two values. A raw colour here will not flip, by the caller's choice.
     Everything else derives from a hue. */
  const accentVars =
    accent != null
      ? { "--app-accent-light": accent, "--app-accent-dark": accent }
      : accentHue != null
        ? accentFromHue(accentHue).vars
        : {
            "--app-accent-light": "var(--text-primary)",
            "--app-accent-dark": "var(--text-primary)"
          };

  const showHead = logo || appName || identity;

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-sidebar)",
        borderRight: "1px solid var(--border-default)"
      }}
    >
      {launcher}

      {showHead && (
        <div
          style={{
            padding: collapsed ? "18px 0 14px 0" : "18px 16px 14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 15,
            alignItems: collapsed ? "center" : "stretch",
            borderBottom: "1px solid var(--border-subtle)",
            minWidth: 0
          }}
        >
          {!collapsed && (logo || appName) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              {logo}
              {appName && (
                <span
                  className="pd-app-accent"
                  style={{
                    ...accentVars,
                    fontFamily: "var(--font-heading)",
                    fontSize: 21,
                    fontWeight: 700,
                    lineHeight: "var(--leading-tight)",
                    letterSpacing: "var(--tracking-heading)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0
                  }}
                >
                  {appName}
                </span>
              )}
            </div>
          )}
          {identity}
        </div>
      )}

      {search && !collapsed && (
        <div style={{ padding: "10px 12px 4px 12px", minWidth: 0 }}>{search}</div>
      )}

      <nav
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0
        }}
      >
        {children}
        {pinned}
      </nav>

      {footer && (
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            padding: "9px 10px 12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
