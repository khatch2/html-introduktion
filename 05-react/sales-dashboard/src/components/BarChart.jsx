import React, { useMemo } from "react";

/** Minimal SVG bar chart (no libs). Expects data: [{label, value}]. */
export default React.memo(function BarChart({ title, data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const view = { w: 640, h: 240, pad: 24 };
  const barW = (view.w - view.pad * 2) / data.length;

  const bars = useMemo(
    () =>
      data.map((d, i) => {
        const h = (d.value / max) * (view.h - view.pad * 2);
        return {
          x: view.pad + i * barW,
          y: view.h - view.pad - h,
          h,
          label: d.label,
          value: d.value,
        };
      }),
    [data, max, barW]
  );

  return (
    <div style={{ border: "1px solid #e6e6e6", padding: 12, borderRadius: 10 }}>
      <strong>{title}</strong>
      <svg
        width="100%"
        viewBox={`0 0 ${view.w} ${view.h}`}
        role="img"
        aria-label={title}
      >
        <line
          x1={view.pad}
          y1={view.h - view.pad}
          x2={view.w - view.pad}
          y2={view.h - view.pad}
          stroke="currentColor"
          strokeOpacity="0.2"
        />
        {bars.map((b, i) => (
          <g key={b.label}>
            <rect
              x={b.x + 6}
              y={b.y}
              width={Math.max(4, barW - 12)}
              height={b.h}
              fill="currentColor"
              opacity="0.25"
            />
            <text
              x={b.x + barW / 2}
              y={view.h - 6}
              textAnchor="middle"
              fontSize="10"
            >
              {b.label}
            </text>
          </g>
        ))}
        <text
          x={view.w - view.pad}
          y={14}
          textAnchor="end"
          fontSize="10"
          fill="currentColor"
          opacity="0.6"
        >
          max {max.toLocaleString()}
        </text>
      </svg>
    </div>
  );
});
