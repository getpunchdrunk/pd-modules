import type { ReactNode } from "react";

/**
 * Fixed sidebar + scrolling content column. One per screen.
 *
 * @startingPoint section="Layout" subtitle="Sidebar track, pinned topbar, one scrolling column" viewport="900x420"
 */
export interface AppShellProps {
  /** A Sidebar. Omit for auth, print, error AND external/client-facing pages —
   *  then identity moves to the topbar's top right. */
  sidebar?: ReactNode;
  /** Content max-width. 1160 everywhere, all three shell tiers, so collapsing the
   *  sidebar adds gutter instead of reflowing tables. Only change it for a
   *  genuinely edge-to-edge surface. */
  maxWidth?: number | string;
  /** A Topbar. Rendered above the scroll area, never inside it. */
  topbar?: ReactNode;
  children?: ReactNode;
  /** Only set on a fixed-width demo or print frame; product screens stay fluid. */
  width?: number | string;
  minHeight?: number | string;
  /** 22/24/26px page padding. false when the content is edge-to-edge (a kanban board, a table page). */
  padded?: boolean;
  /** Vertical gap between top-level content blocks. 16 on dashboards, 14 on list pages. */
  gap?: number;
  scroll?: boolean;
}

export function AppShell(props: AppShellProps): JSX.Element;
