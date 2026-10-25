import type { ReactNode } from "react";

/**
 * Range label, paging, today, and the Month/Week/Day/Agenda switcher.
 *
 * @startingPoint section="Calendar" subtitle="Paging keys, range label, segmented view switcher" viewport="820x100"
 */
export interface CalendarNavProps {
  /** Pre-formatted range: "September 2026", "Aug 31 – Sep 6, 2026". */
  label: string;
  view?: string;
  views?: string[];
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  onView?: (view: string) => void;
  /** A source filter or a "New event" button. Sits after the switcher. */
  right?: ReactNode;
}

export function CalendarNav(props: CalendarNavProps): JSX.Element;
