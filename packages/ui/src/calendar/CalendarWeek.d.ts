export interface TimedEvent {
  start: string | Date;
  end: string | Date;
  title: string;
  /** Pre-formatted: "8:00–17:00". */
  time?: string;
  tone?: "default" | "attention";
  synced?: boolean;
  source?: { label?: string; color?: string };
}

export interface AllDayEvent {
  title: string;
  tone?: "default" | "attention";
  synced?: boolean;
  source?: { label?: string; color?: string };
  /** 1-based column to start in, and how many columns to span. */
  spanFrom?: number;
  spanDays?: number;
}

/**
 * Time grid for a week, or a single day when days has one entry.
 *
 * @startingPoint section="Calendar" subtitle="7am–8pm week grid, all-day row, now line" viewport="1000x700"
 */
export interface CalendarWeekProps {
  /** One Date per column. Pass one date for the Day view — there is no separate component. */
  days: Date[];
  events?: TimedEvent[];
  allDay?: AllDayEvent[];
  /** Visible window. 7–20 covers a studio day; page or scroll for the rest. */
  startHour?: number;
  endHour?: number;
  /** 44px per hour, so a 30-minute event is 22px and still readable. */
  hourHeight?: number;
  today?: Date;
  /** Pass the current time to draw the now line. Omit and it is not drawn. */
  now?: Date;
  /** Time gutter width. */
  gutter?: number;
  onEventClick?: (event: TimedEvent | AllDayEvent) => void;
}

export function CalendarWeek(props: CalendarWeekProps): JSX.Element;
