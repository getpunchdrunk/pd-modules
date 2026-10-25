`PrintInvoice` is a whole invoice, not a fragment. Reach for it before assembling
`PrintLineTable` + `PrintTotals` by hand — those are the parts, this is the document.

```jsx
<PrintInvoice
  invoiceNumber="3682"
  client={{ name: "Evergreen Arts Festival", attn: "Jordan Ellis", lines: ["2200 6th Ave Suite 411, Seattle, WA 98121"] }}
  meta={[{ label: "Date of issue", value: "08/27/2026" }, { label: "Due date", value: "09/25/2026" },
         { label: "Terms", value: "Net 30", mono: false }, { label: "Event date", value: "08/15/2026" }]}
  items={[{ name: "Audio Package", subtitle: "PA system, mics, and crew",
            scope: "Crew and equipment to provide ground-supported PA system, digital console, microphones, and support equipment.",
            rate: "$8,861.51", qty: "0.5", amount: "$4,430.76" }]}
  adjustments={[{ label: "Subtotal", value: "$25,568.30" }, { label: "15% discount", value: "\u2212$3,835.25" }]}
  total={{ value: "$21,733.05" }}
  payments={[{ label: "Amount paid", value: "$10,000.00" }]}
  amountDue="$11,733.05" />
```

Rules that matter:

- **A line item is three pieces: name, scope subtitle, scope paragraph.** The paragraph
  is what clients read and argue with; do not compress it into the subtitle to save a line.
- **Do not invent grouping.** Real invoices are a flat list of packages. Phase headers
  are a proposal device; here they add a row that carries no money.
- **Quantities are fractional.** `0.5` means the second half of a two-invoice job.
  Never round it to 1 and halve the rate — the client is comparing against the estimate.
- **Discount and tax live in `adjustments`, deposits in `payments`.** One is arithmetic
  on the work, the other is money already moved. Merging them makes the stack unreadable.
- **Notes and Terms are different things.** Notes say what this invoice is (2 of 2, what
  was credited); Terms say when to pay and what happens if you do not. Never one block.
- **Every figure arrives pre-formatted.** This component does no arithmetic, so a total
  that does not add up is a data bug and will print exactly as given.
- **Multi-page is the default, not the failure case.** Do not shrink type or drop scope
  paragraphs to reach one sheet. The head repeats and rows do not split; let it run.
- Screen behaviour — fluid paper, stacked line items below 820px, a pay button — belongs
  to the page that mounts this. See `Example Invoice.dc.html`.
