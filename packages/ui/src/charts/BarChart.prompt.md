`BarChart` answers "how do these compare" — billed by month, hours by crew member, spend by vendor.

```jsx
<ChartFrame title="Billed by month" height={220}
  legend={<><ChartLegendItem label="Billed" value="$1.24M" /><ChartLegendItem label="Target" dashed color="var(--text-muted)" /></>}>
  <BarChart data={months} categoryKey="month"
    series={[{ key: "billed", label: "Billed" }]}
    attention={(row) => row.billed < row.target}
    reference={{ value: 112000, label: "Monthly target" }}
    valueTickFormatter={(v) => "$" + v / 1000 + "k"} />
</ChartFrame>
```

Rules that matter:

- **Orientation follows the category, not the taste.** Time (months, weeks, quarters) goes `vertical`. Named things — client, crew member, vendor, project — go `horizontal`, because a name cannot be read rotated and truncating it defeats the chart.
- **Three series maximum grouped.** A fourth is a table. If the series sum to a whole, it is a `StackedBarChart`, not a group.
- **Sky is the default.** `attention` is the only way a bar goes pink, it takes one rule, and the rule belongs in the footnote so the colour is explained.
- **Bars are 2px radius on the growing end only** (`--radius-xs`) — a pill bar reads as a progress track, which is `BarCell`'s job.
- Value axis starts at zero, always. A truncated bar axis lies, and unlike a line chart there is no honest reason to crop it.
- Gridlines run across the value axis only, `--border-subtle`. The category axis keeps its 1px line; the value axis drops it.
- Ticks are **mono**, category labels on a horizontal chart are **sans** at 11.5px — they are language, not figures.
- **Never animate bars in on load** (`isAnimationActive={false}`). Growing bars read as data changing.
- Past about twelve categories, sort descending and cut to a top ten with an "all others" row, or use the list page. A bar chart is not a scroll.
