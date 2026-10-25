# @punch-drunk/ui

React components for Punch Drunk internal apps. Published as source with no
build step — `main` and `types` point at `src`, the same convention as
`@punch-drunk/auth`.

```bash
# Install tokens and ui together, in one command
npm install \
  https://github.com/getpunchdrunk/pd-modules/releases/download/tokens-v1.2.0/punch-drunk-tokens-1.2.0.tgz \
  https://github.com/getpunchdrunk/pd-modules/releases/download/ui-v0.3.0/punch-drunk-ui-0.3.0.tgz
```

Packages ship as tarballs attached to the GitHub Release for each tag. npm cannot
install a subfolder of a git repo, so the old `github:getpunchdrunk/pd-modules#tag`
form resolves to the unnamed workspace root and fails. Install both packages in
**one** command: `@punch-drunk/ui` lists `@punch-drunk/tokens` as a peer, and
installed alone npm would look for the tokens package on the public registry.

Requires `@punch-drunk/tokens`. Import its stylesheet once in your CSS entry:

```css
@import "@punch-drunk/tokens/styles.css";
```

`recharts` is a peer dependency, used only by `LineChart`, `BarChart`,
`StackedBarChart` and `DonutChart`; npm installs it automatically. It is not
optional, because the package barrel re-exports the charts, so importing anything
from `@punch-drunk/ui` makes your bundler resolve `recharts`. `ChartFrame` and
`BarCell` are dependency-free.

## What's in it

| Family | Components |
|---|---|
| core | Button, IconButton, Badge, Card |
| forms | Input, Select, Combobox |
| data | Table, FilterBar (+ FilterChip), BulkActionBar, Pagination, StatBlock |
| feedback | Dialog, Toast, EmptyState, Skeleton, SourceStatus, StaleBadge |
| layout | AppShell, Sidebar, NavItem, Topbar, PageHeader |
| charts | ChartFrame (+ ChartLegendItem), LineChart, BarChart, StackedBarChart, DonutChart, BarCell |
| calendar | CalendarMonth, CalendarWeek, CalendarAgenda, CalendarNav, EventChip, DatePicker |
| kanban | KanbanBoard, KanbanColumn, KanbanCard |
| print | PrintDocHeader, PrintPartyBlock, PrintLineTable, PrintTotals, PrintNote, PrintFooter, PrintInvoice |

Each component ships a `.d.ts` props contract and a `.prompt.md` stating the
rules that matter — read the `.prompt.md` before using a component in a new way.

## Rules that will bite you

- **Pink has two values.** `--action-primary` for fills, `--text-action`
  whenever pink is the letterform. The fill value as text fails WCAG AA.
- **Headers carry the blue.** Card headers and column-header rows take
  `--surface-info` with `--text-heading-accent` and `--text-label-accent` on
  them. Data rows never do.
- **Never raw `--pd-navy` or `--pd-sky-deep` as a text colour** — they do not
  flip in dark. Use the accent tokens.
- **Calendar entries use `--event-1…6`**, charts use `--chart-*`, actions use
  pink. Do not cross those three.
- **Tables:** every column holding a control, badge, date or figure needs an
  explicit px width. Only text columns get `flex`.
- **`.pd-stripes`:** set the surface under it with `background-color`, never the
  `background` shorthand, which erases the texture.
