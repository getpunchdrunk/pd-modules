/**
 * Figure-plus-bar for a table column. No Recharts.
 *
 * @startingPoint section="Charts" subtitle="Spent-against-budget column, one row over threshold" viewport="620x220"
 */
export interface BarCellProps {
  /** The raw figure, for the bar geometry. */
  value: number;
  /** What the bar is a fraction of. Same unit as value. */
  max: number;
  /** The pre-formatted figure to display: "$121,450". */
  label: string;
  /** Fraction at which the bar and figure turn pink. 0.9 default. */
  threshold?: number;
  /** Force the tone instead of using the threshold. */
  tone?: "default" | "attention";
  align?: "right" | "between";
  /** Adds a small percentage next to the figure. Only when the ratio is the point. */
  showPercent?: boolean;
}

export function BarCell(props: BarCellProps): JSX.Element;
