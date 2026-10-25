export interface CalendarEvent {
  /** Any Date-parseable value. The view does the day bucketing. */
  date: string | Date;
  title: string;
  /** Pre-formatted display time: "10:00", "8:00–17:00". Omit for all-day. */
  time?: string;
  tone?: "default" | "attention";
  synced?: boolean;
  source?: { label?: string; color?: string };
}

/**
 * Six-row month grid with line chips and overflow.
 *
 * @startingPoint section="Calendar" subtitle="September, today marked, three chips and +N more" viewport="900x620"
 */
export interface CalendarMonthProps {
  /** Any date inside the month to render. */
  month: Date;
  events?: CalendarEvent[];
  today?: Date;
  /** 96px default. Below 80 the chips stop fitting; raise it before reducing maxPerDay. */
  cellHeight?: number;
  /** Chips before "+N more". 3 at 96px. */
  maxPerDay?: number;
  /** 0 = Sunday, 1 = Monday. */
  weekStart?: 0 | 1;
  onDayClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onOverflowClick?: (date: Date) => void;
}

export function CalendarMonth(props: CalendarMonthProps): JSX.Element;
