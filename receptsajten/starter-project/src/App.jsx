import "./App.css";
import Counter from "./components/Counter";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Header count={count} />
      <Counter count={count} setCount={setCount} />
    </>
  );
}

export default App;
