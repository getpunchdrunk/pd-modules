import type { ReactNode } from "react";

/**
 * The standard panel: 8px radius, 1px border, hard 2px shadow, heading in Noto Sans Display.
 *
 * @startingPoint section="Core" subtitle="Panel with title, eyebrow, meta and actions" viewport="700x220"
 */
export interface CardProps {
  /** Rendered in the heading font. Names the region: "Active projects", "Recent transfers". */
  title?: ReactNode;
  /** Small uppercase label above the title. Use instead of title for stat panels. */
  eyebrow?: ReactNode;
  /** Right-aligned secondary text in the header — timestamps, counts, one-line notes. */
  meta?: ReactNode;
  /** Right-aligned controls in the header. Keep to one or two. */
  actions?: ReactNode;
  /** Set false when the child is a Table, which owns its own edge padding. */
  padded?: boolean;
  children: ReactNode;
}

export function Card(props: CardProps): JSX.Element;
