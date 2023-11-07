import { useState } from "react";
import styles from "./css/Login.module.css";
// import ModalWindow from "./ModalWindow";
const Login = ({ dataTransferhandler,setPath , setAllowRequest}) => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;
  const [inputValue, setInputValue] = useState({});
  const [formToggle, setFormToggle] = useState(false);

  const inputDataHandler = (setStateAction, stateAction, name) => {
    return ({ target }) =>
      setStateAction({ ...stateAction, [name]: target.value });
  };
  const switchButtonHandler = () => {
    setPath(formToggle)
    return !formToggle ? setFormToggle(!!formToggle) : setSwitchPath(!formToggle)
  }
  const sendButtonHandler = () => {
    dataTransferhandler(inputValue)
    setInputValue({})
    setAllowRequest(true)
  }

  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {
            <input type="text" placeholder="user name" onChange={inputDataHandler(setInputValue,inputValue, "username")}/>
          }
          <input
            type="email"
            placeholder="Email"
            onChange={inputDataHandler(setInputValue, inputValue, "email")}
            value={inputValue(inputValue, "email")}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={inputDataHandler(setInputValue, inputValue, "password")}
            value={inputValue(inputValue, "password")}
          />
          <button onClick={sendButtonHandler }> {!formToggle ? "Войти" : "Зарегистрироваться"}</button>
           
          <p className={message}>{!formToggle ? "Нет аккаунта ?" : "Есть аккаунт ?"}
            <button onClick={switchButtonHandler}>{!formToggle ? "Зарегистрироваться" : "Войти"}</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
