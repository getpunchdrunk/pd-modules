`EventChip` is the only way an event is drawn. Month, week, day and agenda all use it.

```jsx
<EventChip title="Harbor Light taproom shoot" time="7:00–19:00" tone="attention"
  source={{ label: "CrewSheet", palette: 2 }} synced />
```

Rules that matter:

- **Events use the event palette, never the brand or the chart ramp.** `--event-1..6` are low-chroma paper tints at one lightness: a grid of them recedes, and the brand stays meaningful. A calendar full of sky-and-navy reads as an advert for the palette, and the chart ramp already means "data series".
- **The 2px left edge is the source, one palette number per source app-wide** (`source.palette`) — not per project, not per person. A synced event also carries the link glyph and says "synced, read-only here" in its `title`.
- **Titles stay `--text-primary`.** The tint carries the hue; coloured lettering on a tint fails contrast and looks like a link.
- **Pink means the event needs you** (crew unconfirmed, a hold nobody answered). It is not "important" and not "mine". At most one attention event visible at a time; more than that and the calendar is a to-do list.
- **Never colour-code by project or client.** Twelve pastel projects on a week grid is unreadable, and the system has one accent by design.
- `variant="line"` is the 17px row for month cells; `block` is for week and day, where the parent sets height from the duration.
- **The chip never computes geometry.** Position and height come from the view via `style`.
- Anything read-only stays read-only: no drag affordance, no resize handle, no edit-in-place on a synced event.
