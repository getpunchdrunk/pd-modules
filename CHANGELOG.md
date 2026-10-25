# Changelog

All notable changes to `pd-modules` packages are recorded here.

## [@punch-drunk/ui 0.3.0] — 2026-10-25

Shell rewrite. **`Sidebar` and `AppShell` have breaking prop changes** — read
these before upgrading.

- **BREAKING `Sidebar`:** identity moved out of `footer` into its own
  `identity` prop and now renders in the HEAD, under the wordmark. `footer` is
  Settings and similar only. A 0.2.0 caller passing identity as `footer` still
  renders, but in the wrong place.
- **BREAKING `Sidebar`:** the wordmark is now 21px Noto Sans Display 700 under
  the mark (was 12px uppercase with a pink bar) and takes the app's accent.
- **New `Sidebar` props:** `accentHue` (0–360 — the accent input; light and dark
  are both generated from it), `accent` (explicit value, for the two
  grandfathered brand accents only), `identity`, `collapsed`, and the opt-in
  Dashboard chrome slots `search`, `pinned`, `launcher`, `collapsible`.
  **The lean shell is the default:** a sub-app passes none of the four.
- **New components:** `BarChart` and `StackedBarChart` in the `charts` family.
  Both landed after the 0.2.0 bundle was cut, so they appear in no earlier
  entry — `@punch-drunk/ui` now ships **45 components** in nine families.
  `recharts` is used by `LineChart`, `BarChart`, `StackedBarChart` and
  `DonutChart`; `ChartFrame` and `BarCell` remain dependency-free.
- **New export:** `accentFromHue(hue)` → `{ light, dark, vars }`, on the family
  axis. `vars` is the pair of custom properties to inline on the element you
  are colouring; pair it with the `.pd-app-accent` class so the accent resolves
  per theme.
- **`AppShell`:** new `maxWidth` prop, **default 1160**, applied inside the page
  padding. `maxWidth={false}` to opt out. This changes the rendered width of
  every existing screen at viewports above ~1440px — intentionally: it is what
  makes collapsing the sidebar add gutter instead of reflowing tables.
- **Installing changed.** Each release now attaches `npm pack` tarballs to its
  GitHub Release, installed by URL; tokens and ui go in one `npm install`
  command (see the root README). The documented `github:…#tag` form never
  worked for these packages: npm installs the repo root, which is the unnamed
  workspace.
- **`recharts` is a regular peer dependency**, no longer optional. The barrel
  re-exports the charts, so importing anything from the package made the
  bundler resolve `recharts`, and an optional peer is never installed. npm now
  installs it automatically.
- **Peer range:** requires `@punch-drunk/tokens` >= 1.2.0 (the accent family and
  `--content-max` are new in 1.2.0).
- **Types:** `src/index.d.ts` now exists, so `"types"` no longer dangles (it did
  in 0.1.0). `accentFromHue` is declared.
- **Fixed:** a doc comment in `Sidebar.d.ts` contained `--event-*/--tag-*`, whose
  `*/` closed the comment early and broke type-checking for every consumer.
- **Examples:** every `.prompt.md` and `.d.ts` example uses fictional clients and
  people only.
- Removed `src/core/core.card.html`, which referenced a file that never existed.
- **Policy removed from the system.** Staleness thresholds, which writes need
  confirming, which records are foreign, and how many sign-in methods exist are
  now **props with no assumed defaults**. The system supplies the treatments
  (undo toast, confirm dialog, read-only-in-place, stale badge); the consuming app
  supplies the answers. If you relied on `StaleBadge` defaulting to 15 minutes,
  pass it explicitly.

## [@punch-drunk/tokens 1.2.0] — 2026-10-25

- **New family:** `--app-accent-1…6` — per-app wordmark accents, six hues at
  `oklch(0.47 0.095 h)` light / `oklch(0.74 0.105 h)` dark, on the same hues as
  `--event-*` and `--tag-*` so the three families never collide. **An app
  configures a hue, not a colour**; both theme values derive from it, so a custom
  accent cannot break a theme.
- **New tokens:** `--app-accent-brand-pink` / `--app-accent-brand-navy` — the two
  grandfathered brand accents (Audition, Slider). These keep **hand-tuned** dark
  values (`#FF6FA8`, `#8E97E8`); brand chroma sits far above the family axis and
  deriving them would mute the brand. Do not derive brand values.
- **New token:** `--content-max` (1160px) — the content cap `AppShell` applies.
  Chosen so a 1440px window with the sidebar open yields exactly this width.
- **Fixed:** `.dark` now declares `--chart-6`, `--chart-7` and `--chart-8`;
  charts with more than five series truncated their palette in dark.
- **New utility:** `.pd-app-accent` — picks `--app-accent-light` or
  `--app-accent-dark` per theme, so a wordmark accent flips in dark.
- The accent is for the **wordmark only**. Buttons, badges, counts and active nav
  rows stay system pink in every app, so pink still means "this acts" everywhere.

## [@punch-drunk/ui 0.2.0] — never tagged (folded into 0.3.0)

Twenty new components and the first usable barrel.

- **New families:** `layout` (AppShell, Sidebar, NavItem, Topbar, PageHeader),
  `charts` (ChartFrame + ChartLegendItem, LineChart, DonutChart, BarCell),
  `calendar` (CalendarMonth, CalendarWeek — also the day view — CalendarAgenda,
  CalendarNav, EventChip, DatePicker), `kanban` (KanbanBoard, KanbanColumn,
  KanbanCard — the grouping axis is a prop), `print` (PrintDocHeader,
  PrintPartyBlock, PrintLineTable, PrintTotals, PrintNote, PrintFooter,
  PrintInvoice).
