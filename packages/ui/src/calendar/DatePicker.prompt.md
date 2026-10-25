`DatePicker` is the panel, not the field. Put it in a popover from an `Input`.

```jsx
<DatePicker month={month} monthLabel="September 2026" rangeStart={from} rangeEnd={to}
  onSelect={pick} onMonth={step}
  footer={<><span style={{fontFamily:"var(--font-mono)"}}>09/01 – 09/12</span><Button size="sm">Apply</Button></>} />
```

Rules that matter:

- **Selected ends are the solid pink key; the span between them is the 5% wash.** This is the one control where a pink fill is right, because picking a date *is* the action.
- **Today is a pink numeral, never a filled key** — otherwise today and "selected" look identical.
- **Every figure is mono and tabular.** A picker whose numbers shift width as you page months feels broken.
- Six week rows always, same reason as the month view: the panel must not change height.
- **The panel does not position itself.** It carries the overlay shadow and expects a popover; it is the only calendar surface allowed a blurred shadow.
- Typing beats clicking for a date twelve months out — always pair the panel with a text field that accepts `MM/DD/YYYY`.
