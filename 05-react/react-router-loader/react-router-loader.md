## 🎯 Mål

- Skapa en React Router-route med **loader**
- Hämta data från ett **fake-API** (in-memory)
- Skriva **integrationstest** som verifierar loaderns svar (kontrakt)

---

## 0) Starta projektet

Skapa ett nytt Vite-projekt (React):

```bash
npm create vite@latest loader-demo -- --template react
cd loader-demo
npm i react-router-dom vitest @testing-library/jest-dom
```

Aktivera Vitest i `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "test": "vitest"
  }
}
```

---

## 1) Skapa en route med loader

**`src/routes/todos.jsx`**

```jsx
import { useLoaderData } from "react-router-dom";

export async function loader() {
  // Fake-API: simulerar nätverksanrop
  const data = await fakeFetchTodos();
  // Kontrakt: alltid lista av { id: number, text: string }
  return data;
}

async function fakeFetchTodos() {
  // simulerad latency
  await new Promise((r) => setTimeout(r, 10));
  return [{ id: 1, text: "Lära mig loaders" }];
}

export default function Todos() {
  const todos = useLoaderData();
  return (
    <section>
      <h1>Todos</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </section>
  );
}
```

**`src/main.jsx`**

```jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos, { loader as todosLoader } from "./routes/todos";

const router = createBrowserRouter([
  { path: "/", element: <Todos />, loader: todosLoader },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

Kör: `npm run dev` och öppna sidan – du ska se en lista med 1 todo.

---

## 2) Skriv integrationstest för loadern

**`src/routes/todos.loader.test.js`**

```js
import { describe, it, expect, vi } from "vitest";
import { loader } from "./todos";

// Hjälper oss att byta ut "fakeFetchTodos" om vi vill
// men här testar vi loaderns kontrakt direkt.

describe("todos loader", () => {
  it("returnerar lista med {id, text}", async () => {
    const data = await loader();

    // 1) är det en array?
    expect(Array.isArray(data)).toBe(true);

    // 2) har första objektet rätt nycklar/typer?
    const first = data[0];
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("text");
    expect(typeof first.id).toBe("number");
    expect(typeof first.text).toBe("string");
  });

  it("bryter om kontraktet ändras (ex test)", async () => {
    // Simulera kontraktsbrott genom att tillfälligt mocka loadern
    const originalLoader = loader;
    const mock = vi.fn(async () => [{ userId: "1", title: 123 }]);

    // verifiera kontrakt mot mock-data
    const data = await mock();
    const first = data[0];

    expect(first).not.toHaveProperty("id");
    expect(first).not.toHaveProperty("text");
    // Detta demonstrerar vad som *skulle* upptäckas om backend ändrade format
  });
});
```

Kör testerna:

```bash
npm test
```

---

## 3) (Valfritt) Gör API-funktionen separat och mocka `fetch`

Vill du öva på nätverksanrop? Skapa en modul `api.js` och mocka `global.fetch` i testet.

**`src/api.js`**

```js
export async function getTodos() {
  const res = await fetch("http://localhost:3001/api/todos");
  if (!res.ok) throw new Error("Network error");
  return res.json();
}
```

**`src/routes/todos.jsx` (loader-variant med fetch)**

```jsx
import { useLoaderData } from "react-router-dom";
import { getTodos } from "../api";

export async function loader() {
  return getTodos();
}
export default function Todos() {
  const todos = useLoaderData();
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}
```

**`src/routes/todos.loader.fetch.test.js`**

```js
import { describe, it, expect, vi } from "vitest";
import { loader } from "./todos";

describe("todos loader via fetch", () => {
  it("kallar API och följer kontraktet", async () => {
    // Mocka fetch → returnera förväntad struktur
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, text: "Mockad todo" }]),
      })
    );

    const data = await loader();
    expect(data[0]).toEqual({ id: 1, text: "Mockad todo" });
  });
});
```

---

## Övningen beskriver:

- **Vad en loader är** och varför data laddas **före** render
- **Kontraktstänk** (struktur/nycklar/typer) mellan frontend och backend
- **Integrationstest** som fångar kontraktsbrott – tidigt och billigt

---

## Playwright-övning (e2e)

### testar att todo-listan visas efter att **loadern** kört.

Utveckling av tidigare `loader-demo` (Vite + React Router), och är så kort och snäll som möjligt.

---

## 1) Installera Playwright

```bash
npm i -D @playwright/test
npx playwright install
```

Lägg till script i `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "e2e": "playwright test"
  }
}
```

---

## 2) Konfig: starta dev-server automatiskt

**`playwright.config.js`**

```js
// Enkel default + starta Vite dev-server på 5173
import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: "http://localhost:5173" },
});
```

> Om din dev-server kör på annan port, ändra `port`/`baseURL`.

---

## 3) E2E-test (5 rader “nytta”)

**`tests/todos.e2e.spec.js`**

```js
import { test, expect } from "@playwright/test";

test("visar todo från loadern", async ({ page }) => {
  await page.goto("/"); // 1. öppna appen
  await expect(page.getByRole("heading", { name: "Todos" })).toBeVisible(); // 2. rubriken syns
  const items = page.locator("li"); // 3. hämta <li>-rader
  await expect(items).toHaveCount(1); // 4. loadern gav 1 todo
  await expect(items.nth(0)).toContainText("Lära mig loaders"); // 5. rätt text
});
```

> Testet utgår från din loader som returnerar `[{ id: 1, text: "Lära mig loaders" }]`.

Kör:

```bash
npm run e2e
```

---

## (Valfritt) Extra 1: e2e för formulär

Om du har en `<Form method="post">` som lägger till nya todos:

```js
test("kan lägga till ny todo via formulär", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Ny todo...").fill("Skriva e2e-test");
  await page.getByRole("button", { name: /lägg till/i }).click();
  await expect(page.locator("li")).toContainText(["Skriva e2e-test"]);
});
```

---

## (Valfritt) Extra 2: När loadern hämtar via API

Om loadern anropar ett backend-API och du vill undvika beroende:

```js
test("mocka API-svar i loader", async ({ page }) => {
  await page.route("**/api/todos", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 7, text: "Mockad todo" }]),
      headers: { "content-type": "application/json" },
    })
  );
  await page.goto("/");
  await expect(page.locator("li")).toContainText(["Mockad todo"]);
});
```

---

### Vad du gjort:

- Starta e2e-tester utan extra miljö (Playwright startar dev-servern).
- Verifiera att **UI\:t återspeglar loaderns data**.
- (Valfritt) Mocka API för att göra tester **snabba och stabila**.
