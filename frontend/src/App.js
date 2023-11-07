import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./components/loginForm/Login";
import Messenger from "./components/messenger/Messenger";
// const navigate = useNavigate()
function App() {
  const [transmittedData, setTransmittedData] = useState({});
  const [toggleForm, setToggleForm] = useState(false);
  const [allowRequest, setAllowRequest] = useState(false);
  const transmittedDataHandler = (data) => {
    return setTransmittedData({ ...transmittedData, ...data });
  };

  useEffect(() => {
    const dataRequest = (body, headers, method) => ({ body, headers, method });
    async function httpAuthorization(url, dataRequest) {
      try {
        const {jwt, userAuthenticated, registrationStatus} = await fetch(url, dataRequest)

        switch(true) {
          case !toggleForm:
            if(userAuthenticated) {
              localStorage.setItem('jwt', jwt)
              console.log('Пользователь аутентифицирован')
              break
            }
            console.log('Пользователь не аутентифицирован')
            break
          
          case toggleForm:
            if(registrationStatus) {
              console.log('Пользователь зарегистрирован')
              break
            }
            console.log('Пользователь не зарегистрирован')
            break
        }
      } catch(e) {
        console.log(e)
      }
    }
    httpAuthorization(
      `http://localhost:9090/${!toggleForm ? 'authentication':'registration'}`,
      dataRequest(
        JSON.stringify(transmittedData),
        { "Content-Type": "application/json charset=UTF-8" },
        "POST"
      )
    );
  }, [allowRequest, toggleForm]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              transmittedDataHandler={transmittedDataHandler}
              setPath={setToggleForm}
              setAllowRequest={setAllowRequest}
            />
          }
        />
        <Route path="messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
