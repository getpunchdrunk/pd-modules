`StatBlock` is one number that someone will compare to another number.

```jsx
<StatBlock label="Unbilled & ready to invoice" value="$52,940" unit="across 6 projects"
  action={<Button fullWidth>Draft invoices</Button>} />
```

Rules that matter:

- **Format the value before you pass it.** Currency with symbol and separators, hours to one decimal, sizes in the source's units. The block will not do it, and an unformatted figure is a bug.
- **Values are mono and tabular** so a row of blocks aligns on the digits.
- `tone` is meaning, not decoration: pink only when someone must act, navy for money in your favor, sky for informational state. A row of four coloured stats means none of them signal anything.
- **No sparklines, no percentage deltas by default.** Add a `footnote` in words if the change matters; a green arrow next to a figure nobody has explained is data slop.
- Four to six per row at most, and the row is `display: grid` with `gap: 8px`.
- If the figure is money and its source is stale, put a `StaleBadge` in the card holding it — never show an old number as if it were current.
