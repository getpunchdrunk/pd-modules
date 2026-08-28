import type { ReactNode } from "react";

/**
 * Status pills and count badges.
 *
 * @startingPoint section="Core" subtitle="Status pills in five tones plus count badges" viewport="700x120"
 */
export interface BadgeProps {
  children: ReactNode;
  /** action = needs attention. positive = healthy/on track. info = in progress. neutral = done/inactive. count = a number in a pill. */
  tone?: "action" | "positive" | "info" | "neutral" | "count";
  size?: "sm" | "md";
  nowrap?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
