import styles from "./FlexBoxRow.module.css"

function FlexBoxRow() {
  return ( 
    <nav className={styles.nav}>
      <button>knapp 1</button>
      <button>knapp 2</button>
      <button>knapp 3</button>
    </nav>
 );
}

export default FlexBoxRow;