import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

/**
 * Composition of a total across categories. Absolute mode answers "how much";
 * share mode ("100%") answers "what proportion" and must state the real total
 * somewhere in the frame, or the percentages are unanchored.
 *
 * Segments come off the ramp starting at --chart-2. Never stack a series that
 * can go negative — use grouped bars for anything signed.
 */
const TICK = {
  fontFamily: "var(--font-mono)",
  fontSize: 10.5,
  fill: "var(--text-muted)"
};

const LABEL_TICK = {
  fontFamily: "var(--font-sans)",
  fontSize: 11.5,
  fill: "var(--text-secondary)"
};

function toShare(data, series) {
  return data.map((row) => {
    const total = series.reduce((sum, s) => sum + (Number(row[s.key]) || 0), 0) || 1;
    const out = { ...row, __total: total };
    series.forEach((s) => {
      out[s.key] = ((Number(row[s.key]) || 0) / total) * 100;
    });
    return out;
  });
}

export function StackedBarChart({
  data,
  categoryKey = "label",
  series = [],
  orientation = "vertical",
  mode = "absolute",
  valueTickFormatter,
  categoryTickFormatter,
  categoryWidth = 132,
  barSize,
  grid = true,
  tooltipFormatter
}) {
  const horizontal = orientation === "horizontal";
  const share = mode === "share";
  const rows = share ? toShare(data, series) : data;
  const size = barSize ?? (horizontal ? 18 : 26);
  const formatValue = valueTickFormatter ?? (share ? (v) => v + "%" : undefined);

  const categoryAxis = horizontal ? (
    <YAxis
      type="category"
      dataKey={categoryKey}
      tickFormatter={categoryTickFormatter}
      axisLine={{ stroke: "var(--border-default)" }}
      tickLine={false}
      tick={LABEL_TICK}
      width={categoryWidth}
      tickMargin={8}
    />
  ) : (
    <XAxis
      type="category"
      dataKey={categoryKey}
      tickFormatter={categoryTickFormatter}
      axisLine={{ stroke: "var(--border-default)" }}
      tickLine={false}
      tick={TICK}
      tickMargin={8}
    />
  );

  const valueAxis = horizontal ? (
    <XAxis
      type="number"
      domain={share ? [0, 100] : undefined}
      tickFormatter={formatValue}
      axisLine={false}
      tickLine={false}
      tick={TICK}
      tickMargin={6}
    />
  ) : (
    <YAxis
      type="number"
      domain={share ? [0, 100] : undefined}
      tickFormatter={formatValue}
      axisLine={false}
      tickLine={false}
      tick={TICK}
      width={48}
      tickMargin={6}
    />
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={rows}
        layout={horizontal ? "vertical" : "horizontal"}
        barCategoryGap="30%"
        margin={{ top: 4, right: 6, bottom: 0, left: 0 }}
      >
        {grid && (
          <CartesianGrid
            stroke="var(--border-subtle)"
            vertical={horizontal}
            horizontal={!horizontal}
          />
        )}
        {categoryAxis}
        {valueAxis}
        <Tooltip
          formatter={tooltipFormatter}
          cursor={{ fill: "var(--surface-hover)" }}
          contentStyle={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-overlay)",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            padding: "6px 8px"
          }}
          labelStyle={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)" }}
        />
        {series.map((s, i) => {
          const last = i === series.length - 1;
          return (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              stackId="stack"
              fill={s.color || "hsl(var(--chart-" + Math.min(i + 2, 8) + "))"}
              barSize={size}
              radius={last ? (horizontal ? [0, 2, 2, 0] : [2, 2, 0, 0]) : 0}
              isAnimationActive={false}
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
