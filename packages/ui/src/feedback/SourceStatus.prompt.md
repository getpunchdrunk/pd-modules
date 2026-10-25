`SourceStatus` goes in a `Card` titled "Sources", usually in the last row of a dashboard.

```jsx
<Card title="Sources" padded={false}>
  <SourceStatus sources={[
    { name: "FileTransfers", status: "ok", at: "4:12 PM" },
    { name: "Scope", status: "failed", at: "4:02 PM" }
  ]} />
</Card>
```

Rules that matter:

- **Failure is attributable.** A number that came from a dead source is worse than no number, so the source list is its own block rather than a tooltip.
- A failed row takes `--surface-attention` and pink lettering; the timestamp says `failed 4:02 PM`, not "error".
- **Every row shows a time, always.** No relative time beyond an hour, no "just now".
- The dot is never the only signifier — the status word rides in the timestamp next to it.
- Which sources exist, and what counts as stale, is the app's business. The system only ships the affordance.
