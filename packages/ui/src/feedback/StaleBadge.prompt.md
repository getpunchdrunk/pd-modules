`StaleBadge` is how the system keeps its promise that no old number is shown as if it were current.

```jsx
<StaleBadge level="fresh" at="4:12 PM" />                     {/* topbar */}
<StaleBadge level="stale" at="18 min" size="sm" />            {/* card header */}
<StaleBadge level="failed" at="4:02 PM" size="sm" />
```

Rules that matter:

- **The timestamp is always visible** — a fresh badge is not optional decoration, it is the reason a stale one is believable.
- Escalate on a threshold the *app* owns, not this component: pass `level="stale"` when the data is too old for what it is carrying, and `level="failed"` the moment a source did not answer.
- **Pink here is lettering, so it is `--text-action`** on `--surface-attention` with a 1px `--border-attention`. Never a pink fill — that would look clickable.
- The word comes before the figure ("stale 18 min"), and the figure is mono so a row of badges aligns.
- One per surface: the topbar covers the page, a card header covers that card. Both at once means neither is read.
