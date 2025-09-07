# 🛡️ Övningar i Application Security (Express)

## Förberedelse

Skapa en ny Express-app:

```bash
npm init -y
npm i express helmet body-parser bcrypt
```

**server.js**

```js
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Här kommer övningarna att läggas in

app.listen(3001, () => console.log("Server på http://localhost:3001"));
```

---

## 1. XSS-demo (Cross-Site Scripting)

**Kod**

```js
app.get("/echo", (req, res) => {
  const input = req.query.msg || "";
  res.send(`<h1>${input}</h1>`);
});
```

**Testa**

```
http://localhost:3001/echo?msg=<script>alert(1)</script>
```

→ En popup körs i webbläsaren.

**Fix:** Använd alltid escaping, t.ex. `res.send(escapeHtml(input))` eller ett templating-bibliotek som skyddar automatiskt.

---

## 2. Security Headers-demo (Clickjacking)

**Kod**

```js
app.get("/profile", (req, res) => {
  res.send("<h1>Min profil</h1>");
});
```

**Testa**
Skapa en fil `attacker.html` med:

```html
<iframe src="http://localhost:3001/profile" width="400" height="200"></iframe>
```

→ Din sida visas i en iframe!

**Fix**

```js
import helmet from "helmet";
app.use(helmet.frameguard({ action: "deny" }));
```

→ Nu blockeras iframen.

---

## 3. CSRF-demo (Cross-Site Request Forgery)

**Kod**

```js
let balance = 100;

app.post("/transfer", (req, res) => {
  balance -= 10;
  res.send(`Kvar på kontot: ${balance}`);
});
```

**Testa**
Skapa en fil `evil.html` med:

```html
<img src="http://localhost:3001/transfer" />
```

→ När sidan öppnas körs en POST automatiskt.

**Fix:** Använd CSRF-tokens (paket som `csurf`) i riktiga appar.

---

## 4. SQL Injection-demo

**Kod (dummy – ingen riktig databas)**

```js
app.get("/login", (req, res) => {
  const user = req.query.user;
  const pass = req.query.pass;
  const query = `SELECT * FROM users WHERE user='${user}' AND pass='${pass}'`;
  res.send(`Körde query: ${query}`);
});
```

**Testa**

```
http://localhost:3001/login?user=alice&pass=' OR '1'='1
```

→ Ger “true” i SQL.

**Fix:** Använd **parametriserade queries** i riktiga databaser.

### Exempel på lösning:

```javascript
// fetch user (pg)
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/login", async (req, res) => {
  const { user, pass } = req.query;
  try {
    const { rows } = await pool.query(
      "SELECT id, username FROM users WHERE username = $1 AND password_hash = $2",
      [user, passHash(pass)] // skicka redan hashad lösenord
    );
    res.json(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
```

---

## 5. Lösenord med hashning

**Kod**

```js
import bcrypt from "bcrypt";

app.post("/register", async (req, res) => {
  const { password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  res.send(`Sparat hashat lösenord: ${hashed}`);
});
```

**Testa med Postman eller curl**

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"password": "hemligt123"}'
```

→ Servern sparar _inte lösenordet i klartext_, utan en hash.

---

# ✅ Sammanfattning

- **XSS:** Input måste saneras.
- **Clickjacking:** Skydda med headers (`helmet.frameguard`).
- **CSRF:** Använd tokens för att skydda formulär.
- **SQL Injection:** Använd parametriserade queries.
- **Lösenord:** Alltid hashning (bcrypt), aldrig klartext.
