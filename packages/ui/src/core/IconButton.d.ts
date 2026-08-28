import type { ReactNode, MouseEventHandler } from "react";

/** A square button holding a single Lucide icon. `label` is required — it is the accessible name and the tooltip. */
export interface IconButtonProps {
  icon: ReactNode;
  /** Required. Verb-first, e.g. "Refresh sources", "Remove file". */
  label: string;
  variant?: "secondary" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function IconButton(props: IconButtonProps): JSX.Element;
