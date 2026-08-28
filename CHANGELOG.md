# Changelog

All notable changes to `pd-modules` packages are recorded here.

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
