import type { ReactNode } from "react";

/**
 * Page title, one line of orientation, and the page's primary action.
 *
 * @startingPoint section="Layout" subtitle="27px heading, subtitle, primary action" viewport="760x140"
 */
export interface PageHeaderProps {
  /** Uppercase 10.5px label above the title. Use only where the page is part of a set. */
  eyebrow?: string;
  title: string;
  /** One line saying what this page holds. Not marketing copy. */
  subtitle?: ReactNode;
  /** At most one primary Button, plus secondaries. */
  actions?: ReactNode;
}

export function PageHeader(props: PageHeaderProps): JSX.Element;
