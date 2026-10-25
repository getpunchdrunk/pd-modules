import type { CSSProperties } from "react";

export interface EventSource {
  /** Where it came from, as people say it: "CrewSheet", "Google", "Basecamp". */
  label?: string;
  /** 1–6 in the event palette (--event-N-fill / -edge). One number per source, app-wide. */
  palette?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Escape hatch for the 2px edge only. Never a brand or chart token. */
  color?: string;
}

/**
 * One event, shared by month, week, day and agenda views.
 *
 * @startingPoint section="Calendar" subtitle="Block and line variants, synced, needs-attention" viewport="620x200"
 */
export interface EventChipProps {
  title: string;
  /** Pre-formatted: "8:00–17:00", "10:00". */
  time?: string;
  source?: EventSource;
  /** attention = something is unresolved (crew unconfirmed, hold unanswered). One per view at most. */
  tone?: "default" | "attention";
  /** Came from a synced system, so it is read-only here. Adds the link glyph and says so in the tooltip. */
  synced?: boolean;
  /** block = week/day/month cell. line = a single 17px row for dense month cells. */
  variant?: "block" | "line";
  /** Positioning from the parent grid. The chip never computes its own geometry. */
  style?: CSSProperties;
  onClick?: () => void;
}

export function EventChip(props: EventChipProps): JSX.Element;
