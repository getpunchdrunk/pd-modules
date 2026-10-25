`BulkActionBar` renders inside the table card, between the card header and the column header, only while rows are selected.

```jsx
{selected.length > 0 && (
  <BulkActionBar count={selected.length} noun="project" onClear={clear}
    actions={<>
      <Button variant="secondary" size="sm">Change stage</Button>
      <Button variant="danger" size="sm">Archive</Button>
    </>} />
)}
```

Rules that matter:

- **It appears and disappears in place; it does not float.** No sticky bottom bar — the actions belong to the table, and a floating bar covers the last row.
- **Actions are `size="sm"`,** left to right in increasing consequence, with the destructive one last as `variant="danger"` (pink surface, pink lettering — never a solid pink block).
- Money and client-facing bulk actions **open a confirm dialog** and state the count: "Archive 2 projects?". Reversible ones fire optimistically with an 8-second undo toast.
- The count is mono and the word after it agrees with it. "1 selected", never "1 items".
- Always offer `onClear`. Escape should do the same thing.
