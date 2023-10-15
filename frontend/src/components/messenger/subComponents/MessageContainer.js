import styles from "../styles/messageContainer.module.css";

function MessageContainer({children}) {
  const { messageContainer } = styles;
  return <div className={messageContainer}>{children}</div>;
}

export default MessageContainer;
