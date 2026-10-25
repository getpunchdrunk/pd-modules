import type { ReactNode } from "react";

/**
 * Right-hand money stack with one emphasised total, and room for terms at left.
 *
 * @startingPoint section="Print" subtitle="Subtotal stack and grand total" viewport="612x200"
 */
export interface PrintTotalsProps {
  /** Subtotal, discount, tax, payments. Pre-formatted values. */
  rows?: { label: ReactNode; value: ReactNode; muted?: boolean }[];
  /** The one figure the reader is looking for. */
  total?: { label: ReactNode; value: ReactNode };
  /** Terms or remittance sentence, printed to the left of the stack. */
  note?: ReactNode;
  /** Stack width in px. Default 268. */
  width?: number;
}

export function PrintTotals(props: PrintTotalsProps): JSX.Element;
