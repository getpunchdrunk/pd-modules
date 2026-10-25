`BarCell` goes in a `Table` column via `render`, when "how much of the budget is gone" matters as much as the figure.

```jsx
{ key: "spent", label: "Spent", width: 148, align: "right",
  render: (r) => <BarCell value={r.spent} max={r.budget} label={fmt(r.spent)} showPercent /> }
```

Rules that matter:

- **The column keeps an explicit px width** — 140–160px. A bar in a flexible track re-proportions the text columns, which is the failure this system has hit four times.
- **4px bar, 2px gap, pill radius, `--surface-hover` trough.** It sits under the figure inside the same cell, and the whole cell measures 38.5px so it fits the 40px row without adding a density step — the column still sorts on the real number. Loosen the gap and you have invented a fourth row height.
- **Pink at the threshold, and pink means act.** Default 90%; pass `tone` when the app has a better rule. Do not colour every bar.
- The figure is the primary content and stays mono, tabular, right-aligned. The bar is the annotation, not the value.
- **One bar column per table.** Two make the table a chart, badly.
