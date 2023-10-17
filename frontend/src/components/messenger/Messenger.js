import { useState, useEffect } from "react";
import { v4 } from "uuid";
import styles from "./styles/messenger.module.css";
import ChatsContainer from "./subComponents/ChatsContainer";
import MessengerContainer from "./subComponents/MessengerContainer";
import MessageContainer from "./subComponents/MessageContainer";
import MessengerButton from "./subComponents/MessengerButton";
import TextArea from "./subComponents/TextArea";
import SearchBarChatsContainer from "./subComponents/SearchBarChatsContainer";
import Chat from "./subComponents/Chat";
import HeaderChat from "./subComponents/HeaderChat";
import Message from "./subComponents/Message";

function Messenger(props) {
  const { container, inputMessageContainer, chatList } = styles;
  const [messageText, setMessageText] = useState("");
  const [requestServer, setRequestServer] = useState([]);
  const [responseServer, setResponseServer] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4002/");
    ws.onopen = (e) => {
      setOnlineStatus(true);
      const data = requestServer.find((msg) =>
        msg.message ? msg : setRequestServer([])
      );
      if (data?.message) {
        ws.send(JSON.stringify(data));
        setRequestServer([]);
      }
    };
    ws.onmessage = ({ data }) => {
      setResponseServer([...responseServer, JSON.parse(data)]);
    }
  }, [requestServer, responseServer]);

  const buttonSendMessageHandler = (e) => {
    setRequestServer([
      ...requestServer,
      { username: localStorage.getItem("JWT").split(",").slice(1).join(' '), message: messageText },
    ]);
    setMessageText("");
  };
  const getTextMessageHandler = (e) => setMessageText(e.target.value);

  return (
    <div className={container}>
      <ChatsContainer>
        <SearchBarChatsContainer
          buttonName="Поиск"
          placeholder="Найти пользователя"
        />
        <div className={chatList}>
          <Chat />
        </div>
      </ChatsContainer>
      <MessengerContainer>
        <HeaderChat onlineState={onlineStatus} />

        <MessageContainer>
          {responseServer.map((bodyMessage) => (
            <Message key={v4()} data={bodyMessage.message} name={bodyMessage.username} />
          ))}
        </MessageContainer>

        <div className={inputMessageContainer}>
          <MessengerButton name="Медиа" />
          <TextArea
            placeholder="Написать сообщение..."
            onChange={getTextMessageHandler}
            value={messageText}
          />
          <MessengerButton name="Смайлики" />
          <MessengerButton
            name="Отправить"
            onClick={buttonSendMessageHandler}
          />
        </div>
      </MessengerContainer>
    </div>
  );
}
export default Messenger;
