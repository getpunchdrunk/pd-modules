/**
 * Age-of-data chip for a topbar or a card header.
 *
 * @startingPoint section="Feedback" subtitle="Fresh, stale and failed, at both sizes" viewport="600x120"
 */
export interface StaleBadgeProps {
  /** fresh = quiet bordered chip. stale / failed = attention surface, pink lettering. */
  level?: "fresh" | "stale" | "failed";
  /** Pre-formatted time or age: "4:12 PM", "18 min". */
  at?: string;
  /** Overrides the default wording ("as of", "stale", "source failed"). */
  label?: string;
  prefix?: string;
  /** md 30px for a topbar, sm 22px inside a card header. */
  size?: "sm" | "md";
}

export function StaleBadge(props: StaleBadgeProps): JSX.Element;
