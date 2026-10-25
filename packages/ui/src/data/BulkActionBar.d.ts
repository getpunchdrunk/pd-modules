import type { ReactNode } from "react";

/**
 * Selection mode strip for a table.
 *
 * @startingPoint section="Data" subtitle="Selection count, small actions, one destructive, clear" viewport="820x90"
 */
export interface BulkActionBarProps {
  count: number;
  /** Singular noun for the records — "project", "file", "invoice". */
  noun?: string;
  /** Only when the plural is irregular. */
  nounPlural?: string;
  /** Button size="sm" elements. The destructive one is variant="danger" and goes last. */
  actions?: ReactNode;
  /** Deselect everything. Always offer it. */
  onClear?: () => void;
  /** Rendered inside the table card (default). false gives it its own bordered surface. */
  inCard?: boolean;
}

export function BulkActionBar(props: BulkActionBarProps): JSX.Element;
