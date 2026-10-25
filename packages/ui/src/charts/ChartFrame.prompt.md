`ChartFrame` is the only chart chrome. A chart never draws its own title, legend or border.

```jsx
<ChartFrame title="Budget burn" height={220}
  meta={<StaleBadge level="stale" at="18 min" size="sm" />}
  legend={<>
    <ChartLegendItem label="Spent" value="$149,000" />
    <ChartLegendItem label="Even burn" dashed color="var(--text-muted)" />
  </>}>
  <LineChart … />
</ChartFrame>
```

Rules that matter:

- **Legend above the plot, always.** No legend inside the plotting area, no legend that requires hovering to read.
- **Every figure in the legend is mono and pre-formatted.** The chart does not format currency for you.
- **A chart of money shows its freshness.** Pass a `StaleBadge` in `meta`; a stale line graph is more misleading than a stale number because the shape looks authoritative.
- `footnote` is where you say what is excluded ("excludes unbilled time"). It is not a caption restating the title.
- One chart per card. Two charts in one card means two questions, and nobody knows which one the title answers.
