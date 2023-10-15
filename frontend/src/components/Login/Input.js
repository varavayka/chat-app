import styles from "./input.module.css";

function Input({ type, placeholder, onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.inputForm}
      value={value}
    />
  );
}

export default Input;
