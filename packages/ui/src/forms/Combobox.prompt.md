Use `Combobox` when the list is long or unbounded — clients, crew, projects, vendors.

```jsx
<Combobox label="Crew" multi
  query={q} onQueryChange={setQ}
  options={matches}                 // caller filters
  selected={picked} onToggle={toggle}
  open={open} onOpenChange={setOpen}
  emptyMessage="No crew match that name. Try a last name." />
```

- **Fully controlled by design.** Filtering lives with the caller because real lists come from a query, not an array in the component.
- `meta` is the right-aligned mono detail — hours booked, project count, file size. It's what makes a list of names decidable.
- `emptyMessage` suggests the next move ("Try a last name"), never a bare "No results".
- Selected values render as removable chips in multi mode; each × carries an accessible label. Don't rely on the chip alone to communicate a required field.
- The results panel is one of the few places allowed a real blurred shadow (`--shadow-overlay`), because it genuinely floats above the page.
