import React from "react";
import { v4 } from "uuid";
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
const Messenger = (props) => {
  const { setAllowSend, setInputText, messages } = props;
  return (
    <div className="body">
      <div className="container">
        <div className="row">
          <Menu />
          <section className="discussions">
            <SearchBar />
            <Discussion />
          </section>

          <div className="chat">
            <HeaderChat />
            <div className="messages-chat">
              {messages.map(({message, userId, date}) => {
                return (
                  <div key={v4()}>
                    <Message text={message} />
                    <p className="time">{date}</p>
                  </div>
                );
              })}

              {/* <Message responseAllow={true} />
              <p className="response-time time"> 15h04</p> */}
            </div>

            <div className="footer-chat">
              <input
                type="text"
                className="write-message"
                placeholder="Type your message here"
                onChange={({ target }) =>  setInputText(target.value)}/>
              <i
                className="icon send clickable"
                aria-hidden="true"
                onClick={() => {
                  setAllowSend(true);
                }}
              >
                <SendMessageIcon />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
