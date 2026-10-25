`NavItem` is a nav row and nothing else — do not reuse it for list rows or menu items.

```jsx
<NavItem icon={walletIcon} label="Budgets" count={4} countTone="attention" />
```

Rules that matter:

- **Pass icons with `stroke="currentColor"`.** The item sets the color: pink when active, `--text-muted` otherwise. An icon with a baked-in stroke will not follow the state.
- **Active is a wash, not a fill.** `--surface-action-soft` behind `--text-action` lettering. A solid pink row reads as a button and competes with the primary action.
- **`countTone="attention"`** (solid pink pill, white figure) is reserved for "this needs you". At most one in the nav at a time; everything else is the grey count.
- **Never show `count={0}`** — omit the count. An empty badge is noise.
- Labels are plain nouns, sentence case, no truncation games: if a label does not fit 232px it is too long.
