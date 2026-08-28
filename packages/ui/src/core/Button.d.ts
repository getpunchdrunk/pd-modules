import type { ReactNode, MouseEventHandler } from "react";

/**
 * The one button. Primary is pink and there is at most one per view region.
 *
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost and danger buttons in three sizes" viewport="700x150"
 */
export interface ButtonProps {
  children: ReactNode;
  /** primary = the single most important action here. danger is destructive but reversible. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** sm 26px (inside table rows), md 34px (default), lg 40px (empty states, forms) */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: ButtonProps): JSX.Element;
