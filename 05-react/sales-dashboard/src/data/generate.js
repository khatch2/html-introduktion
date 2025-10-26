// Fast seeded PRNG so the dataset is reproducible
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const CATEGORIES = [
  "Books",
  "Electronics",
  "Games",
  "Home",
  "Sports",
  "Clothing",
  "Beauty",
];
const REGIONS = ["North", "South", "East", "West", "Online"];

function randomChoice(arr, rnd) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function makeHugeDataset({
  count = 120_000,
  start = new Date(new Date().getFullYear(), 0, 1).getTime(), // Jan 1
  end = Date.now(),
  seed = 42,
} = {}) {
  const rnd = mulberry32(seed);
  const rows = new Array(count);
  const span = end - start;

  for (let i = 0; i < count; i++) {
    const category = randomChoice(CATEGORIES, rnd);
    const unitPrice = Math.round((5 + rnd() * 295) * 100) / 100; // $5-$300
    const qty = 1 + Math.floor(rnd() * 5); // 1-5 units
    const discount = rnd() < 0.08 ? Math.round(rnd() * 30) : 0; // occasional discount %
    const ts = start + Math.floor(rnd() * span);

    rows[i] = {
      id: i + 1,
      date: new Date(ts).toISOString(),
      region: randomChoice(REGIONS, rnd),
      category,
      product: `${category} ${Math.floor(rnd() * 5000) + 1}`,
      unitPrice,
      quantity: qty,
      discount, // percent
      revenue: Math.round(unitPrice * qty * (1 - discount / 100) * 100) / 100,
      customer: `C${String(Math.floor(rnd() * 900000) + 100000)}`,
      channel: rnd() < 0.6 ? "Online" : "Retail",
    };
  }
  return { rows, CATEGORIES, REGIONS };
}
