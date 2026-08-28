Use `Select` for a short, fixed list — statuses, stages, sort orders, 2 to 8 options.

```jsx
<Select label="Stage" value={stage} onChange={setStage}
  options={["Prep", "Production", "Post", "Invoiced"]} />
```

- It wraps a real `<select>`, so keyboard, screen readers and mobile pickers work for free. Do not rebuild it as a div-and-listbox.
- **More than about eight options, or options that need searching, means `Combobox` instead** — a long native dropdown of client names is miserable to use.
- `placeholder` is a real first option with an empty value ("All clients", "Any stage"), used for filters. It never replaces the label.
- Filter selects on a toolbar use `size="sm"` and sit at 30px so they line up with search fields and buttons.
