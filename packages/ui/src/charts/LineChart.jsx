import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

/**
 * Line or area over time. Sky is the default series; pink is reserved for the
 * series someone has to act on (over budget, overdue), because pink means
 * "you can click this or it needs attention" everywhere else in the system.
 */
const AXIS = {
  stroke: "var(--border-default)",
  tick: {
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    fill: "var(--text-muted)"
  }
};

export function LineChart({
  data,
  xKey = "x",
  series = [],
  area = false,
  reference,
  yTickFormatter,
  xTickFormatter,
  grid = true,
  tooltipFormatter
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: 0 }}>
        {grid && <CartesianGrid stroke="var(--border-subtle)" vertical={false} />}
        <XAxis
          dataKey={xKey}
          tickFormatter={xTickFormatter}
          axisLine={{ stroke: AXIS.stroke }}
          tickLine={false}
          tick={AXIS.tick}
          tickMargin={8}
        />
        <YAxis
          tickFormatter={yTickFormatter}
          axisLine={false}
          tickLine={false}
          tick={AXIS.tick}
          width={48}
          tickMargin={6}
        />
        <Tooltip
          formatter={tooltipFormatter}
          cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
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
            y={reference.y}
            segment={reference.segment}
            stroke={reference.color || "var(--text-muted)"}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={
              reference.label
                ? {
                    value: reference.label,
                    position: "insideTopRight",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10.5,
                    fill: "var(--text-muted)"
                  }
                : undefined
            }
          />
        )}
        {series.map((s) =>
          area ? (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color || "hsl(var(--chart-2))"}
              strokeWidth={2}
              fill={s.color || "hsl(var(--chart-2))"}
              fillOpacity={0.12}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          ) : (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color || "hsl(var(--chart-2))"}
              strokeWidth={2}
              strokeDasharray={s.dashed ? "4 4" : undefined}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          )
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
