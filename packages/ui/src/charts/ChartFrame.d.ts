import type { ReactNode } from "react";

/**
 * Card chrome, legend and plot height for any chart.
 *
 * @startingPoint section="Charts" subtitle="Title, freshness, legend, plot area, footnote" viewport="620x300"
 */
export interface ChartFrameProps {
  title?: string;
  eyebrow?: string;
  /** A StaleBadge, or a range selector. Charts of money must carry one. */
  meta?: ReactNode;
  /** ChartLegendItem elements. Above the plot, never floating inside it. */
  legend?: ReactNode;
  /** Plot height in px. 200 default; 140 in a rail, 260 for a full-width burn chart. */
  height?: number;
  /** One line saying what the chart does not show. */
  footnote?: ReactNode;
  children?: ReactNode;
}

export interface ChartLegendItemProps {
  label: string;
  /** A --chart-N token. Pink (--chart-1) only for the series that needs action. */
  color?: string;
  /** The series' current figure, in mono. */
  value?: ReactNode;
  /** Dashed rule instead of a swatch — for reference and forecast lines. */
  dashed?: boolean;
}

export function ChartFrame(props: ChartFrameProps): JSX.Element;
export function ChartLegendItem(props: ChartLegendItemProps): JSX.Element;
