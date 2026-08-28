Use `IconButton` only when the icon is genuinely unambiguous (close, refresh, more) and space is tight.

```jsx
<IconButton icon={<RefreshCw size={13} />} label="Refresh sources" onClick={refresh} />
```

- `label` is mandatory — it becomes both `aria-label` and `title`. An icon button without one is a bug.
- Icons are Lucide at 13px (sm), 15px (md), 16px (lg), `currentColor`, never a different stroke weight.
- If the action is important or destructive, use a real `Button` with words instead. Never hide "Delete" behind an icon alone.
