`PageHeader` is the first block inside `AppShell`, above everything else.

```jsx
<PageHeader
  title="Client projects"
  subtitle="Billable work for outside organizations"
  actions={<Button iconLeft={plusIcon}>New project</Button>}
/>
```

Rules that matter:

- **27px Noto Sans Display 700, tracked `-0.02em`.** This is the only place that size appears on a screen; a second one means two pages are fighting.
- `subtitle` is one line that says what the page holds, and may carry a link to its sibling page. Never a sentence of encouragement.
- **One primary action.** Verb-first, 1–3 words. Filters and bulk actions are not page actions — they belong to `FilterBar` and `BulkActionBar`.
- Title text is the page's real name and matches the nav label exactly. If they differ, one of them is wrong.
