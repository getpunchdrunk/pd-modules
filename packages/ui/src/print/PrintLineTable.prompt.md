`PrintLineTable` is the body of an invoice or budget on paper.

```jsx
<PrintLineTable
  columns={[{ label: "Description", width: "52%" }, { label: "Qty", align: "right", width: "10%", mono: true },
            { label: "Rate", align: "right", width: "17%", mono: true }, { label: "Amount", align: "right", width: "21%", mono: true }]}
  rows={[{ kind: "group", cells: ["Production"] },
         { cells: ["Two-camera package, 3 days", "3", "1,450.00", "4,350.00"], note: "Includes op and media wrangle" },
         { kind: "subtotal", cells: ["Production subtotal", "", "", "8,900.00"] }]} />
```

Rules that matter:

- **Every figure is pre-formatted and every money column is `mono: true`.** Right-align them; the decimal points must stack or nobody can add the column by eye.
- Column widths sum to 100% and the description takes at least half. A wrapped description is fine; a wrapped number is a bug.
- **Groups are uppercase full-width rows, not indentation.** Subtotals get the band. Only one `total` row per table, and on an invoice the real total belongs in `PrintTotals`, not here.
- `note` is scope detail in one clause. If it needs a sentence with a verb, it is a line item.
- No zebra striping and no vertical rules — hairlines between rows are enough on paper, and stripes double the toner.
- The head repeats automatically on continuation pages. Do not rebuild it by hand on page 2.
