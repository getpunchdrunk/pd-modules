import type { ReactNode } from "react";

/**
 * 48px context and state strip above the scroll area.
 *
 * @startingPoint section="Layout" subtitle="Location left; freshness, refresh and identity right" viewport="760x120"
 */
export interface TopbarProps {
  /** 16px Lucide icon matching the current nav item. */
  icon?: ReactNode;
  /** Where you are. Mirrors the active NavItem's label; two levels max, joined with " / ". */
  label?: string;
  /** Right cluster: StaleBadge, a refresh button, the identity chip on sidebar-less screens. */
  children?: ReactNode;
  sticky?: boolean;
}

export function Topbar(props: TopbarProps): JSX.Element;
