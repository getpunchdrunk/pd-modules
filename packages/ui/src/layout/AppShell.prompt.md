`AppShell` is the frame. Every signed-in screen is an `AppShell`; nothing else sets the sidebar width or the page padding.

```jsx
<AppShell sidebar={<Sidebar …/>} topbar={<Topbar label="Dashboard" />}>
  <PageHeader title="Dashboard" subtitle="Everything across the studio" />
  {/* content blocks */}
</AppShell>
```

Rules that matter:

- **The shell scrolls, the sidebar and topbar do not.** Content goes in `children`; never put a second scroll container inside unless it is a fixed-height rail.
- `padded` and `gap` are the only layout knobs. If a screen needs different page padding, that is a system decision, not a prop override.
- Auth, print and error pages pass no `sidebar` — then the identity chip moves to the topbar's top right (see `Sidebar`).
- The shell paints `--surface-sunken` behind the content so cards read as cards. Do not set a background on the content wrapper.
