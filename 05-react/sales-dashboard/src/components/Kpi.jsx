import React from "react";

export default function Kpi({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e6e6e6",
        padding: 12,
        borderRadius: 10,
        minWidth: 220,
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
