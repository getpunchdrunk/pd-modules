import type { ReactNode } from "react";

/**
 * Modal confirm. Required for money and client-facing actions.
 *
 * @startingPoint section="Feedback" subtitle="Confirm dialog with facts, default and danger tones" viewport="700x300"
 */
export interface DialogProps {
  open?: boolean;
  /** Names the consequence, not the control: "Approve $14,180 to Cine Rentals NW". */
  title?: ReactNode;
  /** The facts the person needs to decide. Amount, counterparty, what changes downstream. */
  description?: ReactNode;
  /** Optional extra content — a variance note, a list of affected records. */
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** danger = destructive or irreversible. Renders the confirm as a light pink surface. */
  tone?: "default" | "danger";
  /** Disables confirm and shows "Working…" while the cross-app write is in flight. */
  busy?: boolean;
  width?: number;
}

export function Dialog(props: DialogProps): JSX.Element | null;
