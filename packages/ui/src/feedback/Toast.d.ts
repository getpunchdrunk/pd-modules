import type { ReactNode } from "react";

/**
 * Transient confirmation, usually carrying an undo.
 *
 * @startingPoint section="Feedback" subtitle="Dark confirmation toast with undo and countdown" viewport="700x140"
 */
export interface ToastProps {
  /** States the fact: "Task closed", "Link expired", "Dates updated". */
  message: ReactNode;
  /** The specific record acted on, rendered muted after an em dash. */
  detail?: ReactNode;
  /** attention = a light pink surface for a warning that isn't an error. */
  tone?: "default" | "attention";
  onUndo?: () => void;
  undoLabel?: string;
  /** Remaining dwell in seconds, shown in mono. Dwell is 8s (--toast-dwell). */
  secondsLeft?: number;
  onDismiss?: () => void;
  width?: number;
}

export function Toast(props: ToastProps): JSX.Element;
