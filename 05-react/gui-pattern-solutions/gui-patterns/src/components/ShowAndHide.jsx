// GUI Patterns – Övning 3
// Visa/dölj text
// Skapa en knapp som visar eller döljer en text när man klickar.
// Hur kan du animera visa/dölj?
import styles from "./ShowAndHide.module.css";

import { useState } from "react";

function ShowAndHide() {
  const [show, setShow] = useState(true)

  function handleClick() {
    console.log("click", show)
    setShow(!show)
  }
  return ( 
    <>
    <h3>show and hide</h3>
  <p style={show ? {} : {display: 'none'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    <button className={styles.minknapp} onClick={handleClick}>{show ? 'Dölj text' : 'Visa text'}</button>
    </>
   );
}

export default ShowAndHide;