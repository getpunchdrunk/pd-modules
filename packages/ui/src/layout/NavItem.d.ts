import type { ReactNode, MouseEventHandler } from "react";

/**
 * A single sidebar row, with an optional count.
 *
 * @startingPoint section="Layout" subtitle="Default, active, with count, with attention count" viewport="300x180"
 */
export interface NavItemProps {
  /** A 16px Lucide icon using stroke="currentColor" — the item tints it. */
  icon?: ReactNode;
  label: string;
  /** A count worth glancing at. Omit rather than showing 0. */
  count?: number | string;
  /** "attention" is a solid pink pill: something is waiting on you. At most one per nav. */
  countTone?: "default" | "attention";
  active?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  trailing?: ReactNode;
}

export function NavItem(props: NavItemProps): JSX.Element;
