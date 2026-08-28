import type { ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  /** Right-aligned mono detail — a count, a date, a size. */
  meta?: ReactNode;
}

/**
 * Searchable single- or multi-select. Fully controlled — the caller owns filtering.
 *
 * @startingPoint section="Forms" subtitle="Searchable multi-select with chips and results list" viewport="700x260"
 */
export interface ComboboxProps {
  label?: ReactNode;
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Already-filtered options. This component does not filter for you. */
  options?: (string | ComboboxOption)[];
  /** Array of selected values (multi) or a single value in an array. */
  selected?: string[] | string;
  onToggle?: (value: string) => void;
  multi?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  /** Shown when options is empty. Say what to try, not just "no results". */
  emptyMessage?: ReactNode;
  maxVisible?: number;
}

export function Combobox(props: ComboboxProps): JSX.Element;
