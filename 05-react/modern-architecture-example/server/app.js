// Bygg en “Hello World”-server i Node.js & Express
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
