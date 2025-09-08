# 💻 Demo-App (React + React Router)

> Obs: Exempel i detta avsnitt använder Data Router-API:er (loaders/actions). Dessa funktioner finns i React Router 6.4 och senare — kontrollera din installerade version.

## Starta projektet

#### Öppna terminal i projektmappen

skriv:

- `npm init -y`
- `npm install react react-dom react-router-dom@^6.4`
- `npm install -D vite`

#### Projektstruktur

```
demo-app/
├── src/
│   ├── main.jsx
│   ├── routes/
│   │   ├── root.jsx
│   │   └── todos.jsx
├── package.json
```

---

#### `main.jsx`

```jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import {
  loader as todosLoader,
  action as todosAction,
  Todos,
} from "./routes/todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "todos",
        element: <Todos />,
        loader: todosLoader,
        action: todosAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

---

##### `routes/root.jsx`

```jsx
import { Outlet, Link, ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/todos">Todos</Link>
      </nav>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
```

---

##### `routes/todos.jsx`

```jsx
import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";

let todos = [{ id: 1, text: "Lära mig React Router" }];

export async function loader() {
  return todos;
}

export async function action({ request }) {
  const formData = await request.formData();
  const text = formData.get("text");
  todos = [...todos, { id: Date.now(), text }];
  return redirect("/todos");
}
```

---

```jsx
export function Todos() {
  const data = useLoaderData();
  const nav = useNavigation();
  const busy = nav.state === "submitting";

  return (
    <section>
      <h1>Todo-lista</h1>
      <Form method="post">
        <input name="text" placeholder="Ny todo..." />
        <button disabled={busy}>{busy ? "Lägger till…" : "Lägg till"}</button>
      </Form>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </section>
  );
}
```
