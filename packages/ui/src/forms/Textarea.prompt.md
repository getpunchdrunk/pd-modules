Use `Textarea` for multiline notes, feedback and descriptions. Use `Input` for single-line entry. Give the field a sentence-case label; a placeholder is not a label.

```jsx
<Textarea label="Notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
<Textarea label="Feedback" autoGrow maxRows={8} hint="Describe what happened." />
<Textarea label="Notes" error="Add a note before sending." />
```

- `label`, `hint`, `error`, `invalid`, `disabled` and `size="sm" | "md" | "lg"` follow Input's conventions. An error replaces the hint and sets `aria-invalid`.
- `rows` defaults to 3. With `autoGrow`, the field grows and shrinks with content up to `maxRows` (default 10), then scrolls. The maximum is never smaller than `rows`. Without auto-grow, users can resize vertically.
- Native textarea props pass through, including `name`, `required`, `maxLength`, `defaultValue`, and `aria-label`. `onChange` receives the native React change event. Use either controlled `value`/`onChange` or uncontrolled `defaultValue`.
- The forwarded ref targets the textarea. IDs are unique by default; pass `id` for an explicit association. Caller `aria-describedby` is preserved alongside the hint or error ID.
- Size controls spacing, not the row count. Auto-grow owns height and vertical overflow; avoid competing inline height styles.
- Error copy says what happened and what to do next. Do not convey errors through colour alone.
