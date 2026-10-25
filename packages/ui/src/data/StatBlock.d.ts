import type { ReactNode } from "react";

/**
 * A single figure in a card, with an optional breakdown underneath.
 *
 * @startingPoint section="Data" subtitle="Figure, eyebrow label, tinted icon, footnote" viewport="760x200"
 */
export interface StatBlockProps {
  /** Uppercase eyebrow. Names the figure plainly: "Unbilled & ready to invoice". */
  label: string;
  /** Pre-formatted: "$52,940", "38.5", "96". The block does not format for you. */
  value: ReactNode;
  /** What the figure counts — "across 6 projects", "hours". */
  unit?: ReactNode;
  /** 15px Lucide icon using stroke="currentColor". */
  icon?: ReactNode;
  /** attention = needs action (pink). positive = money in your favor (navy). info = neutral state (sky). */
  tone?: "default" | "attention" | "positive" | "info";
  footnote?: ReactNode;
  /** One Button, full width, at the foot. */
  action?: ReactNode;
  /** sm = 19px figure, for rails and three-up rows. md = 27px. */
  size?: "sm" | "md";
  /** A breakdown list between the figure and the footnote. */
  children?: ReactNode;
}

export function StatBlock(props: StatBlockProps): JSX.Element;
