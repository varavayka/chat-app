import { useEffect,  useState,useRef, useCallback } from "react";
import {v4} from 'uuid'
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
const Messenger = () => {
    
    const [allowSend, setAllowSend] = useState(false)
    const [onlineStatus,setOnlineStats] = useState(false)
    const [inputValue,setInputValue] = useState({})
    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState('')
    const [entranceRoom, setEntranceRoom] = useState({})
    const ws = useRef(null)


    
    
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8080/')
      ws.current.onopen = (({target:{readyState}}) => setOnlineStats(true))
      return () =>  ws.current.close()
    },[])
    
    useEffect(() => {
      ws.current.onmessage = ({data}) => {
        const message = JSON.parse(data)
        const {room, message: msg, date, comparisonId} = message
        setEntranceRoom({...entranceRoom, room, msg,date, comparisonId})
        setMessages([...messages, message])
        
      }
    }, [messages, entranceRoom])
     
    function sendMessage(inputValue) {
      if(Object.values(inputValue).length) {
        ws.current.send(JSON.stringify({...inputValue, type:room}))
      }

    }

    const setRoom1 = (room='broadcast') => {

      return () => setRoom(room)
      
    }
    return (
      <div className="body">
        <div className="container">
          <div className="row">
            <Menu />
            <section className="discussions">
              <SearchBar/>
              <Discussion entranceRoom={entranceRoom} setRoom1={setRoom1} room={room} />
            </section>

            <section className="chat">
              <HeaderChat  onlineStatus={onlineStatus} username={room}/>
              <div className="messages-chat">
               
                {!messages.length ? '' : messages.map(({message, date, socketId, comparisonId}) => {
                  return (
                  <div key={v4()} className={comparisonId ? 'right' : 'left' }>
                    <Message text={message} comparisonId={comparisonId}  >
                    <p className="userId">{socketId}</p>
                    <p className="time"> {date}</p>
                    </Message>
                    </div>)
                })}
              </div>
              <div className="footer-chat">

                <input 
                type="text"
                className="write-message"
                placeholder= "Type your message here"
                onChange={inputHandler(setInputValue,inputValue, 'message')}
                value={inputValue.message || ''}/>

                <i className="icon send clickable" onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {
                  sendMessage(inputValue)
                  setInputValue({})
                } )}><SendMessageIcon /></i>

              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }


export default Messenger;



