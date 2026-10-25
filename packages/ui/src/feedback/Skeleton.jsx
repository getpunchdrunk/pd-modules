/**
 * Loading placeholder. Blocks match the real geometry they stand in for, so
 * nothing jumps when data lands. One slow opacity pulse from .pd-skeleton.
 */
export function Skeleton({ variant = "text", lines = 3, rows = 5, width, height, radius }) {
  const bar = (w, h, r, k) => (
    <span
      key={k}
      className="pd-skeleton"
      style={{
        display: "block",
        width: w,
        height: h,
        borderRadius: r || "var(--radius-sm)",
        flex: "0 0 auto"
      }}
    />
  );

  if (variant === "block") {
    return bar(width || "100%", height || 120, radius || "var(--radius-lg)", "b");
  }

  if (variant === "circle") {
    const d = width || height || 30;
    return bar(d, d, "var(--radius-pill)", "c");
  }

  if (variant === "rows") {
    const list = [];
    for (let i = 0; i < rows; i++) {
      list.push(
        <div
          key={i}
          style={{
            height: "var(--row-height)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 16px",
            borderBottom: i === rows - 1 ? "none" : "1px solid var(--border-subtle)"
          }}
        >
          {bar("34%", 11, null, "a")}
          {bar("18%", 11, null, "b")}
          <span style={{ flex: 1 }} />
          {bar(72, 11, null, "c")}
        </div>
      );
    }
    return <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>{list}</div>;
  }

  const list = [];
  for (let i = 0; i < lines; i++) {
    list.push(bar(i === lines - 1 ? "60%" : "100%", 11, null, i));
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: width || "100%", minWidth: 0 }}>{list}</div>
  );
}
