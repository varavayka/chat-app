import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import styles from "./app.module.css";

import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";
// import UserProfile from "./components/messenger/UserProfile";
// import ChatMenu from "./components/messenger/ChatMenu";

function App() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function requestLogin() {
      const URL = `http://localhost:9090/${userData.type}`;
      const REQUEST_CONFIG = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({ ...userData, username: userData.text }),
      };
      if (Object.keys(userData).length) {
        const responseLogin = await (await fetch(URL, REQUEST_CONFIG)).json();
        
      }
    }
    requestLogin();
  }, [userData, navigate]);
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login sendRequest={setUserData} />} /> */}
        <Route path="/" element={<Messenger />}/>
      </Routes>
    </div>
  );
}

export default App;
