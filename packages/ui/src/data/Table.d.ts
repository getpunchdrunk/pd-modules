import type { ReactNode } from "react";

export interface TableColumn<Row = any> {
  key: string;
  label: ReactNode;
  /** Fixed track width in px. REQUIRED for any column holding a control, badge, or fixed-width figure. */
  width?: number;
  /** Flex ratio, used only when width is absent. Always wrapped in minmax(0, Nfr) internally. */
  flex?: number;
  align?: "left" | "right" | "center";
  /** Renders in mono with tabular figures. Implied by align: "right". */
  numeric?: boolean;
  /** Primary text in the row (project name, filename). Darker and medium weight. */
  strong?: boolean;
  tone?: "default" | "muted";
  /** Single line with an ellipsis and the full string as a title tooltip. For filenames and long names. */
  truncate?: boolean;
  nowrap?: boolean;
  render?: (row: Row) => ReactNode;
}

/**
 * Dense grid table that owns its own column math.
 *
 * @startingPoint section="Data" subtitle="Grid table with fixed and flexible tracks" viewport="700x260"
 */
export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  rows: Row[];
  rowKey?: (row: Row, index: number) => string | number;
  onRowClick?: (row: Row) => void;
  /** Shown instead of the grid when rows is empty. Say what would be here and how to get it. */
  emptyMessage?: ReactNode;
  /** 8px vertical cell padding instead of 10px. For sidebars and rails, not main tables. */
  dense?: boolean;
}

export function Table<Row = any>(props: TableProps<Row>): JSX.Element;
