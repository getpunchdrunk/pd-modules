import type { ReactNode } from "react";

/**
 * Hairline footer with document identity and page marker.
 *
 * @startingPoint section="Print" subtitle="Document identity and page marker" viewport="612x60"
 */
export interface PrintFooterProps {
  /** Who and what: "Punch Drunk · Invoice PD-2081". */
  left?: ReactNode;
  center?: ReactNode;
  /** "Page 1 of 3". Mono. */
  right?: ReactNode;
}

export function PrintFooter(props: PrintFooterProps): JSX.Element;
