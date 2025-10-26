import React, { useEffect, useMemo, useState } from "react";
import { makeHugeDataset } from "./data/generate";
import Kpi from "./components/Kpi";
import BarChart from "./components/BarChart";
import VirtualTable from "./components/VirtualTable";
import { fmtCurrency, fmtDate } from "./utils/format";

const {
  rows: ALL_ROWS,
  CATEGORIES,
  REGIONS,
} = makeHugeDataset({ count: 120_000 });

export default function App() {
  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [sortBy, setSortBy] = useState("date_desc");
  const [dateFrom, setDateFrom] = useState(getYearStartISO());
  const [dateTo, setDateTo] = useState(new Date().toISOString().slice(0, 10));

  // Filtering (runs EVERY render, even if filters didn’t change)
  const q = query.trim().toLowerCase();
  const filtered = ALL_ROWS.filter((r) => {
    if (r.unitPrice < minPrice) return false;
    if (category !== "All" && r.category !== category) return false;
    if (region !== "All" && r.region !== region) return false;
    if (q && !r.product.toLowerCase().includes(q)) return false;
    return true;
  });

  // Sorting (runs EVERY render)
  const sorted = [...filtered].sort((a, b) => b.revenue - a.revenue);

  // KPIs (runs EVERY render)
  const revenue = filtered.reduce((s, r) => s + r.revenue, 0);
  const kpis = { orders: filtered.length, revenue };

  // Chart Data (runs EVERY render)
  const counts = new Map();
  for (const r of filtered) {
    counts.set(r.category, (counts.get(r.category) ?? 0) + r.revenue);
  }
  const chartData = CATEGORIES.map((c) => ({
    label: c,
    value: counts.get(c) ?? 0,
  }));

  // Focus search on mount (nice UX)
  useEffect(() => {
    const el = document.getElementById("search");
    el?.focus();
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        padding: 24,
        maxWidth: 1300,
        margin: "0 auto",
      }}
    >
      <h1 style={{ margin: "0 0 12px" }}>Sales Dashboard</h1>

      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr repeat(2, 1fr) 1fr 1fr 1fr 1fr",
          gap: 12,
          alignItems: "end",
          marginBottom: 16,
        }}
      >
        <div>
          <label>Search</label>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Product or customer…"
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          >
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          >
            <option>All</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Min Unit Price: ${minPrice}</label>
          <input
            type="range"
            min={0}
            max={300}
            step={5}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            style={{ width: "100%", marginTop: 6 }}
          />
        </div>

        <div>
          <label>From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div>
          <label>To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div>
          <label>Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          >
            <option value="date_desc">Date ↓</option>
            <option value="date_asc">Date ↑</option>
            <option value="revenue_desc">Revenue ↓</option>
            <option value="revenue_asc">Revenue ↑</option>
            <option value="price_desc">Unit Price ↓</option>
            <option value="price_asc">Unit Price ↑</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}
      >
        <Kpi label="Orders" value={kpis.orders.toLocaleString()} />
        <Kpi label="Revenue" value={fmtCurrency(kpis.revenue)} />
        <Kpi label="Avg Order Value" value={fmtCurrency(kpis.aov)} />
        <Kpi
          label="Conversion (sim)"
          value={
            kpis.orders
              ? `${(Math.min(1, kpis.orders / 250_000) * 100).toFixed(1)}%`
              : "0%"
          }
        />
      </div>

      {/* Main grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 16 }}
      >
        <BarChart title="Revenue by Category (filtered)" data={chartData} />
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <strong>
              Transactions ({sorted.length.toLocaleString()} shown)
            </strong>
            <span style={{ color: "#666" }}>
              Tip: with 120k rows, we’re using memoized transforms + a
              virtualized table for smooth scrolling.
            </span>
          </div>
          <VirtualTable
            rows={sorted}
            height={520}
            rowHeight={36}
            columns={[
              { key: "id", header: "ID" },
              { key: "date", header: "Date", render: (v) => fmtDate(v) },
              { key: "region", header: "Region" },
              { key: "category", header: "Category" },
              { key: "product", header: "Product" },
              { key: "customer", header: "Customer" },
              {
                key: "unitPrice",
                header: "Unit",
                render: (v) => fmtCurrency(v),
              },
              { key: "quantity", header: "Qty" },
              {
                key: "discount",
                header: "Disc.",
                render: (v) => (v ? `${v}%` : "—"),
              },
              {
                key: "revenue",
                header: "Revenue",
                render: (v) => fmtCurrency(v),
              },
              { key: "channel", header: "Channel" },
            ]}
          />
        </div>
      </div>

      <p style={{ marginTop: 12, color: "#666" }}>
        Try typing in the search box or sliding the price filter — transforms
        only recompute when inputs change (thanks to <code>useMemo</code>).
      </p>
    </div>
  );
}

function getYearStartISO() {
  const d = new Date();
  return new Date(d.getFullYear(), 0, 1).toISOString().slice(0, 10);
}
