`PrintDocHeader` is the top of every printed document — invoice, budget, project summary.

```jsx
<PrintDocHeader docType="Invoice" docNumber="PD-2081" status="Unpaid"
  orgLines={["1411 NW Flanders St, Portland OR", "accounts@punch-drunk.com"]}
  meta={[{ label: "Issued", value: "12 Aug 2026" }, { label: "Due", value: "11 Sep 2026" },
         { label: "Terms", value: "Net 30", mono: false }]} />
```

Rules that matter:

- **The accent hairline next to the wordmark is the only brand colour on the page.** Pink ink at 9pt greys out on a laser printer and costs money on a press.
- `status` is an outlined word, not a badge. Screen chips do not survive black-and-white.
- **Meta is 3 to 5 facts, and every one is a fact someone looks up** — issued, due, terms, PO, version. Not a restatement of the document type.
- Values are mono and tabular so dates and reference numbers align down the grid; set `mono: false` for words like "Net 30".
- One header per document, on page 1 only. Continuation pages get `PrintFooter` and nothing else.
