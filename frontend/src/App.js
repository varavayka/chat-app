import { useState, useEffect, useRef, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";
// const ws = new WebSocket('ws://localhost:8081/')
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
