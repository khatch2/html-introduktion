// server.js
// Övningar i Application Security (Express) – komplett och körbar

// How to run details:
// - Install deps: express, helmet, bcrypt, escape-html.
// - Ensure ESM: add "type": "module" in the nearest package.json (or rename the file to .mjs).
// - Start: node application-security-express.js (with type:module) and open http://localhost:3001.

import express from "express";
import helmet from "helmet";
import bcrypt from "bcrypt";
import escapeHtml from "escape-html";

const app = express();

// Bas-middleware
// Viktigt: vi stänger av frameguard globalt för att demonstrera sårbar /profile som kan iframas.
// (Helmet har annars X-Frame-Options via frameguard som standard.)
app.use(helmet({ frameguard: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================================
// DEMO 1 — XSS (reflektiv)
// ============================================================

// SÅRBAR: injicerar oescapat värde i HTML
app.get("/echo", (req, res) => {
  const input = req.query.msg || "";
  res.send(`<h1>${input}</h1>`);
});
// Test (sårbar): http://localhost:3001/echo?msg=<script>alert(1)</script>

// SÄKER: escapat output med escape-html
app.get("/echo-safe", (req, res) => {
  const input = req.query.msg || "";
  res.send(`<h1>${escapeHtml(input)}</h1>`);
});
// Test (säker): http://localhost:3001/echo-safe?msg=<script>alert(1)</script>

// ============================================================
// DEMO 2 — Clickjacking (iframes)
// ============================================================

// SÅRBAR: kan iframas
app.get("/profile", (req, res) => {
  res.send("<h1>Min profil (sårbar)</h1>");
});
// Testa clickjacking: skapa attacker.html med
// <iframe src="http://localhost:3001/profile" width="400" height="200"></iframe>

// SÄKER: blockera inramning via header (per svar)
// (alternativ till globalt: app.use(helmet.frameguard({ action: "deny" })))
app.get("/profile-protected", (req, res) => {
  res.setHeader("X-Frame-Options", "DENY");
  // Modernare skydd via CSP (komplement):
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  res.send("<h1>Min profil (skyddad mot iframes)</h1>");
});
// Testa: attacker.html mot /profile-protected ska blockeras

// ============================================================
// DEMO 3 — CSRF (POST utan token)
// ============================================================

let balance = 100;

// SÅRBAR: state-ändring via POST utan CSRF-skydd
app.post("/transfer", (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).send("Ogiltigt belopp");
  }
  balance -= amount;
  res.send(`Kvar på kontot: ${balance}`);
});

// Hjälproutes för demo
app.get("/balance", (_req, res) => {
  res.send(`Saldo: ${balance}`);
});
app.post("/reset-balance", (_req, res) => {
  balance = 100;
  res.send(`Saldo återställt: ${balance}`);
});

// CSRF-test (POST auto-submit):
// Skapa evil.html:
// <form id="csrf" action="http://localhost:3001/transfer" method="POST">
//   <input type="hidden" name="amount" value="10" />
// </form>
// <script>document.getElementById('csrf').submit();</script>

// Riktig fix i produktion: CSRF-tokens (t.ex. csrf-csrf), SameSite-cookies, och aldrig state-ändring via GET.

// ============================================================
// DEMO 4 — SQL Injection (utan riktig DB, konceptuellt)
// ============================================================

// SÅRBAR: stringinterpolerad “SQL” (vi kör inte mot DB – visar bara hur den ser ut)
app.get("/login-vuln", (req, res) => {
  const user = req.query.user ?? "";
  const pass = req.query.pass ?? "";
  const query = `SELECT * FROM users WHERE user='${user}' AND pass='${pass}'`;
  res.send(`Körde query (sårbar): ${escapeHtml(query)}`);
});
// Test: http://localhost:3001/login-vuln?user=alice&pass=' OR '1'='1

// SÄKER (utan DB): parametrisering + bcrypt.compare i app-logik
// Vi simulerar en användartabell i minnet
const users = [];
// Skapa en demoanvändare: alice / hemligt123
const demoHash = bcrypt.hashSync("hemligt123", 10);
users.push({ username: "alice", password_hash: demoHash });

// Registrera ny användare (hashar lösenord)
app.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).send("Ange 'username' och 'password'.");
  }
  const exists = users.find((u) => u.username === username);
  if (exists) return res.status(409).send("Användarnamnet är upptaget.");
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password_hash: hash });
  res.json({ username, note: "Användare skapad (lösenordet är hashat)." });
});