- `src/index.js` re-exports all nine families.
- `recharts` added as an **optional** peer dependency (LineChart, DonutChart).
- Every component moved off literal `rgba()`, hex, shadows and radii onto tokens.
- Card headers and column headers now take the sky wash with
  `--text-heading-accent` / `--text-label-accent`.

## [@punch-drunk/tokens 1.1.0] — never tagged (folded into 1.2.0)

- **New file:** `tokens/print.css` — print ink, hairlines, subtotal band and
  page-break rules. Paper is its own surface, not the screen theme on white.
- **New tokens:** `--radius-xs` (2px, hairline bars); `--surface-desk`; the
  ink-on-dark set (`--surface-inverse`, `--text-on-inverse`, `-muted`,
  `-faint`, `--action-on-inverse`) for toasts and undo bars, which sit on
  near-black in both themes; `--text-heading-accent` and `--text-label-accent`
  for header accents that must flip; the `--event-1…6` calendar palette; the
  status tints (`--surface-action-faint/soft/tint` plus navy and sky
  equivalents, `--border-positive-soft`).
- **New utility:** `.pd-skeleton` — a 1.4s opacity pulse, flat under reduced
  motion.
- **Fixed:** `.pd-stripes` dark variant now also matches when the theme class
  sits on the same element as the texture (`.pd-stripes.dark`). The values are
  unchanged and verified identical to FileTransfers, audition and slider.
- **Fixed:** aliases built on channel triplets are re-declared inside `.dark`;
  overriding a triplet alone left them frozen at their light values.

## [@punch-drunk/auth 1.1.0] — 2026-05-31

Security hardening pass. See `SECURITY_REVIEW.md` for the full review. No public
API signatures changed; all changes are backward compatible for single-instance
deployments.

### Security
- Regenerate the session ID in `POST /api/auth/exchange` before storing
  authenticated data, preventing session fixation (F1).
- Derive the OAuth callback URL from the configured `appUrl` instead of the
  client-controlled `Host` header (F3).
- Removed user emails and the session ID from log output (F6).
- Set `X-XSS-Protection` to `0` (the `1; mode=block` value is deprecated and can
  introduce issues in legacy browsers) (F7).

### Added
- `trustProxy` option (default `1`) so the Express `trust proxy` setting can be
  matched to the real deployment topology. A too-high value lets clients spoof
  `X-Forwarded-For`, which the exchange rate limiter keys on (F5).

### Fixed
- Corrected the install command in both READMEs: the org is `getpunchdrunk`, not
  `punch-drunk`.

### Known issues / deferred
- No OAuth `state` / CSRF protection on the callback (F2) — needs a coordinated
  change with the `pd-auth` server so client-supplied `state` is echoed back.
- The one-time `auth_code` is delivered in a URL query string (F4) — consider a
  fragment before any external consumer.
- `pendingAuthTokens` is in-process and won't work across multiple replicas
  (F8) — move to a shared store if a consumer scales horizontally.

## [@punch-drunk/auth 1.0.0] — 2026-02-24

- Initial release: Express middleware for PD Auth integration (auth code
  exchange pattern, Postgres-backed sessions, `requireAuth` / `requireAdmin`,
  rate-limited exchange, security headers).


## [@punch-drunk/ui 0.1.0] — 2026-08-28

First release. React UI primitives styled entirely from `@punch-drunk/tokens`;
ships source with no build step. Requires React >= 18 and the tokens package.

### Added
- Button, IconButton, Badge, Card (core)
- Input, Select, Combobox (forms)
- Table — grid table that owns its own column track math (data)
- Dialog, Toast (feedback)
- A `.d.ts` props contract and `.prompt.md` usage doc per component
- Real Lucide icon geometry in `assets/icons/lucide-paths.json` (29 icons)

### Known gaps
- Layout primitives (AppShell, Sidebar, Topbar, PageHeader, FilterBar,
  Pagination, StatBlock, EmptyState, Skeleton) are specified but not built.
- Charts, calendar, kanban, file drop, comment threads, search-with-results and
  print views are specified but not built.
- Dark mode is fully tokenized but no screen has been designed in it.

## [@punch-drunk/tokens 1.0.0] — 2026-08-28

First release. Reconciles the three shipped apps' divergent token layers
(FileTransfers, Audition, Slider) into one system. CSS shipped as source.

### Added
- Semantic color tokens with light and dark themes, plus shadcn-compatible
  channel triplets so Tailwind v3 apps can adopt before migrating to v4
- Typography tokens: Noto Sans Display headings, Inter UI, Geist Mono data,
  self-hosted as variable fonts; `tabular-nums` on by default
- Spacing, radius (4/6/8), hard-2px shadow system, motion with a
  reduced-motion collapse
- `box-sizing: border-box` reset — without it, bordered and unbordered controls
  of the same declared size measured 3px apart
- The shared `elevate` hover/press utilities and `.pd-stripes` texture, carried
  over from all three apps
- Tailwind v4 `@theme inline` bridge

### Decisions worth noting
- Action color is `#FD0C73`; **pink lettering is `#D40C64`** because the fill
  value measures 3.6:1 on white and fails WCAG AA
- Hard 2px shadows (Audition/Slider) over blurred shadows (FileTransfers)
- Sidebar active state is pink; navy `#313C96` becomes `--status-positive`
