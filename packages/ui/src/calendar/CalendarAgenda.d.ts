export interface AgendaGroup {
  /** "Today", "Tomorrow", "Friday" — the app decides the wording. */
  label: string;
  /** Pre-formatted date: "09/04/2026". */
  date?: string;
  today?: boolean;
  events: {
    /** Pre-formatted: "8:00–17:00". Omitted renders "All day". */
    time?: string;
    title: string;
    tone?: "default" | "attention";
    synced?: boolean;
    source?: { label?: string; color?: string };
  }[];
}

/**
 * Grouped list view — the calendar for rails and dashboards.
 *
 * @startingPoint section="Calendar" subtitle="Three days grouped, times in a fixed mono column" viewport="520x420"
 */
export interface CalendarAgendaProps {
  groups: AgendaGroup[];
  emptyMessage?: string;
  onEventClick?: (event: any) => void;
}

export function CalendarAgenda(props: CalendarAgendaProps): JSX.Element;
