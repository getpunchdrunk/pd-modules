`CalendarAgenda` is the calendar you put in a dashboard card or a 300px rail, where a grid would be a smear.

```jsx
<Card title="Upcoming" padded={false}>
  <CalendarAgenda groups={[{ label: "Today", date: "09/04/2026", today: true, events: todayEvents }]} />
</Card>
```

Rules that matter:

- **Times live in a fixed 104px mono column**, so every row aligns and an all-day event reads as "All day" rather than an empty gap.
- **Day headers are sunken bands with the count on the right.** Today's band is the 5% pink wash with pink lettering, matching the other views.
- **Group only by day, never by project or source.** The point of an agenda is chronological order.
- Empty days are omitted entirely, not shown as "nothing scheduled" rows — one `emptyMessage` covers a genuinely empty range.
- Same chip, same source edge, same read-only rules as the grid views. An agenda is a different shape, not a different vocabulary.
