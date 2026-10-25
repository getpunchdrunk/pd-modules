import type { ReactNode } from "react";

export interface KanbanColumnSpec {
  id: string;
  /** The value on the grouping axis: "In review", "Production", "Awaiting approval". */
  label: string;
  items?: any[];
  wipLimit?: number;
  tone?: "default" | "attention";
  /** Header tint, 1–6 in the event palette. Assign along the axis; then leave the cards' source edges off. */
  accent?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface KanbanSwimlane {
  /** Matched against each item's `lane`. */
  key: string;
  label: string;
}

/**
 * Board with a data-driven axis and optional swimlanes.
 *
 * @startingPoint section="Kanban" subtitle="Four columns, one over WIP, cards from a render prop" viewport="1000x520"
 */
export interface KanbanBoardProps {
  /** The axis, as data. Never hardcode columns in a screen. */
  columns: KanbanColumnSpec[];
  /** Renders one item. Usually a KanbanCard. */
  renderCard?: (item: any, index: number) => ReactNode;
  /** A second axis on the rows — by producer, by client, by week. Two axes maximum. */
  swimlanes?: KanbanSwimlane[];
  columnWidth?: number;
  /** Passed to every column so they scroll instead of the page. */
  columnMaxHeight?: number;
  gap?: number;
  /** Per-column footer, e.g. an add button or a subtotal. */
  columnFooter?: (column: KanbanColumnSpec) => ReactNode;
}

export function KanbanBoard(props: KanbanBoardProps): JSX.Element;
