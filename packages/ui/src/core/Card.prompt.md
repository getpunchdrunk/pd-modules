`Card` is the only container. Every dashboard block, form section, and table wrapper is one.

```jsx
<Card title="Recent transfers" meta="as of 4:12 PM" padded={false}>
  <Table columns={cols} rows={rows} />
</Card>
```

- **`padded={false}` whenever the child is a `Table`** — otherwise you get double padding and the table's edge cells stop aligning with the header.
- Use `title` (heading font) for a region of content; use `eyebrow` (uppercase micro-label) for a single stat or figure.
- Never put a colored left border on a card, never a gradient, never a drop shadow larger than `--shadow-sm`. Popovers and dialogs are the only things that lift off the page.
- Cards do not nest. If you want a card inside a card, you want a bordered row instead.
