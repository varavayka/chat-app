import styles from "../styles/chatsContainer.module.css";

function ChatsContainer({children}) {
  const { chats } = styles;
  return <div className={chats}>{children}</div>;
}

export default ChatsContainer;