// Säker inloggning (utan DB): hämta user och jämför hash i Node (POST med body)
app.post("/login-safe", async (req, res) => {
  const { user, pass } = req.body || {};
  if (!user || !pass) {
    return res
      .status(400)
      .send("Skicka 'user' och 'pass' i body (JSON eller form-urlencoded)");
  }
  const u = users.find((x) => x.username === user);
  if (!u) return res.status(401).send("Fel användarnamn eller lösenord");
  const ok = await bcrypt.compare(pass, u.password_hash);
  if (!ok) return res.status(401).send("Fel användarnamn eller lösenord");
  res.json({ message: "Inloggad!", username: u.username });
});

// OBS: Om du vill koppla riktig DB (PostgreSQL) använder du parametriserade queries:
// const { rows } = await pool.query(
//   "SELECT id, username, password_hash FROM users WHERE username = $1",
//   [user]
// );
// och sedan bcrypt.compare(pass, rows[0].password_hash)

// ============================================================
// DEMO 5 — Lösenordshashning (grundläggande)
// ============================================================

// (Återanvänder /register ovan för att visa hashning)
// Extra endpoint för att visa existerande användare (utan att läcka hash)
app.get("/users", (_req, res) => {
  res.json({ users: users.map((u) => u.username) });
});

// En enkel startsida med länkar till alla demos
app.get("/", (_req, res) => {
  res.type("html").send(`
    <h1>Övningar i Application Security (Express)</h1>
    <ul>
      <li>XSS sårbar: <a href="/echo?msg=%3Cscript%3Ealert(1)%3C/script%3E">/echo?msg=&lt;script&gt;alert(1)&lt;/script&gt;</a></li>
      <li>XSS säker: <a href="/echo-safe?msg=%3Cscript%3Ealert(1)%3C/script%3E">/echo-safe</a></li>
      <li>Clickjacking sårbar: <a href="/profile">/profile</a></li>
      <li>Clickjacking säker: <a href="/profile-protected">/profile-protected</a></li>
      <li>CSRF saldo: <a href="/balance">/balance</a></li>
      <li>SQLi sårbar: <a href="/login-vuln?user=alice&pass=' OR '1'='1">/login-vuln</a></li>
      <li>Login säker (POST):
        <form action="/login-safe" method="POST" style="display:inline">
          <input type="hidden" name="user" value="alice" />
          <input type="hidden" name="pass" value="hemligt123" />
          <button type="submit">Testa login-safe (POST)</button>
        </form>
      </li>
      <li>Användare (lista): <a href="/users">/users</a></li>
    </ul>
    <p>POST-endpoints att testa med curl / REST-klient:</p>
    <pre>
curl -X POST http://localhost:3001/register \\
  -H "Content-Type: application/json" \\
  -d '{"username":"bob","password":"starktLösen"}'

curl -X POST http://localhost:3001/transfer \\
  -H "Content-Type: application/json" \\
  -d '{"amount":10}'

curl -X POST http://localhost:3001/login-safe \\
  -H "Content-Type: application/json" \\
  -d '{"user":"alice","pass":"hemligt123"}'

curl -X POST http://localhost:3001/reset-balance
    </pre>
  `);
});

// Starta servern sist när routes är definierade
app.listen(3001, () =>
  console.log("Server på http://localhost:3001 — öppna denna i webbläsaren")
);
