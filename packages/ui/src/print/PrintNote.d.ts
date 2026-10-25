import type { ReactNode } from "react";

/**
 * Terms, assumptions, exclusions — titled prose under a rule.
 *
 * @startingPoint section="Print" subtitle="Titled terms block under a rule" viewport="612x140"
 */
export interface PrintNoteProps {
  title?: ReactNode;
  children: ReactNode;
  /** 2 for a long list of exclusions. Never more. */
  columns?: 1 | 2;
}

export function PrintNote(props: PrintNoteProps): JSX.Element;
