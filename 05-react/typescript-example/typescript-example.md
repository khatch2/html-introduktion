#### TypeScript vs JavaScript – Todo-app

# Todo-app i JavaScript vs TypeScript

En praktisk jämförelse

## Todo-app i JavaScript

```jsx
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, text: "Lära mig JS" }]);

  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text }]);
  }

  return (
    <div>
      <h1>Todo-lista (JS)</h1>
      <button onClick={() => addTodo(42)}>Lägg till</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

⚠️ Problem: `addTodo(42)` fungerar tills `todo.text` används som en sträng → runtime-fel.

---

### Todo-app i TypeScript

```tsx
import { useState } from "react";

type Todo = { id: number; text: string };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "Lära mig TS" }]);

  function addTodo(text: string) {
    setTodos([...todos, { id: Date.now(), text }]);
  }

  return (
    <div>
      <h1>Todo-lista (TS)</h1>
      <button onClick={() => addTodo(42)}>Lägg till</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

✅ TypeScript stoppar `addTodo(42)` redan vid kompilering.

---

#### Lärdom

- **JavaScript**: flexibel, men risk för dolda buggar
- **TypeScript**: striktare, men skyddar mot fel i datahantering
- Båda bygger på samma runtime (JavaScript i webbläsaren)

<br>

**TS används i större projekt** där kodkvalitet och underhåll är viktigt.
