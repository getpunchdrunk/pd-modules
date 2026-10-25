# Known issues

Open issues found while releasing `@punch-drunk/tokens` 1.2.0 and
`@punch-drunk/ui` 0.3.0 (2026-10-25). Deliberately not fixed in that release;
each needs its own change.

## Installing

- **The auth install line does not work.** `packages/auth/README.md` and the root
  README document `npm install github:getpunchdrunk/pd-modules#v1.1.0`. npm
  installs the repo root, which is the unnamed workspace, and fails with "Invalid
  package, must have name and version". tokens and ui moved to GitHub Release
  tarballs; auth has not. Auth is on a deprecation path, so this may never be
  worth fixing — but the documented line should stop claiming to work.
- **The `@punch-drunk` scope is unclaimed on the public npm registry.** If `ui`
  is installed without `tokens` in the same command, npm looks for
  `@punch-drunk/tokens` on the registry. Today that 404s; if anyone else claims
  the scope, it would install their package. Claim the scope (a free npm org) to
  close this.

## Package shape

- **The ui barrel pulls `recharts` into every consumer.** `src/index.js`
  re-exports the charts, so `recharts` is a regular peer even for apps that use no
  chart. A `@punch-drunk/ui/charts` subpath would let it go back to optional.
- **Source ships as `.jsx` with no `"type"` or `"exports"` field.** Works in Vite.
  Untested in other bundlers and in Node directly.

## Tokens

- **Tailwind v4 bridge is partial on purpose.** `--event-*`, `--tag-*` and
  `--app-accent-*` stay unbridged so the four colour families cannot be crossed
  with a one-word utility. Also unbridged for now: the status tints, the
  ink-on-dark set, the spacing scale, `--surface-desk` and `--content-max`. They
  are reachable as `var()`; revisit only if building screens shows friction.

## Verification not yet run

- The adversarial audits in the design bundle's `handoff/PUSH-AND-VERIFY.md`
  (B1: rules audit, B2: docs-vs-code for AppShell, Sidebar, StaleBadge,
  SourceStatus, NavItem) have not been run against this release.

## Design-project items (outside this repo)

- Re-run the Dark Mode Audit now that `--chart-6/7/8` have dark values.
- Re-check the Example Foundations chart-ramp caption in dark.
- The Sidebar Shell Prototype still shows an avatar in the topbar on collapse,
  which pd-dashboard D047 rules out. The shipped `Sidebar` already follows D047.
- Stale tag examples in the bundle's `readme.md` (around lines 397-399) and
  `HANDOFF.md`.

## Consumers

- **Slider's primary button is navy.** Under the accent rule an app's colour
  belongs to its wordmark only and every action stays system pink. This is the one
  real migration the rule creates.
- **Breaking in ui 0.3.0:** `Sidebar` identity moved from `footer` to `identity`
  (a 0.1.0 caller still renders, in the wrong place), `AppShell` caps content at
  1160px by default, and `StaleBadge` has no default threshold. Check every call
  site when upgrading.
