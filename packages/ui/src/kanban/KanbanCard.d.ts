import type { ReactNode } from "react";

export interface KanbanFact {
  /** One short fact: "Cascade Aquarium", "due 09/04", "PO 2619". */
  label: string;
  /** Renders in mono — for money, dates, counts, IDs. */
  mono?: boolean;
  tone?: "default" | "attention";
}

/**
 * A record on a board — task, project, invoice, crew hold.
 *
 * @startingPoint section="Kanban" subtitle="Title, facts, figure, badge, assignee; default and attention" viewport="620x260"
 */
export interface KanbanCardProps {
  title: string;
  /** Up to four. The fifth is dropped: a card is a summary, not a record. */
  facts?: KanbanFact[];
  /** Pre-formatted money or count, right-aligned in mono. */
  figure?: string;
  /** One Badge. Status lives in the column, so use this for something the column does not say. */
  badge?: ReactNode;
  /** Which system it came from: palette 1–6 draws a 3px top edge. */
  source?: { label?: string; palette?: 1 | 2 | 3 | 4 | 5 | 6 };
  /** attention = blocked, over budget, or waiting on you. */
  tone?: "default" | "attention";
  /** Synced from another system: says "read-only" and must not be draggable. */
  synced?: boolean;
  assignee?: { name: string; initials: string };
  onClick?: () => void;
}

export function KanbanCard(props: KanbanCardProps): JSX.Element;
