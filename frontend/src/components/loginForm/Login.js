import { useState } from "react";
import styles from "./css/Login.module.css";
import ModalWindow from "./ModalWindow";
const Login = ({sendRequest}) => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;

  const [toggleStateForm, setToggleStateForm] = useState(false);
  const [userInput, setUserInput] = useState({});
  const userInputHandler = ({ target }) => {
    setUserInput({ ...userInput, [target.type]: target.value });
  };
  const switchButtonhandler = (e) => {
    setUserInput({});
    return !toggleStateForm
      ? setToggleStateForm(true)
      : setToggleStateForm(false);
  };
  const buttonClickhandler = (e) => sendRequest({...userInput, type: !toggleStateForm ? 'authentication' : 'registration'})
  return (
    
    <div className={loginContainer}>
      
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {toggleStateForm ? (
            <input
              type="text"
              placeholder="User name"
              onChange={userInputHandler}
              value={userInput?.text || ""}
            />
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={userInputHandler}
            value={userInput?.email || ""}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={userInputHandler}
            value={userInput?.password || ""}
          />
          <button onClick={buttonClickhandler}>
            {!toggleStateForm ? "Войти" : "Зарегистироваться"}
          </button>
          <p className={message}>
            {!toggleStateForm ? "Нет аккаунта ?" : "Есть аккаунт ?"}{" "}
            <button onClick={switchButtonhandler}>
              {!toggleStateForm ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;


