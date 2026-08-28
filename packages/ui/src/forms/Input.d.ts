import type { ChangeEventHandler, ReactNode } from "react";

/**
 * Single-line text or number field with optional prefix/suffix.
 *
 * @startingPoint section="Forms" subtitle="Text, currency and date fields with hint and error states" viewport="700x200"
 */
export interface InputProps {
  label?: ReactNode;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  /** Fixed leading glyph, e.g. "$". Rendered in mono, outside the editable area. */
  prefix?: ReactNode;
  /** Trailing unit or note, e.g. "hours", "GB". */
  suffix?: ReactNode;
  type?: "text" | "number" | "email" | "password" | "date" | "search" | "tel" | "url";
  /** Renders the value in mono with tabular figures. Use for money, hours, counts, dates. */
  numeric?: boolean;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  /** Persistent helper text. Replaced by `error` when present. */
  hint?: ReactNode;
  /** Error message. Sets aria-invalid and the pink border. */
  error?: ReactNode;
  id?: string;
}

export function Input(props: InputProps): JSX.Element;
