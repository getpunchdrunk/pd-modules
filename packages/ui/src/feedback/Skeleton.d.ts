/**
 * Loading placeholder shaped like the thing it replaces.
 *
 * @startingPoint section="Feedback" subtitle="Text lines, block, circle, table rows" viewport="760x260"
 */
export interface SkeletonProps {
  /** rows = table rows at the real 40px height. block = a card or chart area. */
  variant?: "text" | "block" | "circle" | "rows";
  /** text: how many lines. The last is 60% wide. */
  lines?: number;
  /** rows: how many. Match the page size you are about to render. */
  rows?: number;
  width?: number | string;
  height?: number | string;
  radius?: string;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
