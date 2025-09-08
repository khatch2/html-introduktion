import styles from "./Button.module.css";

export default function ButtonModule({ children }) {
  return <button className={styles.primary}>{children}</button>;
}