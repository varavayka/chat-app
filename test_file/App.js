import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Messenger from "./components/messenger/Messenger";

function App() {
  const [allowSend, setAllowSend] = useState(false);
  const [InputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    ws.onopen = (socket) => {
      if (allowSend) {
        ws.send(JSON.stringify({ message: InputText }));
        setAllowSend(false);
      }
    };
    ws.onmessage = ({ data }) => {
      // const {userId} = JSON.parse(data)
      setMessages([...messages, JSON.parse(data)]);
    };
  }, [allowSend]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Messenger
              setAllowSend={setAllowSend}
              setInputText={setInputText}
              messages={messages}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
