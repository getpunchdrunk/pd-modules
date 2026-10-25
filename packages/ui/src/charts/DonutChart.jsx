import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

/**
 * Share of a total. Only for parts that genuinely sum to one whole — anything
 * else is a bar chart. The total sits in the hole, because that is the number
 * people actually read.
 */
const RAMP = [
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))"
];

export function DonutChart({ data, nameKey = "name", valueKey = "value", total, totalLabel, tooltipFormatter }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            innerRadius="66%"
            outerRadius="94%"
            paddingAngle={1.5}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color || RAMP[i % RAMP.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-overlay)",
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              padding: "6px 8px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {total != null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            pointerEvents: "none"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 19,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-heading-sm)"
            }}
          >
            {total}
          </span>
          {totalLabel && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10.5,
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase"
              }}
            >
              {totalLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
