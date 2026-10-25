import type { ReactNode } from "react";

/**
 * A single board column with count and WIP limit.
 *
 * @startingPoint section="Kanban" subtitle="Header, count, WIP limit over budget, cards" viewport="620x360"
 */
export interface KanbanColumnProps {
  /** The column's own name — the value on whatever axis the board is grouped by. */
  label: string;
  /** The TRUE total on this axis value, even when the column renders fewer — then state the cap in footer. */
  count: number;
  /** Shown as "6 / 4"; over the limit turns the count and the column border pink. */
  wipLimit?: number;
  /** 280px default. 240 when six columns must fit without scrolling. */
  width?: number;
  /** Set it and the column scrolls internally instead of growing the page. */
  maxHeight?: number;
  /** An "Add" button, or a subtotal. */
  footer?: ReactNode;
  /** attention = this column is the problem (blocked, overdue). At most one per board. Wins over accent. */
  tone?: "default" | "attention";
  /** 1–6 in the event palette: -fill on the header, -wash on the column body. Assign along the axis, left to right. */
  accent?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

export function KanbanColumn(props: KanbanColumnProps): JSX.Element;
