import type { ForwardRefExoticComponent, ReactNode, RefAttributes, TextareaHTMLAttributes } from "react";

/** Multiline field with Input's label, hint and error conventions.
 * @startingPoint section="Forms" subtitle="Multiline notes with optional bounded growth" viewport="700x240"
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  /** Replaces the hint and sets aria-invalid. */
  error?: ReactNode;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Minimum visible rows; defaults to 3. */
  rows?: number;
  /** Resize to content on input, value changes and width changes. Defaults to false. */
  autoGrow?: boolean;
  /** Growth cap in rows, defaults to 10; never smaller than rows. Scrolls beyond the cap. */
  maxRows?: number;
}
export const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>>;
