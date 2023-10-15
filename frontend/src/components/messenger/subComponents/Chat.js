import styles from "../styles/Chat.module.css";

function Chat({name='username', message='message', timeSent='12 sec'}) {
  const { chatContainer, photo, description, username, descMessage, time } =
    styles;
  return (
    <div className={chatContainer}>
      <div className={photo}></div>
      <div className={description}>
        <p className={username}>{name}</p>
        <p className={descMessage}>{message}</p>
      </div>
      <div className={time}>{timeSent}</div>
    </div>
  );
}

export default Chat;
