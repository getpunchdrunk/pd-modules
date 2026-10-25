`EmptyState` replaces the content of a card or a table — it is never a whole page on its own.

```jsx
<EmptyState icon={inboxIcon} title="No transfers yet"
  message="Upload files to send a link."
  action={<Button size="lg" iconLeft={plusIcon}>Upload files</Button>} />
```

Rules that matter:

- **Say what would be here, then the one action that fills it.** "No transfers yet. Upload files to send a link." Never an apology, never a joke, never an illustration.
- **One action.** If the user cannot fix it (no permission, a source is down), drop the action and say why in `message`.
- **`stripes` puts texture behind the state, not behind the text** — the copy gets its own card patch. Use it for drop zones and first-run screens only.
- A filtered-empty table is a different message from a genuinely empty one: "No projects match these filters" with a "Clear filters" action, not "No projects yet".
- Do not pair with a `Skeleton`. Loading and empty are different states and must not cross-fade.
