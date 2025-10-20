import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function ExpensiveList({ items, filter }) {
  const filtered = useMemo(() => {
    console.log("Räknar om...");
    const list = items ?? [];
    const term = filter ?? "";
    return list.filter((item) => String(item).includes(term));
  }, [items, filter]);
  return (
    <ul>
      {filtered.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const items = [
    "apple",
    "banana",
    "orange",
    "pear",
    "pineapple",
    "mango",
    "grape",
  ];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div style={{ marginTop: "1rem" }}>
          <label>
            Filter:{" "}
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="type to filter..."
            />
          </label>
        </div>
        <ExpensiveList items={items} filter={filter} />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
