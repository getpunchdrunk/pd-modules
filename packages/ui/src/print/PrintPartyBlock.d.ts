import type { ReactNode } from "react";

/**
 * A labelled name-and-address block for printed documents.
 *
 * @startingPoint section="Print" subtitle="From / Bill to address block" viewport="612x140"
 */
export interface PrintPartyBlockProps {
  /** "From", "Bill to", "Prepared for". */
  label: ReactNode;
  name: ReactNode;
  /** Named contact, printed as "Attn: …". */
  attn?: ReactNode;
  /** Address and contact lines, one per array entry. Four at most. */
  lines?: ReactNode[];
}

export function PrintPartyBlock(props: PrintPartyBlockProps): JSX.Element;
