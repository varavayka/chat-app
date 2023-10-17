import styles from "../styles/message.module.css";

function Message({ data = "hello world", name , date = "12 sec" }) {
  const { message, username, dateSent, messageText, userData } = styles;
  return (
    <div className={message}>
        <p className={username}>{name}</p>
      <div className={userData}>
        <p className={messageText}>{data}</p>
      </div>
      <p className={dateSent}>{date}</p>
    </div>
  );
}

export default Message;
