`Sidebar` is the only navigation surface. 232px, `--surface-sidebar`, one rule on the right.

```jsx
<Sidebar logo={<img src="/punch-drunk-logo.png" alt="Punch Drunk" width={63} height={28} />}
         footer={<IdentityChip user={user} />}>
  <NavItem icon={dashboardIcon} label="Dashboard" active />
  <NavItem icon={briefcaseIcon} label="Client projects" count={12} />
</Sidebar>
```

Rules that matter:

- **The lean shell is the default.** A sidebar is a mark, a wordmark, an identity chip, nav, and Settings. Launcher strip, ⌘K, pinned folders and collapse/peek are Dashboard-only, and they arrive as children — never as flags that default on. Five-plus sub-apps against one Dashboard: if the default is heavy, every new app starts by switching things off and one of them forgets.
- **`logo` is a slot, never a hardcoded path.** SlideTrack spins off to multi-tenant and Scratchpad becomes Blinkshare.io; both leave the Punch Drunk mark behind.
- **Order is fixed:** mark + wordmark + identity chip in the head, nav, spacer, Settings at the foot.
- **Collapsing does not move identity.** It stays in the head, centered at collapsed density — there is no topbar avatar variant, and the topbar carries no identity affordance in any sidebar state (pd-dashboard **D047**, 08/30/2026). Collapse is a focused mode and identity is one hover-peek away. Top-right identity belongs only to the External tier, which has no Sidebar at all.
- **Named sub-apps set `appName`; Dashboard does not.** Audition, Slider, Mailroom, SlideTrack and Scratchpad are products with their own names, so the head names them — Noto Sans Display, 14px/700, under the mark, 7px gap. Dashboard has no product name to show: its sections are nav categories, and a wordmark there would label the mark with the mark.
- The wordmark is **reinforcement, not the signal.** A head label vanishes on collapse, so the browser title and the launcher strip's active state carry app identity. Section is carried by the nav highlight, page title and breadcrumb — already three signals; the wordmark is not a fourth.
- **A custom accent is a HUE, not a colour.** Any hue 0–360 is available beyond the six presets; the system fixes L and C and generates both theme values. Never expose a hex or a free colour picker for this — a hand-picked hex can vanish on dark (Slider's shipped navy is 2.0:1 on the dark sidebar), and a hue cannot.
- **Dark accents are derived, not authored.** The only exception is the two grandfathered brand accents, whose chroma sits far above the axis; they keep hand-tuned dark values. Do not derive `--text-action`'s dark value — the derivation runs 57% of its chroma.
- **The wordmark carries the app's accent; nothing else does.** Each named sub-app picks one `--app-accent-1…6` at deploy time. Buttons, badges, counts and active nav rows stay system pink in every app — colour differentiates identity, function stays monochrome. A pink wordmark is legal (Audition ships it) but discouraged for new apps, because it sits in the one colour that elsewhere means "this acts".
- Wordmark scale is **21px Noto Sans Display 700**, 8px under the mark. "Scratchpad" and "SlideTrack" fit the 232px track; past roughly 12 characters, check it.
- One shared typographic treatment. **No per-app lockups. No per-app action colour.**
- Nav is **identical for all staff** so people can see what exists and ask for access. Hide items only for genuinely shorter roles (freelancers), and hide the whole item — never disable it.
- **No section headers** until there are more than eight items. Below that they add furniture and remove nothing.
- Nav never scrolls independently. If it would, the app has too much nav.

- **Do not pass `appName`.** It printed &ldquo;DASHBOARD&rdquo; under the logo on every
  screen and named the app to nobody who needed telling. Removed from all screens
  08/29/2026; the prop survives only for an app that genuinely ships two shells.

## Rolled up 08/30/2026

`Sidebar.jsx` and `AppShell.jsx` now match this file. What changed:

- Identity moved from the **foot** to the **head**, under the wordmark, as its own
  `identity` prop. `footer` is Settings only.
- The head renders mark (63×28) + wordmark (21px Noto Sans Display 700, 8px gap)
  in the app's accent.
- `accentHue` is the accent input; `accentFromHue(hue)` is exported from
  `Sidebar.jsx` and returns `{ light, dark, vars }` on the family axis. `accent`
  remains for the two grandfathered brand values only — **pass it as
  `var(--app-accent-brand-pink)` / `-navy`, never a literal**, because those
  tokens carry the hand-tuned dark values.
- **The accent flips via `.pd-app-accent`, not via the returned value.** The
  wordmark gets both values inlined as `--app-accent-light` / `--app-accent-dark`
  and the class picks one per theme. Do not read `.light` and set it as a colour
  yourself — that is what froze the wordmark on its light value before
  08/30/2026. A custom property substitutes where it is *declared*, so both
  values have to reach the element.
- `search`, `pinned`, `launcher` and `collapsible` are **opt-in slots**, not
  defaults. A sub-app passes none.
- `AppShell` caps content at **1160px** via `maxWidth`, inside the padding, so
  collapsing the sidebar adds gutter instead of reflowing tables. `maxWidth={false}`
  for a genuinely edge-to-edge surface.
