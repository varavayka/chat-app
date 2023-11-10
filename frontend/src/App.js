import { useState, useEffect, useRef, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import wsClient from './wsClient'
import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";
// const ws = new WebSocket('ws://localhost:8081/')
function App() {
  const [forwardAllowSend,setForwardAllowSend] = useState(false)
  const [message,setMessage] = useState({})
  const [listMessages, setListMessages] = useState([])
  // const testFormwardData = (data) => setMessage({...message, data})
  // const ws = useRef(null)
  // const wsHandlers = useCallback(() => {
  //   // ws.current = new WebSocket('ws://localhost:8081/')
  //   return  new WebSocket('ws://localhost:8081/')
  // }, [])
  // useEffect(() => {
  //   const ws = wsHandlers()
  //   ws.onopen = () => { 
  //     if(forwardAllowSend) {
  //       ws.send(JSON.stringify(message || {}))
  //       setForwardAllowSend(false)
  //     }
  //   }
  //   ws.onmessage = ({data}) => {
  //     const msg = JSON.parse(data).data
      
  //     setListMessages([...listMessages,  msg])
  //   }
    
    

  // }, [forwardAllowSend, wsHandlers])
  
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        {/* forwardAllowSend={setForwardAllowSend} forwardData={testFormwardData} listMessages={listMessages} */}
        <Route path="messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
