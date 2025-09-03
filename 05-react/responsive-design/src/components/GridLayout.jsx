import styles from "./GridLayout.module.css"

function GridLayout() {
  return ( 
    <>
      <h2>Tittle</h2>
    <section className={styles.layout}>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
    </>
   );
}

export default GridLayout;