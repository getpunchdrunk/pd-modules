`LineChart` answers "how is this going over time" — budget burn, hours logged, transfers per week.

```jsx
<ChartFrame title="Budget burn" height={220}>
  <LineChart data={weeks} xKey="week" area
    series={[{ key: "spent", label: "Spent" }]}
    reference={{ segment: [{ x: "W1", y: 0 }, { x: "W12", y: 184000 }], label: "Even burn" }}
    yTickFormatter={(v) => "$" + (v / 1000) + "k"} />
</ChartFrame>
```

Rules that matter:

- **Sky is the default series. Pink is not a colour choice** — use `hsl(var(--chart-1))` only for the series that means someone must act (over budget, overdue), and then only one.
- **Three series maximum.** A fourth line is a table.
- **Horizontal gridlines only**, `--border-subtle`, no vertical grid, no dots on the line. Dots return on hover via `activeDot`.
- Axis ticks are **mono** so the numbers do not jitter as data updates, and the Y axis starts at zero for anything cumulative.
- A **reference line is dashed and labelled** — an unlabelled dashed line is a puzzle.
- Never animate the line in on load. It reads as data changing when nothing changed.
