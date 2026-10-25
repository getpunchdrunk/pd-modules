`Skeleton` stands in for content that is coming, at the size it will be.

```jsx
{loading ? <Skeleton variant="rows" rows={10} /> : <Table columns={cols} rows={rows} />}
```

Rules that matter:

- **Match the real geometry.** `variant="rows"` uses the 40px row height and the same 16px edge padding, so the table does not jump when data arrives.
- **Never skeleton a whole page.** Chrome (sidebar, topbar, page header) renders immediately; only the blocks waiting on data get placeholders.
- One slow opacity pulse, from `.pd-skeleton`. No travelling shimmer, no spinner on top, and it goes flat under `prefers-reduced-motion`.
- **A figure that is stale is not loading.** Show the old number with a `StaleBadge`; a skeleton implies there is nothing yet.
- If the wait exceeds a few seconds, replace the skeleton with a real message — a placeholder that never resolves reads as a broken page.
