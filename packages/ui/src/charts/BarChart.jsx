import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

/**
 * Categorical comparison. Vertical when the category axis is time (a month, a
 * week, a quarter); horizontal when the categories are named things, because a
 * client name cannot be read rotated. Sky is the default series; pink marks the
 * one bar or series someone has to act on.
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

export function BarChart({
  data,
  categoryKey = "label",
  series = [],
  orientation = "vertical",
  attention,
  reference,
  valueTickFormatter,
  categoryTickFormatter,
  categoryWidth = 132,
  barSize,
  grid = true,
  tooltipFormatter
}) {
  const horizontal = orientation === "horizontal";
  const gap = series.length > 1 ? 4 : 0;
  const size = barSize ?? (series.length > 1 ? 14 : horizontal ? 16 : 22);

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
      tickFormatter={valueTickFormatter}
      axisLine={false}
      tickLine={false}
      tick={TICK}
      tickMargin={6}
    />
  ) : (
    <YAxis
      type="number"
      tickFormatter={valueTickFormatter}
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
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        barGap={gap}
        barCategoryGap="28%"
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
        {reference && (
          <ReferenceLine
            {...(horizontal ? { x: reference.value } : { y: reference.value })}
            stroke={reference.color || "var(--text-muted)"}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={
              reference.label
                ? {
                    value: reference.label,
                    position: horizontal ? "insideTopRight" : "insideTopRight",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10.5,
                    fill: "var(--text-muted)"
                  }
                : undefined
            }
          />
        )}
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color || "hsl(var(--chart-2))"}
            barSize={size}
            radius={horizontal ? [0, 2, 2, 0] : [2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {attention &&
              data.map((row, i) => (
                <Cell
                  key={i}
                  fill={
                    attention(row, s.key)
                      ? "hsl(var(--chart-1))"
                      : s.color || "hsl(var(--chart-2))"
                  }
                />
              ))}
          </Bar>
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
