`CalendarMonth` answers "what is the shape of this month" — not "what is happening at 2pm".

```jsx
<CalendarMonth month={new Date(2026, 8, 1)} events={events} onDayClick={openDay} />
```

Rules that matter:

- **Always six week rows**, so the grid does not change height as you page through months. A calendar that resizes is unusable at speed.
- **Three line chips then "+N more".** Never shrink the chip to fit a fourth; the overflow link is the honest answer and it opens the day view.
- **Today is a pink numeral over a 5% pink wash** — the one exception to pink-means-action, because the current day is what you act from. Do not add a filled pink circle, and never mark more than one cell.
- Days outside the month and weekends both take `--surface-sunken`; that is the only shading the grid gets.
- **Times stay in mono** even at 9.5px, so a column of chips aligns on the digits.
