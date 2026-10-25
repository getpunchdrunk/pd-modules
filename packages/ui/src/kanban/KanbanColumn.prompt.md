`KanbanColumn` is a sunken panel so the cards read as objects in it, not as a striped list.

```jsx
<KanbanColumn label="In review" count={6} wipLimit={4} maxHeight={520}
  footer={<Button variant="ghost" size="sm" fullWidth>Add task</Button>}>
  {items.map(i => <KanbanCard key={i.id} {...i} />)}
</KanbanColumn>
```

Rules that matter:

- **The count is always visible, in mono.** With a `wipLimit` it reads "6 / 4" and turns pink over the limit, along with the column border — a WIP limit nobody can see is not a limit.
- **34px header, uppercase 11px label.** The column name is the value on the board's axis; it never repeats inside the cards.
- **`accent` colours the whole column** from the event palette, assigned along the axis left to right, so a board has rhythm instead of five identical grey headers. Two steps: `-fill` on the 34px header, `-wash` (one step lighter) on the body — the header still reads as a header, and the white cards still sit on top of the column rather than in it. Never put `-fill` on the body; at full column height it swamps the cards.
- **One colour job per board.** If the columns are accented, drop the cards' `source.palette` top edge; if the cards mark their source, leave the columns neutral. The same palette doing two jobs in one view means neither is legible.
- **`tone="attention"` always wins over `accent`.** The problem column is pink no matter what hue it would otherwise have had.
- **Set `maxHeight` so the column scrolls, not the page.** A board that grows to 4,000px tall cannot be compared across columns, which is the only reason to use a board.
- `tone="attention"` marks the one column that is the problem. Two pink columns and the eye stops believing either.
- **A capped column states its cap.** A "Done" column must not render 900 cards: pass the true total as `count` and put "Showing 2 of 12" in the `footer`. A header count that silently disagrees with the cards below it is the one thing a board must never do.
- An empty column keeps its header and shows nothing else — no illustration, no "drop here" until something is actually being dragged.
