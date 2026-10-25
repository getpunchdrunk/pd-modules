`KanbanBoard` is axis-agnostic. The screen decides what the columns mean.

```jsx
<KanbanBoard columns={columnsFor(groupBy)} columnMaxHeight={520}
  renderCard={(item) => <KanbanCard key={item.id} {...item} />} />
```

Rules that matter:

- **Columns are data.** Tasks by status, projects by stage, invoices by approval step, crew by availability — one component, one axis prop. A screen that hardcodes its columns cannot be regrouped, and every board here is regrouped eventually.
- **Put the axis in a `Select` labelled "Group by" in the `FilterBar`**, so the user can see and change what they are looking at.
- **Six columns is the practical ceiling** at 280px. Beyond that use 240px, and beyond eight use the list page — a board you scroll horizontally to read is a worse table.
- **Two axes maximum.** Columns plus swimlanes. A third grouping is a pivot table, not a board.
- **Set `columnMaxHeight`.** Columns scroll; the page does not.
- **Accent the columns along the axis** (`accent: 1…6` left to right) so the board is not five identical grey headers — and then leave the cards' source edges off. One colour job per board.
- **Only offer drag where the write is real.** Synced records are read-only, and a board full of undraggable cards should be a list page instead.
