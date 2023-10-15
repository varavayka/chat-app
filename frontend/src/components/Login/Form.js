import styles from "./Form.module.css";

function Form({ children, action, onSubmit, method }) {
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      {children}
    </form>
  );
}

export default Form;
