`PrintPartyBlock` is a who-block on a printed page.

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
  <PrintPartyBlock label="From" name="Punch Drunk LLC" lines={["1411 NW Flanders St", "Portland, OR 97209"]} />
  <PrintPartyBlock label="Bill to" name="Northwind Airlines" attn="Dana Reyes, Events"
    lines={["1200 Northwind Pkwy", "Seattle, WA 98101"]} />
</div>
```

Rules that matter:

- **Two per row, in a grid with a 32px gap.** Three is a form, not a letter.
- Lines are pre-composed strings — the block does not know what a postcode is.
- `attn` is the person who has to do something about the document. If nobody has to, leave it off.
- No borders around the block. The page's rules do the separating; a boxed address looks like a screenshot of a form.
