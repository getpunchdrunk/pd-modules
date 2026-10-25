`CalendarWeek` is both the week and the day view — pass one date in `days` for Day.

```jsx
<CalendarWeek days={weekDays} events={events} allDay={holds} now={new Date()} />
```

Rules that matter:

- **44px per hour.** A 30-minute event is 22px, which fits an 11.5px title. Do not go below it to show more hours — narrow the window instead (`startHour`/`endHour`).
- **7am–8pm is the default window**, because that is a studio day. Load-ins outside it must still be reachable: page the window, never clip an event silently.
- **The all-day row is pinned above the grid and never scrolls with it**, at 30px. Multi-day holds span columns there rather than repeating on each day.
- **The time gutter is 64px, not 56px.** "ALL DAY" at 10px uppercase with eyebrow tracking needs 44px of content width plus the 8px padding on each side; at 56px it wrapped to two lines and pushed the all-day row to 39px. If you narrow the gutter, shorten the label in the same edit.
- **One now line, pink, 1px with a 6px dot, only on today's column.** Today's column also takes the 5% pink wash. That is the whole of pink's role here.
- Overlapping events are the app's problem to resolve before it renders: this view stacks them in source order, so pass them pre-sorted and side-by-side if two genuinely collide.
- A 30-minute floor applies to height (`min 17px`) so a 15-minute call is still clickable.
