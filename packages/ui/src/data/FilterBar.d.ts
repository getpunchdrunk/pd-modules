import type { ReactNode } from "react";

/**
 * Search, dropdowns, filter chips and the result count.
 *
 * @startingPoint section="Data" subtitle="Search, two selects, quick-filter chips, result count" viewport="820x120"
 */
export interface FilterBarProps {
  /** An Input with a search icon, 260px. Always first. */
  search?: ReactNode;
  /** Select / Combobox controls, 34px, in decreasing order of use. */
  filters?: ReactNode;
  /** FilterChip elements. Separated from the selects by a 1px divider. */
  chips?: ReactNode;
  /** "Showing 10 of 42" — figures in mono. Pushed to the right edge. */
  meta?: ReactNode;
  /** Anything that must sit left of the count (a view switcher, a density toggle). */
  right?: ReactNode;
}

export interface FilterChipProps {
  label: ReactNode;
  count?: number | string;
  /** Active chips are navy-tinted, not pink — a filter is a view, not an action. */
  active?: boolean;
  onClick?: () => void;
}

export function FilterBar(props: FilterBarProps): JSX.Element;
export function FilterChip(props: FilterChipProps): JSX.Element;
