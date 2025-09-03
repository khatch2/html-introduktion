// GUI Patterns – Övning 2
// Enkel formulärinput
// Lägg till två input-fält
// Ett för namn
// Ett för kommentar
// Lägg till en knapp.
// När du skriver ditt namn och kommentar trycker på knappen
// visas, "Tack [namn] för din kommentar!” på sidan.
// Lät inte användaren skicka in tomma värden

function FormInput() {

  return ( 
    <>
    <h2>Formulär</h2>
      <form>
        <label htmlFor="name">Namn:</label><br />
        <input type="text" id="name" name="name" placeholder="Skriv ditt namn" /><br />
        <label htmlFor="comment">Kommentar:</label><br />
        <textarea type="text" id="comment" name="comment" placeholder="Skriv din kommentar" /><br /><br />
        <button type="submit">Skicka</button>
      </form>
    </>
   );
}

export default FormInput;