import type { ChangeEventHandler, ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Native select with our chrome. For 6+ options that need filtering, use Combobox.
 *
 * @startingPoint section="Forms" subtitle="Dropdown with placeholder, hint and error states" viewport="700x160"
 */
export interface SelectProps {
  label?: ReactNode;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  /** Strings or {value,label} pairs. */
  options?: (string | SelectOption)[];
  /** Empty-value first option, e.g. "All clients". Not a label substitute. */
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  invalid?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  id?: string;
}

export function Select(props: SelectProps): JSX.Element;
