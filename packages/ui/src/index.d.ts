/* @punch-drunk/ui — type declarations for the barrel.
 *
 * Mirrors index.js family by family. `package.json` points `types` here, the
 * same way `main` points at index.js; both live in src because the package is
 * published as source with no build step.
 *
 * Specifiers are extension-less on purpose: each one resolves to the sibling
 * <Component>.d.ts, which is where every props contract already lives. Nothing
 * is re-declared here — this file only re-exports.
 */

/* core — Primitives */
export * from "./core/Button";
export * from "./core/IconButton";
export * from "./core/Badge";
export * from "./core/Card";

/* forms — Form controls */
export * from "./forms/Input";
export * from "./forms/Textarea";
export * from "./forms/Select";
export * from "./forms/SegmentedControl";
export * from "./forms/Combobox";

/* data — Tables and the chrome around them */
export * from "./data/Table";
export * from "./data/FilterBar";
export * from "./data/BulkActionBar";
export * from "./data/Pagination";
export * from "./data/StatBlock";

/* feedback — Overlays, empty, loading and staleness */
export * from "./feedback/Dialog";
export * from "./feedback/Toast";
export * from "./feedback/EmptyState";
export * from "./feedback/Skeleton";
export * from "./feedback/SourceStatus";
export * from "./feedback/StaleBadge";

/* layout — The screen frame */
export * from "./layout/AppShell";
export * from "./layout/Sidebar";
export * from "./layout/NavItem";
export * from "./layout/Topbar";
export * from "./layout/PageHeader";

/* charts — Recharts is a peer dependency for LineChart, BarChart, StackedBarChart and DonutChart; ChartFrame and BarCell are dependency-free */
export * from "./charts/ChartFrame";
export * from "./charts/LineChart";
export * from "./charts/BarChart";
export * from "./charts/StackedBarChart";
export * from "./charts/DonutChart";
export * from "./charts/BarCell";

/* calendar — CalendarWeek is also the day view — there is no Day component */
export * from "./calendar/CalendarMonth";
export * from "./calendar/CalendarWeek";
export * from "./calendar/CalendarAgenda";
export * from "./calendar/CalendarNav";
export * from "./calendar/EventChip";
export * from "./calendar/DatePicker";

/* kanban — One board; the grouping axis is a prop */
export * from "./kanban/KanbanBoard";
export * from "./kanban/KanbanColumn";
export * from "./kanban/KanbanCard";

/* print — Paper surfaces. PrintInvoice is a whole document composed from the other six */
export * from "./print/PrintDocHeader";
export * from "./print/PrintPartyBlock";
export * from "./print/PrintLineTable";
export * from "./print/PrintTotals";
export * from "./print/PrintNote";
export * from "./print/PrintFooter";
export * from "./print/PrintInvoice";
