import { v4 } from "uuid";
import { useState } from "react";

import HeaderChat from "./HeaderChat";
import Message from "./Message";
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
import SendMessageIcon from './SvgSengMessageIcon'

import styles from './css/Chat.module.css'

const Chat = ({ destenationChat, messageList, sendMessage }) => {
    const {messages_chat, chat, write_message, left, right, userId, time, icon, send, clickable, footer_chat } = styles
    const [inputValue, setInputValue] = useState({})
    const [allowSend, setAllowSend] = useState(false)
    
  return (
    <section className={chat}>
      <HeaderChat onlineStatus={true} username={destenationChat} />

      <div className={messages_chat} key={v4()}>
        {!messageList.length
          ? ""
          : messageList.map(
              ({ message, date, socketId, compareId, chatId }) => {
                return (
                  <div key={v4()} className={compareId ? right : left}>
                    <Message text={message} compareId={compareId}>
                      <p className={userId}>
                        {compareId ? "вы" : "Собеседник"}
                      </p>
                      <p className={time}> {date}</p>
                    </Message>
                  </div>
                );
              }
            )}
      </div>

      <div className={footer_chat }>
        <input
          type="text"
          className={write_message}
          placeholder="Type your message here"
          onChange={inputHandler(setInputValue, inputValue, "message")}
          value={inputValue.message || ""}
        />

        <i
          className={`${icon} ${send} ${clickable}`}
          onClick={buttonHandler(setAllowSend, allowSend, false, true, () => {
            sendMessage(inputValue);
            setInputValue({})
          })}
        >
          <SendMessageIcon />
        </i>
      </div>
    </section>
  );
};

export default Chat;
