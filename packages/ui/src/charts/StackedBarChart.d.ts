import type { ChartSeries } from "./LineChart";

/**
 * Composition of a total across categories — absolute amounts or share of 100%.
 *
 * @startingPoint section="Charts" subtitle="Cost mix by project: four stacked segments, absolute and share modes" viewport="620x300"
 */
export interface StackedBarChartProps<Row = any> {
  data: Row[];
  categoryKey?: string;
  /** Four segments maximum, plus a real "Other". Order them largest-first and keep
   *  that order across every bar, or the stack cannot be read across categories. */
  series: ChartSeries[];
  orientation?: "vertical" | "horizontal";
  /** `share` normalises each bar to 100% — state the real total in the frame footnote. */
  mode?: "absolute" | "share";
  valueTickFormatter?: (value: any) => string;
  categoryTickFormatter?: (value: any) => string;
  categoryWidth?: number;
  barSize?: number;
  grid?: boolean;
  tooltipFormatter?: (value: any, name: string) => any;
}

export function StackedBarChart<Row = any>(props: StackedBarChartProps<Row>): JSX.Element;
