import type { ReactNode } from "react";

/**
 * A complete printed invoice, composed from the print parts.
 *
 * @startingPoint section="Print" subtitle="Full invoice document, multi-page" viewport="612x792"
 */
export interface PrintInvoiceLineItem {
  /** Short noun phrase: "Audio Package". */
  name: ReactNode;
  /** One uppercase clause naming what the package covers. No verb. */
  subtitle?: ReactNode;
  /** The scope paragraph. Sentences, and the thing clients actually read. */
  scope?: ReactNode;
  /** Pre-formatted, mono: "$8,861.51". */
  rate: ReactNode;
  /** Fractional quantities are normal — "0.5" bills half a package. */
  qty: ReactNode;
  /** Pre-formatted rate x qty. Never computed here. */
  amount: ReactNode;
}

export interface PrintInvoiceProps {
  invoiceNumber: ReactNode;
  org?: ReactNode;
  orgLines?: ReactNode[];
  client?: { name: ReactNode; attn?: ReactNode; lines?: ReactNode[] };
  /** Issue date, due date, terms, event date. Four facts, not more. */
  meta?: { label: ReactNode; value: ReactNode; mono?: boolean }[];
  /** Pre-formatted. Appears twice: the hero and the totals band. */
  amountDue: ReactNode;
  items: PrintInvoiceLineItem[];
  /** Subtotal, discount, tax — above the total. */
  adjustments?: { label: ReactNode; value: ReactNode }[];
  total?: { label?: ReactNode; value: ReactNode };
  /** Deposits and retainers already received, below the total. */
  payments?: { label: ReactNode; value: ReactNode }[];
  /** What this invoice is and how it relates to the others. */
  notes?: ReactNode;
  /** Payment window and late terms. Separate from notes. */
  terms?: ReactNode;
  /** Where to send money and what to reference. */
  remittance?: ReactNode;
  /** "Page 1 of 3", supplied by the paging host. */
  page?: ReactNode;
}

export function PrintInvoice(props: PrintInvoiceProps): JSX.Element;
