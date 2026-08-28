Use `Input` for any single-line entry. It renders a real `<label>` bound to the field — never a floating placeholder-as-label.

```jsx
<Input label="Approved budget" prefix="$" numeric value={budget} onChange={setBudget} />
<Input label="Wrap date" type="date" numeric value={date} onChange={setDate} />
<Input label="Client email" type="email" error="That address isn't valid." />
```

- **`numeric` on every money, hours, count or date field.** It switches the value to mono with tabular figures so stacked fields align digit-for-digit.
- **Currency uses `prefix="$"`, not a typed dollar sign** — the symbol sits outside the editable text so it can't be deleted or duplicated.
- Labels are sentence case and name the thing plainly: "Approved budget", not "Budget Amount ($)".
- Error copy is what happened, then what to do: "Upload stopped at 4.2 GB. Check the connection and resume." No "Invalid input", no exclamation marks.
- `hint` is for standing guidance; `error` replaces it when validation fails, so never write a hint that the error contradicts.
