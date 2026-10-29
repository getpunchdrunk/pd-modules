import type { HTMLAttributes, ReactNode } from "react";

export interface SegmentedControlOption {
  /** Unique, stable value. */
  value: string;
  label: ReactNode;
  disabled?: boolean;
  /** Short visible and accessible annotation, e.g. "Default" or "Changed". */
  marker?: string;
}
/** Compact mutually exclusive choices.
 * @startingPoint section="Forms" subtitle="Two to five short choices, including dense permission cells" viewport="700x160"
 */
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  /** Visible group label; otherwise supply aria-label or aria-labelledby. */
  label?: ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
