import type { ReactNode } from "react";

/**
 * Month panel for a date field. Single or range.
 *
 * @startingPoint section="Calendar" subtitle="Range selected, today marked, mono figures" viewport="360x420"
 */
export interface DatePickerProps {
  /** The month on show. */
  month: Date;
  /** Pre-formatted month heading: "September 2026". */
  monthLabel: string;
  /** Single-date mode. */
  value?: Date;
  /** Range mode: both ends filled are the pink keys, the middle takes the 5% wash. */
  rangeStart?: Date;
  rangeEnd?: Date;
  today?: Date;
  onSelect?: (date: Date) => void;
  /** -1 / +1 month. */
  onMonth?: (delta: number) => void;
  /** The chosen dates in mono plus a confirm action. Omit for an always-live picker. */
  footer?: ReactNode;
}

export function DatePicker(props: DatePickerProps): JSX.Element;
