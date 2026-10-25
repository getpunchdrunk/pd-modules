/**
 * Table footer with page keys.
 *
 * @startingPoint section="Data" subtitle="Row range, page keys, disabled bounds" viewport="820x90"
 */
export interface PaginationProps {
  page?: number;
  pageCount?: number;
  /** Rows per page. With total, the footer reads "Showing 1–10 of 42". */
  pageSize?: number;
  total?: number;
  onPage?: (page: number) => void;
  /** How many numbered keys to show around the current page. */
  maxKeys?: number;
  /** Rendered as the table card's footer (default): sunken, 1px top rule. */
  inCard?: boolean;
}

export function Pagination(props: PaginationProps): JSX.Element;
