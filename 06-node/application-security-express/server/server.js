import express from "express";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// här läggs kod in

import escapeHTML from "escape-html";

app.get("/echo", (req, res) => {
  const input = req.query.msg || "";
  res.send(`<h1>${input}</h1>`);

  // res.send(`<h1>${escapeHTML(input)}</h1>`);
});

app.listen(3001, () => console.log("Server på http://localhost:3001"));
