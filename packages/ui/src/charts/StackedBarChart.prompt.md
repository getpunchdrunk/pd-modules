`StackedBarChart` answers "what is this total made of, across several things" — cost mix per project, hours by department per week.

```jsx
<ChartFrame title="Cost mix by project" height={240} footnote="Share of each project's approved budget. Totals in the table below.">
  <StackedBarChart data={projects} categoryKey="project" orientation="horizontal" mode="share"
    series={[
      { key: "crew",   label: "Crew" },
      { key: "gear",   label: "Gear" },
      { key: "post",   label: "Post" },
      { key: "travel", label: "Travel" }
    ]} />
</ChartFrame>
```

Rules that matter:

- **Four segments plus a real "Other".** Past five the bottom slices are noise; roll them up honestly rather than shipping a stripe nobody can hit.
- **Segment order is fixed across every bar**, largest-first overall. Re-sorting per bar makes the stack unreadable across categories.
- **Only the outer segment gets the 2px radius.** Interior joins are square or the stack looks like separate bars.
- `mode="share"` normalises every bar to 100% — then the **real total must appear** in the frame (footnote, legend value, or the table beneath it). Percentages with no denominator are decoration.
- **Never stack a signed series.** A negative segment renders as an overlap and reads as a bug. Grouped `BarChart` handles anything that can go below zero.
- Segments come off the ramp starting at `--chart-2`, in series order. **Pink is not in the rotation** — a stacked segment is composition, not an action, and there is no such thing as one segment you click.
- Legend carries the segment names, so the plot needs no in-bar labels. A number inside a 14px segment is unreadable at any density we ship.
- Same zero-baseline, mono-tick, no-load-animation rules as `BarChart`.
