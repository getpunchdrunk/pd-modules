`Pagination` is the last child of a table card, on `--surface-sunken` so it reads as chrome rather than a row.

```jsx
<Pagination page={1} pageCount={5} pageSize={10} total={42} onPage={setPage} />
```

Rules that matter:

- **Every figure is mono and tabular** — the numbers must not shift width as you page.
- Say the range, not just the page: "Showing 1–10 of 42". People want to know how much is behind the list.
- **Keys are 26px** so the footer matches a 40px table row. The current page is a solid ink key with inverse text; `--action-primary` is not used here — paging is not an action worth a pink.
- Bounds are **disabled, not hidden** (45% opacity, `aria-disabled`), so the control does not resize as you move through pages.
- Under about 25 rows total, do not paginate at all. Scroll the table.
