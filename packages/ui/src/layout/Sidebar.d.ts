import type { ReactNode } from "react";

/**
 * Mark + wordmark + identity head, nav, Settings foot. Fills the AppShell's
 * 232px track.
 *
 * THE LEAN SHELL IS THE DEFAULT. A sub-app passes logo, appName, accentHue,
 * identity, nav children and footer — nothing else. Dashboard additionally
 * passes search, pinned, launcher and collapsible. An external page passes no
 * Sidebar at all.
 *
 * `accentFromHue(hue)` is exported alongside: hue -> { light, dark, vars }, on
 * the family axis. Spread `vars` onto the element and give it the
 * `.pd-app-accent` class; that is what makes the accent flip in dark.
 *
 * @startingPoint section="Layout" subtitle="Mark and identity chip in the head, nav items, Settings at the foot" viewport="300x520"
 */
export interface SidebarProps {
  /** The mark, as an <img>. A SLOT, not a hardcoded path: SlideTrack goes
   *  multi-tenant and Scratchpad becomes Blinkshare.io, and both leave the Punch
   *  Drunk mark behind. Never re-drawn in code. */
  logo?: ReactNode;
  /** The product's own name, under the mark (Noto Sans Display 21/700, 8px gap —
   *  treatment 9, adopted 08/30/2026).
   *  SET IT for a named sub-app — Audition, Slider, Mailroom, SlideTrack,
   *  Scratchpad. LEAVE IT UNSET for Dashboard, which has no product name to show.
   *  Reinforcement only; the browser title and launcher strip are the real signal,
   *  because this label disappears when the sidebar collapses. Adopted 08/30/2026. */
  appName?: string;
  /** The app's accent HUE (0–360), used by the WORDMARK ONLY. The component
   *  generates both theme values from it — oklch(0.47 0.095 h) light,
   *  oklch(0.74 0.105 h) dark — so a custom accent cannot break either theme.
   *  Both are inlined on the wordmark as --app-accent-light/-dark and picked
   *  per theme by `.pd-app-accent`; neither value is baked in at render.
   *  Prefer one of the six presets; any hue between them is legal. */
  accentHue?: number;
  /** The app's accent as an explicit value, used by the WORDMARK ONLY.
   *  PASS A TOKEN REFERENCE, not a literal — `var(--app-accent-brand-pink)` or
   *  `var(--app-accent-brand-navy)`. Those tokens carry their own hand-tuned
   *  dark values, so the reference flips; a raw hex here will sit at its light
   *  value in both themes.
   *  Only for the two grandfathered brand accents, which keep hand-tuned dark
   *  values because their chroma sits far above the family axis. New apps use
   *  `accentHue`. One of `--app-accent-1…6`
   *  (six hues at oklch(0.47 0.095 h), shared with the --event-* and --tag-* families), or the
   *  grandfathered brand values for Audition (pink) and Slider (navy). Never a
   *  free colour, and never applied to a button, badge, count or active nav row —
   *  pink stays the only colour that means "this acts", in every app. Prefer a
   *  family value for a new app: a pink wordmark reads as a button.
   *
   *  A custom value outside the family IS permitted — Jacob picks these himself.
   *  Keep it on the axis (L 0.47 / C 0.095 light, L 0.74 / C 0.105 dark) and above
   *  4.5:1 on --surface-sidebar, or it reads as a different weight beside the
   *  other apps. */
  accent?: string;
  /** Dashboard-only chrome, passed in rather than flagged on: the ⌘K search
   *  affordance, the pinned section with folders, and the launcher strip. A
   *  sub-app passes none of these — the lean sidebar is the default. */
  search?: ReactNode;
  pinned?: ReactNode;
  launcher?: ReactNode;
  /** Collapse + edge-peek. Dashboard only; a sub-app sidebar is fixed. */
  collapsible?: boolean;
  /** NavItem children. */
  children?: ReactNode;
  /** The workspace/person chip. Lives in the HEAD, under the wordmark — not the
   *  foot. It STAYS in the head when `collapsed`, centered at collapsed
   *  density; it does NOT move to the topbar, which carries no identity
   *  affordance in any sidebar state (pd-dashboard D047, 08/30/2026).
   *  Identity is one hover-peek away. The External tier — no Sidebar at all,
   *  identity top-right — is a different shell, not this prop. */
  identity?: ReactNode;
  /** Settings and anything else that belongs at the very bottom, above a rule.
   *  Identity is NOT here — see `identity`. */
  footer?: ReactNode;
  /** Rendered by Sidebar as the collapsed state; Dashboard only. */
  collapsed?: boolean;
}

export function Sidebar(props: SidebarProps): JSX.Element;

/** The two theme values for a hue, plus the custom-property pair to inline on
 *  the element being coloured. */
export interface AppAccent {
  /** oklch(0.47 0.095 h) — the light-theme value. */
  light: string;
  /** oklch(0.74 0.105 h) — the dark-theme value. */
  dark: string;
  /** Spread onto the element's `style`; pair with the `.pd-app-accent` class,
   *  which reads one or the other per theme. Both must land on the element
   *  itself — a custom property substitutes where it is DECLARED. */
  vars: { "--app-accent-light": string; "--app-accent-dark": string };
}

/** Hue (0–360) -> both theme values on the family axis. An app configures a
 *  HUE, never a colour, so a custom accent cannot break either theme. */
export function accentFromHue(hue: number): AppAccent;
