import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { clamp } from "../utils/format";

/** Simple, dependency-free virtualized table. */
export default React.memo(function VirtualTable({
  rows,
  columns,
  rowHeight = 36,
  height = 480,
}) {
  const scrollRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = rows.length * rowHeight;
  const visibleCount = Math.ceil(height / rowHeight) + 6; // buffer
  const startIndex = clamp(
    Math.floor(scrollTop / rowHeight) - 3,
    0,
    Math.max(0, rows.length - visibleCount)
  );
  const endIndex = Math.min(rows.length, startIndex + visibleCount);
  const slice = rows.slice(startIndex, endIndex);

  const onScroll = useCallback(
    (e) => setScrollTop(e.currentTarget.scrollTop),
    []
  );
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const header = useMemo(
    () => (
      <thead
        style={{ position: "sticky", top: 0, background: "#fafafa", zIndex: 1 }}
      >
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              style={{
                textAlign: "left",
                borderBottom: "1px solid #eee",
                padding: 10,
              }}
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
    ),
    [columns]
  );

  return (
    <div
      style={{
        border: "1px solid #e6e6e6",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div ref={scrollRef} style={{ height, overflow: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            position: "relative",
          }}
        >
          {header}
          <tbody>
            <tr style={{ height: startIndex * rowHeight }} />
            {slice.map((row, i) => (
              <tr key={row.id} style={{ height: rowHeight }}>
                {columns.map((c) => (
                  <td
                    key={c.key}
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #f3f3f3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.render ? c.render(row[c.key], row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ height: (rows.length - endIndex) * rowHeight }} />
          </tbody>
        </table>
      </div>
    </div>
  );
});
