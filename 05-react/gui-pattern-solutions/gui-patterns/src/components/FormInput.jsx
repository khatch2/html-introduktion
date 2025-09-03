// GUI Patterns – Övning 2
// Enkel formulärinput
// Lägg till två input-fält
// Ett för namn
// Ett för kommentar
// Lägg till en knapp.
// När du skriver ditt namn och kommentar trycker på knappen
// visas, "Tack [namn] för din kommentar!” på sidan.
// Lät inte användaren skicka in tomma värden

import { useState } from "react";

function FormInput() {

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError("Du måste fylla i både namn och kommentar.");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <>
      <h2>Formulär</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Namn:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Skriv ditt namn"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br />
        <label htmlFor="comment">Kommentar:</label><br />
        <textarea
          id="comment"
          name="comment"
          placeholder="Skriv din kommentar"
          value={comment}
          onChange={e => setComment(e.target.value)}
        /><br /><br />
        <button disabled={name === ""} type="submit">Skicka</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {submitted && !error && (
        <p>Tack {name} för din kommentar!</p>
      )}
    </>
  );
}

export default FormInput;