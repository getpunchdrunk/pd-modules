`Table` is the workhorse. Use it for every tabular list; never hand-roll a grid of spans.

```jsx
const columns = [
  { key: "project", label: "Project", flex: 2, strong: true },
  { key: "client", label: "Client", flex: 1.35 },
  { key: "remaining", label: "Remaining", width: 104, align: "right", strong: true },
  { key: "stage", label: "Stage", width: 92, align: "right", render: (r) => <Badge tone={r.tone}>{r.stage}</Badge> }
];

<Card title="Active projects" padded={false}>
  <Table columns={columns} rows={rows} />
</Card>
```

**The column rule that keeps this from breaking.** Any column holding a button, a badge, a date, or a currency figure gets an explicit `width` in px. Only genuine text columns get `flex`. This has broken three times in review: a 153px-wide button pair inside a `1fr` track wins on min-content, steals width from the name columns, and the header — which has no button — resolves to different widths than the body. Fixed `width` on control columns is what prevents it, and the component renders header and rows from a single template so they cannot drift.

**Sizing sanity check before you ship a table.** Add up the fixed widths. Subtract from the card's real width. What's left is split between the flex columns — if a name column lands under about 150px, your rows will wrap to two lines and blow past the 40px row height. Widen the card or drop a column; do not shrink the font.

- `truncate: true` for filenames and long names — single line, ellipsis, full string in a tooltip. Filenames should also be middle-truncated by the caller, since both ends of a filename carry meaning.
- `align: "right"` on every number. It implies mono + tabular figures, so columns align digit-for-digit.
- Put `strong: true` on the one column that identifies the row, and at most one other.
- `emptyMessage` states what would be here and the action that fills it: "No transfers yet. Upload files to send a link."
