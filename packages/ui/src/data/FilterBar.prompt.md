`FilterBar` sits between `PageHeader` and the table, outside the table card.

```jsx
<FilterBar
  search={<Input icon={searchIcon} placeholder="Search projects, clients, POs…" width={260} />}
  filters={[<Select key="c" label="All clients" />, <Select key="s" label="Any stage" />]}
  chips={[<FilterChip key="u" label="Unbilled" count={6} />, <FilterChip key="o" label="Over 80% spent" count={2} active />]}
  meta={<>Showing <b>10</b> of <b>42</b></>}
/>
```

Rules that matter:

- **Chips are navy when active, never pink.** Pink means "you can act on this"; a filter changes what you are looking at.
- The count is the last thing on the line, right-aligned, figures in mono. It updates as filters change — a stale count is worse than none.
- **Wraps, never scrolls horizontally.** If the bar wraps to three lines, the page has too many filters and needs a "More filters" dialog.
- Order: search, then the filters people use most. Do not alphabetize.
- Selecting rows replaces nothing here — `BulkActionBar` appears inside the table card, and the filter bar stays put.
