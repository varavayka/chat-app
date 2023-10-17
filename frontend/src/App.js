import { useState, useEffect } from "react";
import styles from "./app.module.css";
import Login from "./components/Login/Login";
import Account from "./components/account/Account";
import Messenger from "./components/messenger/Messenger";
import { Route, Routes,useNavigate } from "react-router-dom";
function App() {
  const { App } = styles;
  const [actionForm, setActionForm] = useState("authentication");
  const [allowRequest, setAllowRequest] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [requestLogin, setRequestLogin] = useState({});
  const [accesslogin, setAccessLogin] = useState({});
  const [allowRedirect, setAllowRedirect] = useState(false);
  const [redirectChat, setRedirectChat] = useState(false);
  const navigate = useNavigate();
  if (redirectChat) {
    navigate(`${localStorage.getItem("JWT").split(",")[0]}QQQ`);
  }
  const SendButtonHandler = (e) => {
    const checkTypeLogin = Object.values(inputData).map((values) =>
      values !== "" ? true : false
    );
    setAllowRequest(true);
    const resultCheck = checkTypeLogin.reduce((prev) => prev);
    if (resultCheck) {
      setRequestLogin({ ...inputData, typeRequest: "reg" });
    }
    if (!resultCheck) {
      setRequestLogin({ ...inputData, typeRequest: "auth" });
    }
  };
  useEffect(() => {
    async function loginData() {
      const URL = `http://localhost:9090/${actionForm}`;
      const REQUEST_BODY = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(requestLogin),
      };
      if (allowRequest) {
        if (Object.values(requestLogin).length) {
          try {
            const {
              registrationStatus = null,
              permission = null,
              ...all
            } = await (await fetch(URL, REQUEST_BODY)).json();
            console.log(all)
            if (registrationStatus) {
              setAllowRequest(false);
              setAllowRedirect(false);
              return;
            }
            if (permission) {
              localStorage.setItem("JWT", all.jwt);
              setAllowRequest(false);
              setAllowRedirect(true);
              const userData = localStorage.getItem("JWT").split(",");
              navigate(`/${userData[0]}`);

              return;
            }

            if (!registrationStatus || !permission) {
              setAllowRequest(false);
              setAllowRedirect(false);
              return;
            }
          } catch (e) {
            console.log(e);
          }

          setAllowRequest(false);
        }
      }
    }
    loginData();
  }, [requestLogin, actionForm, accesslogin, allowRequest]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className={App}>
              <Login
                actionForm={actionForm}
                setAction={setActionForm}
                setInputData={setInputData}
                inputData={inputData}
                onClick={SendButtonHandler}
              />
            </div>
          }
        />
        <Route
          path={`${localStorage.getItem("JWT").split(",")[0]}`}
          element={
            <Account
              username={`${localStorage.getItem("JWT").split(",").slice(1)}`}
              setRedirectChat={setRedirectChat}
            />
          }
        />
        
          <Route
            path={`${localStorage.getItem("JWT").split(",")[0]}QQQ`}
            element={
              <Messenger
                userData={`${localStorage.getItem("JWT").split(",")}`}
              />
            }
          />
      </Routes>
    </div>
  );
}

export default App;
