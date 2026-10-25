export interface DonutSlice {
  name: string;
  value: number;
  /** Override the ramp position. Rarely needed; never pink unless the slice is the problem. */
  color?: string;
}

/**
 * Share of a total, with the total in the hole.
 *
 * @startingPoint section="Charts" subtitle="Five slices on the sky-to-navy ramp, total in the centre" viewport="420x300"
 */
export interface DonutChartProps {
  /** Five slices maximum, largest first, with a real "Other" if you had to group. */
  data: DonutSlice[];
  nameKey?: string;
  valueKey?: string;
  /** Pre-formatted total for the centre: "$184,000". */
  total?: string;
  /** Uppercase label under the total. */
  totalLabel?: string;
  tooltipFormatter?: (value: any, name: string) => any;
}

export function DonutChart(props: DonutChartProps): JSX.Element;
