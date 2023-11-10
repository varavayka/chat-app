import { useEffect,  useState,useRef, useCallback } from "react";
import {v4} from 'uuid'
import "./css/messenger.css";
import Menu from "./ Menu";
import SearchBar from "./SearchBar";
import Discussion from "./Discussion";
import HeaderChat from "./HeaderChat";
import Message from "./Message";
import SendMessageIcon from "./SvgSengMessageIcon";
import PermissionDenied from "../PermissonDenied";
import httpAuthorization from "../../httpRequests/httpAuthorization";
import inputHandler from "../../handlers/inputHandler";
import buttonHandler from "../../handlers/buttonHandler";
const Messenger = () => {
    const [permission,setPermission] = useState(false)
    const [allowSend, setAllowSend] = useState(false)
    const [onlineStatus,setOnlineStats] = useState(false)
    const [inputValue,setInputValue] = useState({})
    const [messages, setMessages] = useState([])
    // const [onTransferingData, setOnTransferingData] = useState(false)
    const ws = useRef(null)
  // const wrapperListMessage = (data) => setMessages([...messages, data])
  // useEffect(() => wsClient(inputValue, allowSend, setOnlineStats, setMessages, messages), [allowSend])
    useEffect(() => {
      ws.current = new WebSocket('ws://localhost:8081')
      
        ws.current.onopen = (socket) => {
          ws.current.send(JSON.stringify(inputValue))
        };
        test(ws, inputValue)
        
        handlerWs()
      

    }, [])
    
    const test = useCallback((ws, data) => {
      
      
        setInterval(() => {
          ws.current.send(JSON.stringify(data))
          
        }, 2000);
        
    }, [allowSend])

    const handlerWs = useCallback(() => {
      ws.current.onmessage = ({ data }) => {  
        // const {userId} = JSON.parse(data)
        // messagesHandler([...messages, JSON.parse(data)]);
        setMessages([...messages, JSON.parse(data)])
      };
    },[])

    

    // useEffect(() => {
    //   async function authorization() {
    //     const dataRequest = {
    //       headers: {'Authorization': `bearer ${localStorage.getItem('jwt')}`},
    //       method:'GET'
    //     }
    //     const authorizationStatus =  await httpAuthorization('http://localhost:9090/messenger',dataRequest)
    //     return setPermission(authorizationStatus)
        
    //   }
    //   authorization()
    // }, [permission])
    return (
      // !permission ? <PermissionDenied/> :
      <div className="body">
        <div className="container">
          <div className="row">
            <Menu />
            <section className="discussions">
              <SearchBar />
              <Discussion msg={inputValue}/>
              {/* <button onClick={() => setOnTransferingData(true)}>ON</button> */}
            </section>

            <section className="chat">
              <HeaderChat />
              <div className="messages-chat">
               
                {!messages.length ? '' : messages.map(({message, date}) => {
                  return (<div key={v4()}>
                    <Message text={message}/>
                    <p className="time"> {date}</p>
                    </div>)
                })}
              </div>
              <div className="footer-chat">
                <input type="text"className="write-message"placeholder="Type your message here" onChange={inputHandler(setInputValue,inputValue, 'message')}/>
                <i className="icon send clickable" onClick={buttonHandler(setAllowSend,allowSend,false, true, () => {})}><SendMessageIcon /></i>
                {/* forwardAllowSend, forwardData, inputValue, () => console.log(listMessages) */}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }


export default Messenger;


// const ws = new WebSocket('ws://localhost:8081')
// function wsClient(inputValue, allowSend, setAllowSend, setMessages, messages) {
      
//   console.log('ok')
//   ws.onopen = (socket) => {
//     if(allowSend) {
//       ws.send(JSON.stringify({message:inputValue}))
      
//       // ws.current.send(JSON.stringify(inputValue));
//       setAllowSend(false)
//       // setOnTransferingData(false)
//     }
//   };
//   ws.onmessage = ({ data }) => {
//     console.log(data)
//     // const {userId} = JSON.parse(data)
//     // messagesHandler([...messages, JSON.parse(data)]);
//     setMessages([...messages, JSON.parse(data)])
//   };

// }
