import { useEffect, useState } from 'react';
import './App.css' 

const port = 3000;
const url = "http://localhost:";
const path = "/api/hello";

// const urlPath = "http://localhost:3000/api/hello"

console.log("url path:", `${url}${port}${path}`);

async function fetchData () {
  const response = await fetch(`${url}${port}${path}`)
  const data = await response.text();

  return data
}

function App() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData("Failed to load data");
    }
  };

  useEffect(() => {
    getData();
  }, [])

  console.log(data)


  return (
    <>
      <h1>Hello!</h1>
      {data ? <p>{data}</p> : <p>Loading...</p> }
    </>
  )
}

export default App
