Use `Button` for every clickable action; never style a `<div>` or `<span>` to look like one.

```jsx
<Button variant="primary" onClick={approve}>Approve</Button>
<Button variant="secondary" size="sm">Hold</Button>
```

Rules that matter:

- **One primary per region.** A card, a dialog, or a toolbar gets at most one pink button. Everything else is `secondary` or `ghost`.
- **Label is verb-first, 1–3 words, sentence case:** "Approve", "Send link", "Draft invoices". Never "Submit", never "Click here", never a trailing period.
- **`size="sm"`** is for buttons inside table rows — it is what makes a row 49px instead of 40px, so only put one in a row when the action is the point of the row.
- **`variant="danger"`** is a light pink surface with dark pink text, not a solid red block. Solid pink means "do the main thing", so destructive actions must not compete with it.
- Hover and press come from the shared `hover-elevate` / `active-elevate-2` classes — do not add your own hover color, lift, or scale.
