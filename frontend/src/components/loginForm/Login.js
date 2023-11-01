import { useState } from "react";
import styles from "./css/Login.module.css";
// import ModalWindow from "./ModalWindow";
const Login = ({ setInputData, setSwitchPath }) => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;

  const [data, setData] = useState({});

  const [formToggle, setFormToggle] = useState(false);

  const inputDataHandler = (setStateAction, stateAction, name) => {
    return ({ target }) =>
      setStateAction({ ...stateAction, [name]: target.value });
  };
  const inputValue = (inputState, keyName) => inputState[keyName] || "";

  const createInput = (type, placeholder, onChange, value) => {
    
    return formToggle ? (
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    ) : (
      ""
    );
  };
  const switchButtonHandler = () => {
    if(!formToggle ) {
      setFormToggle(true)
      setSwitchPath(!formToggle)
      return
    }
    setFormToggle(false)
    setSwitchPath(formToggle)
  }
  const sendRequest = () => {
    setInputData(data)
    setData({})
  }
  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {createInput(
            "text",
            "user name",
            inputDataHandler(setData,data, "username"),
            inputValue(data, "username")
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={inputDataHandler(setData, data, "email")}
            value={inputValue(data, "email")}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={inputDataHandler(setData, data, "password")}
            value={inputValue(data, "password")}
          />
          <button onClick={sendRequest}>
            {!formToggle ? "Войти" : "Зарегистрироваться"}
          </button>
          <p className={message}>
            {!formToggle ? "Нет аккаунта ?" : "Есть аккаунт ?"}
            <button onClick={switchButtonHandler}>{!formToggle ? "Зарегистрироваться" : "Войти"}</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
