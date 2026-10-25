`KanbanCard` is record-agnostic on purpose — the same card carries a task, a project, an invoice or a crew hold.

```jsx
<KanbanCard title="Approve Cascade Gear Rentals invoice" tone="attention"
  facts={[{ label: "Exceeds PO by 12.5%", tone: "attention" }, { label: "INV-4471", mono: true }]}
  figure="$14,180" assignee={{ name: "Sam Rivera", initials: "SR" }} />
```

Rules that matter:

- **Four facts maximum**, and the fifth is dropped rather than wrapped. If people need more to decide, the board is the wrong surface — link to the detail page.
- **Never repeat the column in the card.** The column already says "In review"; a status badge that says the same thing is noise.
- **One figure, pre-formatted, in mono**, bottom right. It is what people scan a money board for.
- **`tone="attention"` is the only colour on the card**: pink border and pink figure for blocked, over budget, or waiting on you. Cards do not carry project or client colours.
- `source.palette` draws a 3px top edge from the **event palette**, the same one the calendar uses for cross-system records — not brand, not chart tokens.
- **A synced card says "read-only" and must not be draggable.** Do not render a drag affordance you will refuse to honour.
