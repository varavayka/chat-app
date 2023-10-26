import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
