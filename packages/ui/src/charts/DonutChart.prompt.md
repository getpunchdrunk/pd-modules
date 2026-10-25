`DonutChart` is for parts of one whole — spend by category, storage by app. If the parts do not sum to a meaningful total, use bars.

```jsx
<ChartFrame title="Spend by category" height={200}
  legend={categories.map(c => <ChartLegendItem key={c.name} label={c.name} value={c.pct} color={c.color} />)}>
  <DonutChart data={categories} total="$121,450" totalLabel="Spent to date" />
</ChartFrame>
```

Rules that matter:

- **Five slices maximum, ordered largest first.** Group the tail into a real "Other" on `--chart-6` grey rather than showing eight 3% slivers.
- **No labels or percentages on the arcs.** The legend carries the names and figures; arc labels collide at exactly the sizes we use.
- **The total goes in the hole** — mono, 19px, with an uppercase label. That number is why the chart is there.
- **Never a pie.** The hole is what makes the total readable, and a full pie invites arc-area comparison, which nobody does accurately.
- No entry animation. A donut that spins up on load reads as a loading state.
