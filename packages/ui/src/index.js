/* @punch-drunk/ui — 47 components in nine families.
 *
 * Published as source with no build step, matching @punch-drunk/auth: main and
 * types point at src. Import from the package root; the families are an
 * organising convention, not separate entry points.
 *
 * Every component reads its values from @punch-drunk/tokens. None of them
 * contains a literal hex, rgba(), shadow, tracking value or radius.
 */

/* core — Primitives */
export * from "./core/Button.jsx";
export * from "./core/IconButton.jsx";
export * from "./core/Badge.jsx";
export * from "./core/Card.jsx";

/* forms — Form controls */
export * from "./forms/Input.jsx";
export * from "./forms/Textarea.jsx";
export * from "./forms/Select.jsx";
export * from "./forms/SegmentedControl.jsx";
export * from "./forms/Combobox.jsx";

/* data — Tables and the chrome around them */
export * from "./data/Table.jsx";
export * from "./data/FilterBar.jsx";
export * from "./data/BulkActionBar.jsx";
export * from "./data/Pagination.jsx";
export * from "./data/StatBlock.jsx";

/* feedback — Overlays, empty, loading and staleness */
export * from "./feedback/Dialog.jsx";
export * from "./feedback/Toast.jsx";
export * from "./feedback/EmptyState.jsx";
export * from "./feedback/Skeleton.jsx";
export * from "./feedback/SourceStatus.jsx";
export * from "./feedback/StaleBadge.jsx";

/* layout — The screen frame */
export * from "./layout/AppShell.jsx";
export * from "./layout/Sidebar.jsx";
export * from "./layout/NavItem.jsx";
export * from "./layout/Topbar.jsx";
export * from "./layout/PageHeader.jsx";

/* charts — Recharts is a peer dependency for LineChart, BarChart, StackedBarChart and DonutChart; ChartFrame and BarCell are dependency-free */
export * from "./charts/ChartFrame.jsx";
export * from "./charts/LineChart.jsx";
export * from "./charts/BarChart.jsx";
export * from "./charts/StackedBarChart.jsx";
export * from "./charts/DonutChart.jsx";
export * from "./charts/BarCell.jsx";

/* calendar — CalendarWeek is also the day view — there is no Day component */
export * from "./calendar/CalendarMonth.jsx";
export * from "./calendar/CalendarWeek.jsx";
export * from "./calendar/CalendarAgenda.jsx";
export * from "./calendar/CalendarNav.jsx";
export * from "./calendar/EventChip.jsx";
export * from "./calendar/DatePicker.jsx";

/* kanban — One board; the grouping axis is a prop */
export * from "./kanban/KanbanBoard.jsx";
export * from "./kanban/KanbanColumn.jsx";
export * from "./kanban/KanbanCard.jsx";

/* print — Paper surfaces. PrintInvoice is a whole document composed from the other six */
export * from "./print/PrintDocHeader.jsx";
export * from "./print/PrintPartyBlock.jsx";
export * from "./print/PrintLineTable.jsx";
export * from "./print/PrintTotals.jsx";
export * from "./print/PrintNote.jsx";
export * from "./print/PrintFooter.jsx";
export * from "./print/PrintInvoice.jsx";
