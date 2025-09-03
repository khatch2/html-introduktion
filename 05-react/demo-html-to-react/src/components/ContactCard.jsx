function ContactCard() {
  return ( 
    <section id="signup-form">
    <h3>Want to get the latest news in ducky and friends?</h3>
    <p>Enter your name and email to get the latest news in your inbox!</p>
    <form id="form" action="https://www.freecodecamp.com/email-submit">
      <input type="text" name="firstName" placeholder="Input name" />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="input email"
      />
      <input type="submit" id="submit" />
    </form>
  </section>
       );
}

export default ContactCard;