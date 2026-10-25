`Topbar` says where you are and how fresh the data is. It is not a toolbar.

```jsx
<Topbar icon={dashboardIcon} label="Dashboard">
  <StaleBadge level="fresh" at="4:12 PM" />
  <Button variant="secondary" size="sm" iconLeft={refreshIcon}>Refresh</Button>
</Topbar>
```

Rules that matter:

- **Page actions go in `PageHeader`, not here.** The topbar holds state (freshness, refresh, identity) — things true of the whole app, not of this page.
- 48px, one rule underneath, `--surface-page` so it separates from the sunken content. Never tint it.
- `label` mirrors the active nav item. Two levels maximum ("Client projects / Gala 2026"); deeper hierarchies belong in the page header.
- The identity chip appears here **only when the screen has no sidebar**. Two chips on one screen is a bug.
- No search field here — search lives in the page's `FilterBar`, next to what it filters.
