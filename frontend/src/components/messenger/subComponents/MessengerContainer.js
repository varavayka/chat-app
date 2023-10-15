import styles from "../styles/messengerContainer.module.css";

function MessengerContainer({ children }) {
  const { messenger } = styles;
  return <div className={messenger}>{children}</div>;
}

export default MessengerContainer;
