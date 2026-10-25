`PrintNote` is the small print: terms, assumptions, exclusions, sign-off instructions.

```jsx
<PrintNote title="Assumptions & exclusions" columns={2}>
  Rates assume a 10-hour day. Overtime billed at 1.5× after 10 hours…
</PrintNote>
```

Rules that matter:

- **Rule above, never a box.** A bordered grey card is a screen component; on paper it reads as a pasted-in screenshot.
- 10.5px at `--leading-normal` is the floor. Anything smaller is a legal decoration nobody can read.
- Two columns only when the content is a list of short clauses. Prose in two columns on Letter is unreadable.
- These are the clauses that decide arguments later. Write them in plain sentences, not legalese, and keep each one to a line or two.
