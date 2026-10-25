import { KanbanColumn } from "./KanbanColumn.jsx";

/**
 * The board. Columns are data, not code: the same component groups tasks by
 * status, projects by stage, invoices by approval step or crew by availability
 * — pass the axis in. Optional swimlanes put a second axis on the rows.
 */
export function KanbanBoard({
  columns = [],
  renderCard,
  swimlanes,
  columnWidth = 280,
  columnMaxHeight,
  gap = 12,
  columnFooter
}) {
  const lane = (laneKey) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap, minWidth: 0 }}>
      {columns.map((c) => {
        const items = laneKey == null ? c.items || [] : (c.items || []).filter((i) => i.lane === laneKey);
        return (
          <KanbanColumn
            key={c.id + ":" + String(laneKey)}
            label={c.label}
            count={items.length}
            wipLimit={c.wipLimit}
            tone={c.tone}
            width={columnWidth}
            maxHeight={columnMaxHeight}
            footer={columnFooter ? columnFooter(c) : undefined}
          >
            {items.map((item, i) => (renderCard ? renderCard(item, i) : null))}
          </KanbanColumn>
        );
      })}
    </div>
  );

  if (!swimlanes || !swimlanes.length) {
    return <div style={{ overflowX: "auto", paddingBottom: 4, minWidth: 0 }}>{lane(null)}</div>;
  }

  return (
    <div style={{ overflowX: "auto", paddingBottom: 4, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      {swimlanes.map((s) => (
        <div key={s.key} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "var(--tracking-heading-sm)"
              }}
            >
              {s.label}
            </span>
            <span style={{ height: 1, flex: 1, background: "var(--border-default)" }} />
          </div>
          {lane(s.key)}
        </div>
      ))}
    </div>
  );
}
