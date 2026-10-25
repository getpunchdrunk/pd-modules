import type { ReactNode } from "react";

/**
 * Letterhead + ruled meta grid for any printed Punch Drunk document.
 *
 * @startingPoint section="Print" subtitle="Wordmark, document type, ruled meta grid" viewport="612x220"
 */
export interface PrintDocHeaderProps {
  /** Issuing org. Defaults to "Punch Drunk". */
  org?: string;
  /** Address / contact lines under the wordmark. Three at most. */
  orgLines?: ReactNode[];
  /** "Invoice", "Budget", "Project summary". One or two words. */
  docType: ReactNode;
  /** Pre-formatted reference: "PD-2081". Mono. */
  docNumber?: ReactNode;
  /** Outlined word in the corner: "Unpaid", "Draft v4". Never a coloured pill. */
  status?: ReactNode;
  /** 3–5 facts. value is mono unless mono: false. */
  meta?: { label: ReactNode; value: ReactNode; mono?: boolean }[];
}

export function PrintDocHeader(props: PrintDocHeaderProps): JSX.Element;
