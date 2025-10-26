// src/utils/format.js
export const fmtCurrency = (v) => {
  const n = Number.isFinite(v) ? v : Number(v);
  const safe = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(safe);
};

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
