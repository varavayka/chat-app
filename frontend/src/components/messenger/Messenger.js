import { useEffect, useState, useRef, useCallback } from "react";
import {v4} from 'uuid'
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";

const Messenger = () => {

  const [listMessages, setlistMessages] = useState([])
  const [message, setMessage] = useState({message: ''})

  const inputHandler = ({target:{value}}) => setMessage({...message, message: value})
  const addMessageToList = (message) => setlistMessages([...listMessages, message])
  const ws = useRef(null)
  const sendMessageServer = () => ws.current.send(JSON.stringify(message))
  
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:9091')
    ws.current.onopen = () => {

    }
    // return ws.current.close()
  }, [])


  useEffect(() => {
   ws.current.onmessage = ({data}) => {
      console.log(data)
    }

  }, [])
  

  return  (
    <div className="body">
      <div className="container">
        <div className="row">
          <Menu />
          <section className="discussions">
            <SearchBar/>
            <Discussion />
          </section>

          <section className="chat">
            <HeaderChat/>
            <div className="messages-chat">
              {listMessages.map(({message}) => {
                return <div key={v4()}> 
                <Message text={message} />
                </div>
              })}  
            </div>
            <div className="footer-chat">


              <input
                type="text"
                className="write-message"
                placeholder="Type your message here"
                onChange={inputHandler}
                value={message.message}
              />


              <i className="icon send clickable" onClick={() => {
                setMessage({...message, message: '' })
                addMessageToList(message)
                sendMessageServer()
                }}>
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
