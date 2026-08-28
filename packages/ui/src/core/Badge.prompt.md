Use `Badge` for state that belongs to a row or card, and for counts in navigation.

```jsx
<Badge tone="action">In production</Badge>
<Badge tone="count">12</Badge>
```

- Tone maps to meaning, never to decoration: `action` for anything needing a human, `positive` for on-track, `info` for in-flight, `neutral` for finished.
- Text is sentence case, one or two words. "In production", not "IN PRODUCTION" or "in_production".
- `tone="count"` switches to mono with tabular figures and a pill radius — use it for the numbers next to nav items and section titles, never for words.
- A badge is never the only signifier of a problem. Pair it with the number or copy that explains it.
