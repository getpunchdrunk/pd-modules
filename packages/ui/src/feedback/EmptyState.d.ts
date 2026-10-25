import type { ReactNode } from "react";

/**
 * Nothing-here state with the one action that fixes it.
 *
 * @startingPoint section="Feedback" subtitle="Icon, title, one line, one action; plain and on stripes" viewport="760x260"
 */
export interface EmptyStateProps {
  /** 16px Lucide icon in a 40px bordered tile. Optional — a title alone is fine. */
  icon?: ReactNode;
  /** What would be here: "No transfers yet". Not "Nothing to see". */
  title: string;
  /** One sentence: what fills it. */
  message?: ReactNode;
  /** Exactly one Button, size="lg". Omit when the user cannot fix it themselves. */
  action?: ReactNode;
  /** Brand stripe texture behind the state. For drop zones and first-run screens. */
  stripes?: boolean;
  /** 24px padding instead of 48px, for empty states inside a card or rail. */
  compact?: boolean;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
