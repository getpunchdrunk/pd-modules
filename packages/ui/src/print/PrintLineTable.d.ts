import type { ReactNode } from "react";

export interface PrintLineTableColumn {
  key?: string;
  label: ReactNode;
  align?: "left" | "right" | "center";
  /** Percentage or px string passed to <col>. Widths should sum to 100%. */
  width?: string;
  /** Mono + tabular. True for every money, quantity or date column. */
  mono?: boolean;
}

export interface PrintLineTableRow {
  /** item = a line. group = a full-width category heading. subtotal / total = banded. */
  kind?: "item" | "group" | "subtotal" | "total";
  /** Cells in column order. Alternatively give a key per column. */
  cells?: ReactNode[];
  /** Second line under the first cell, small and grey — scope detail, not a second line item. */
  note?: ReactNode;
  muted?: boolean;
  [key: string]: unknown;
}

/**
 * Ruled line-item table for printed documents. The head repeats on every page.
 *
 * @startingPoint section="Print" subtitle="Ruled line items with groups and subtotals" viewport="612x360"
 */
export interface PrintLineTableProps {
  columns: PrintLineTableColumn[];
  rows: PrintLineTableRow[];
  caption?: ReactNode;
  /** Tighter rows for a budget with 30+ lines. */
  dense?: boolean;
}

export function PrintLineTable(props: PrintLineTableProps): JSX.Element;
