`CalendarNav` sits between the `PageHeader` and the calendar view.

```jsx
<CalendarNav label="Aug 31 – Sep 6, 2026" view="Week" onPrev={prev} onNext={next} onToday={today} onView={setView} />
```

Rules that matter:

- **Paging keys are 30px `‹` / `›` and "Today" is a real button**, always present even when you are already on today — a control that disappears is worse than one that does nothing.
- The range label is the heading face at 15px, **pre-formatted by the app**. Never build the string from parts in the component.
- **The switcher is segmented and sits at the right.** Month, Week, Day, Agenda in that order, widest range first, so the order matches what people expect from every calendar they use.
- Keep it to one row at 30px controls. Filters that do not fit go in a `FilterBar` underneath, not wrapped into this row.
