`PrintTotals` closes an invoice or a budget page.

```jsx
<PrintTotals
  rows={[{ label: "Subtotal", value: "$48,600.00" }, { label: "Deposit received 14 Jul", value: "−$20,000.00" }]}
  total={{ label: "Balance due", value: "$28,600.00" }}
  note="Net 30. Wire details on file; reference PD-2081 on remittance." />
```

Rules that matter:

- **One emphasised figure per page.** If two numbers are 19px, neither is the answer.
- The total's label says what the number *is* to the reader — "Balance due", not "Total".
- Credits print with a real minus sign (−) so they cannot be misread as a hyphen or a footnote marker.
- Keep `rows` to four or fewer. A long stack of adjustments belongs in the table as lines.
- The `note` is the terms sentence. It sits left of the stack because the eye that wants the number is already at the right.
