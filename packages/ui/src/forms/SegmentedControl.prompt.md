Use `SegmentedControl` for two to five short, mutually exclusive choices that fit in one compact row. Use `Select` for longer lists or labels that will not fit; use `Combobox` when searching options is necessary.

```jsx
<SegmentedControl
  aria-label="Project permissions"
  size="sm"
  value={permission}
  onChange={setPermission}
  options={[
    { value: "none", label: "No access" },
    { value: "read", label: "Read", marker: "Default" },
    { value: "write", label: "Write", disabled: true },
  ]}
/>
```

- Controlled only: pass `value` and `onChange(nextValue)`. Every option needs a unique string value. Keep the selected value in the supplied options.
- Give the radio group a visible `label`, or `aria-label`/`aria-labelledby`. In a grid, include the row and column context in its accessible name.
- `size="sm"` is the dense grid-cell size; `md` is the default and `lg` is roomier.
- Tab enters at the selected enabled option, or the first enabled option. Arrow keys wrap among enabled options and change selection. Home/End select the first/last enabled option. Space or Enter activates the focused option.
- Per-option `disabled` prevents selection; group `disabled` disables every option. A selected disabled option stays visibly selected but is skipped by keyboard navigation. An entirely disabled group has no tab stop.
- `marker` is a short visible text annotation, also associated as the option's accessible description. Use "Default" on the baseline option or "Changed" on an overridden option; callers determine those states. The marker is independent of the selected state and never relies on colour alone.
- Use plain text labels without nested buttons or links. This is a choice control, not navigation tabs. It does not submit a native form field; use the controlled value in your form handler.
