`PrintFooter` goes at the bottom of every printed page, including continuations.

```jsx
<PrintFooter left="Punch Drunk · Invoice PD-2081 · issued 12 Aug 2026" right="Page 1 of 3" />
```

Rules that matter:

- **The document must identify itself on every sheet.** Printed pages get separated, stapled to other things, and scanned out of order.
- Page marker is "Page n of m" — a bare number tells nobody whether a sheet is missing.
- In a flowing `<doc-page>` put it in `slot="footer"` and it repeats itself; in an explicitly paginated document write one per `.page`.
- Nothing else lives down here. Not a logo, not a tagline, not a confidentiality paragraph — that is a `PrintNote` in the body.
