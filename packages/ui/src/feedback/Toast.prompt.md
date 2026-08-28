Use `Toast` to confirm a reversible action that already happened.

```jsx
<Toast message="Task closed" detail="Confirm crew for commencement"
  onUndo={undo} secondsLeft={8} />
```

- **Dwell is 8 seconds** (`--toast-dwell`) — long enough to read the sentence and reach Undo. Don't shorten it on a toast that offers undo.
- **A toast is never the only record of a failure.** If a cross-app write fails after an optimistic success, revert the row and show a persistent inline error; a toast may already have disappeared.
- Copy states facts, not feelings: "Invoice approved", "Link expired", "Dates updated". Never "Success!", never an exclamation mark.
- One toast at a time. If two actions fire in succession, replace the message rather than stacking — stacked toasts cover the thing being edited.
- Positioning belongs to the app shell, not this component: bottom-left, above the content, clear of the sidebar.
