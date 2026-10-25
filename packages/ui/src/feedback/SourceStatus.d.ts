export interface Source {
  /** The system's name as people say it: "FileTransfers", "Basecamp". */
  name: string;
  /** ok = answered on this refresh. stale = answered, but old. failed = did not answer. */
  status: "ok" | "stale" | "failed" | "idle";
  /** When it last answered, pre-formatted: "4:12 PM". */
  at: string;
}

/**
 * Per-source freshness list, so a stale figure has a name attached.
 *
 * @startingPoint section="Feedback" subtitle="Six sources, one failed" viewport="360x260"
 */
export interface SourceStatusProps {
  sources: Source[];
  /** 7px rows instead of 8px, for a narrow rail. */
  compact?: boolean;
}

export function SourceStatus(props: SourceStatusProps): JSX.Element;
