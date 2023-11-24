import { useEffect, useState, useRef, useCallback } from "react";
import { v4 } from "uuid";
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import PermissionDenied from "../PermissonDenied";
// import {EventEmitter} from 'events'
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
const Messenger = () => {
  const [permission, setPermission] = useState(false);
  const [allowSend, setAllowSend] = useState(false);
  const [onlineStatus, setOnlineStats] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  useEffect(() => {
    
    ws.current = new WebSocket("ws://localhost:8081");
    ws.current.onopen = ({ target: { readyState } }) => {
      ws.current.send(JSON.stringify({type:'authorization', token:sessionStorage.getItem('jwt')}))
      return readyState ? setOnlineStats(true) : setOnlineStats(false);

    }
    ws.current.onclose = (e) => console.log(e)
    return () => ws.current.close();
  }, []);

  useEffect(() => {
    ws.current.onmessage = ({ data }) => {
      const message = JSON.parse(data)
      if(message.type === 'authorization') {
        if(!(message.status).authorized) {
          ws.current.close()
          return setPermission((message.status).authorized)
        }
        return setPermission((message.status).authorized)
      }
      if(message.type === 'message') {
        messages.forEach(({result, status:{authorized}}) => result && !authorized ?setPermission(authorized) :  setPermission(authorized))
        return setMessages([...messages, message]);
        
      }
    };
  }, [messages]);
  

  function sendMessage(inputValue) {
    if (inputValue) ws.current.send(JSON.stringify({...inputValue, type:'message', token:sessionStorage.getItem('jwt')}));
  }
  return !permission ? (
    <PermissionDenied />
  ) : (
    <div className="body">
      <div className="container">
        <div className="row">
          <Menu />
          <section className="discussions">
            <SearchBar/>
            <Discussion />
          </section>

          <section className="chat">
            <HeaderChat onlineStatus={onlineStatus} />
            <div className="messages-chat">
              {!messages.length
                ? ""
                : messages.map(({ message, date, messageId, result }) => {
                    return (
                      <div key={v4()} className={result ? "right" : "left"}>
                        <Message text={message} result={result}>
                          <p className="time">{messageId}</p>
                          <p className="time"> {date}</p>
                        </Message>
                      </div>
                    );
                  })}
            </div>
            <div className="footer-chat">
              <input
                onKeyDown={({ key }) =>
                  key === "Enter" ? sendMessage(inputValue) : ""
                }
                type="text"
                className="write-message"
                placeholder="Type your message here"
                onChange={inputHandler(setInputValue, inputValue, "message")}
                value={inputValue.message || ""}
              />
              <i
                className="icon send clickable"
                onClick={buttonHandler(setAllowSend,allowSend,false,true,() => {
                    sendMessage(inputValue);
                    setInputValue({});
                  }
                )}
              >
                <SendMessageIcon />
              </i>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
