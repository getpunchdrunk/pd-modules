# @punch-drunk/ui

React UI primitives for Punch Drunk internal apps. Ships source, no build step —
consuming apps compile it through their own Vite pipeline, the same contract as
`@punch-drunk/auth`.

**Status: 0.1.0, ten primitives.** The layout and complex families are specified
but not built (see "Not built yet").

## Install

```bash
npm install github:getpunchdrunk/pd-modules#ui-v0.1.0
```

This package styles itself entirely from CSS custom properties, so
`@punch-drunk/tokens` must be installed and imported too — nothing renders
correctly without it.

```jsx
import { Button, Card, Table, Badge } from "@punch-drunk/ui";
```

## What's here

| Component | Use for |
|---|---|
| `Button` | Every clickable action. Primary / secondary / ghost / danger, three sizes |
| `IconButton` | A single unambiguous icon action; `label` is required |
| `Badge` | Status pills and count badges — five tones |
| `Card` | The only container. Title, eyebrow, meta, actions |
| `Table` | Dense grid table that owns its own column math |
| `Input` | Text, currency, date; hint and error states |
| `Select` | Native select with our chrome, for 2–8 fixed options |
| `Combobox` | Searchable single/multi select for long lists; fully controlled |
| `Dialog` | Modal confirm for money and client-facing actions |
| `Toast` | Transient confirmation, usually carrying an 8-second undo |

Every component has a sibling `.d.ts` with its props contract and a
`.prompt.md` with usage rules and the reasoning behind them. **Read the
`.prompt.md` before using a component** — they carry the rules that stop known
failures repeating.

## The two rules that break things most often

**Table columns.** Any column holding a control, badge, date or figure gets an
explicit `width` in px; only genuine text columns get `flex`. A wide child in a
`1fr` track wins on min-content, steals width from the name columns, and the
header — which has no control — resolves differently from the body. Before
shipping a table: add the fixed widths, subtract from the card width, and check
what's left for the text columns. Under ~150px for a name column means two-line
rows.

**Confirm vs undo.** Money and client-facing actions confirm in a `Dialog`;
reversible ones fire optimistically with a `Toast` carrying undo. A cross-app
write that fails *after* an optimistic success must revert the row and raise a
persistent inline error — never a toast that may already have gone.

## Conventions

- **Inline styles reading CSS custom properties.** No CSS-in-JS, no stylesheets,
  no class names except the shared `hover-elevate` / `active-elevate-2` /
  `toggle-elevate` utilities from `@punch-drunk/tokens`.
- **No npm dependencies.** React only.
- **Sizes are outer sizes.** `tokens/base.css` sets `box-sizing: border-box`
  globally; a bordered control and an unbordered one at the same declared size
  must measure identically.
- **Icons** come from `assets/icons/lucide-paths.json` (real Lucide geometry) at
  `stroke-width="2"` with round caps and joins. Never redraw a glyph; never
  change stroke weight to fit a layout.

## Not built yet

Layout: AppShell, Sidebar, NavItem, Topbar, PageHeader, FilterBar,
BulkActionBar, Pagination, StatBlock, EmptyState, Skeleton, SourceStatus,
StaleBadge.

Families: Charts (Recharts wrappers on the brand ramp), Calendar and date
picker, Kanban, file drop with previews, comment threads, search with results,
print views.

## Versioning

Per-package tags: `ui-vMAJOR.MINOR.PATCH`, independent of `tokens-*` and
`v*` (auth). Major for any change to a component's public props.
