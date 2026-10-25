import type { ChartSeries } from "./LineChart";

/**
 * Categorical comparison — one bar per category, up to three series grouped.
 *
 * @startingPoint section="Charts" subtitle="Billed by month, grouped against target, one bar in pink" viewport="620x300"
 */
export interface BarChartProps<Row = any> {
  data: Row[];
  /** Field holding the category name. */
  categoryKey?: string;
  /** Up to three. A fourth series is a table. */
  series: ChartSeries[];
  /** `vertical` = bars grow up, category axis along the bottom (use for time).
   *  `horizontal` = bars grow right (use for named things — client, crew, vendor). */
  orientation?: "vertical" | "horizontal";
  /** Return true for the bar that needs action; it renders pink. One rule only. */
  attention?: (row: Row, seriesKey: string) => boolean;
  /** Dashed labelled rule: a target, a ceiling, last year's figure. */
  reference?: { value: number; label?: string; color?: string };
  valueTickFormatter?: (value: any) => string;
  categoryTickFormatter?: (value: any) => string;
  /** Horizontal only: room for the category labels. Widen rather than truncate. */
  categoryWidth?: number;
  /** Bar thickness. Defaults: 22 single vertical, 16 single horizontal, 14 grouped. */
  barSize?: number;
  grid?: boolean;
  tooltipFormatter?: (value: any, name: string) => any;
}

export function BarChart<Row = any>(props: BarChartProps<Row>): JSX.Element;
