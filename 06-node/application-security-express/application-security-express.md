# 🛡️ Övningar i Application Security (Express)

## Förberedelse

Skapa en ny Express-app:

```bash
npm init -y
npm i express helmet bcrypt escape-html
```

const port = 3001

**server.js**

```js
import express from "express";
import helmet from "helmet";

const app = express();
app.use(helmet()); // bra default-skydd
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Här kommer övningarna att läggas in

app.listen(port, () => console.log(`Server på http://localhost:${port}`));
```

---

## 1. XSS-demo (Cross-Site Scripting)

**Kod**

```js
import escapeHtml from "escape-html";

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

**Fix:** Använd alltid escaping, t.ex.:

```js
res.send(`<h1>${escapeHtml(input)}</h1>`);
```

eller ett templating-bibliotek som skyddar automatiskt.

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
<form id="csrf" action="http://localhost:3001/transfer" method="POST">
  <input type="hidden" name="amount" value="10" />
</form>
<script>
  document.getElementById("csrf").submit();
</script>
```

→ När sidan öppnas körs en POST automatiskt.

**Fix:** Använd CSRF-tokens (paket som `csrf-csrf`), SameSite-cookies och gör aldrig state-ändrande operationer via GET.

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

→ Ger en SQL som alltid blir sann.

**Fix:** Använd **parametriserade queries** och hasha lösenord.

### Exempel på lösning:

```js
import pg from "pg";
import bcrypt from "bcrypt";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/login", async (req, res) => {
  const { user, pass } = req.query;
  try {
    const { rows } = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = $1",
      [user]
    );
    const u = rows[0];
    if (!u) return res.status(401).send("Fel användarnamn eller lösenord");

    const ok = await bcrypt.compare(pass, u.password_hash);
    if (!ok) return res.status(401).send("Fel användarnamn eller lösenord");

    res.json({ id: u.id, username: u.username });
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

- **XSS:** Input måste saneras (`escapeHtml` eller templating).
- **Clickjacking:** Skydda med headers (`helmet.frameguard`).
- **CSRF:** Skydda POST-requests med tokens.
- **SQL Injection:** Använd parametriserade queries och jämför lösenord med `bcrypt.compare`.
- **Lösenord:** Alltid hashning (bcrypt), aldrig klartext.
