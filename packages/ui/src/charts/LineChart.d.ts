export interface ChartSeries {
  key: string;
  label: string;
  /** A --chart-N token. Defaults to sky. Pink only when the series needs action. */
  color?: string;
  dashed?: boolean;
}

/**
 * Line or area over time, on the brand ramp.
 *
 * @startingPoint section="Charts" subtitle="Budget burn: area series with an even-burn reference line" viewport="620x300"
 */
export interface LineChartProps<Row = any> {
  data: Row[];
  /** Field holding the time value. Format it with xTickFormatter, do not pre-stringify. */
  xKey?: string;
  series: ChartSeries[];
  /** Fill under the line at 12%. Use for one series only — stacked translucent areas are unreadable. */
  area?: boolean;
  /** Dashed rule: a target, a budget ceiling, an even-burn line. */
  reference?: { y?: number; segment?: any[]; label?: string; color?: string };
  yTickFormatter?: (value: any) => string;
  xTickFormatter?: (value: any) => string;
  grid?: boolean;
  tooltipFormatter?: (value: any, name: string) => any;
}

export function LineChart<Row = any>(props: LineChartProps<Row>): JSX.Element;
