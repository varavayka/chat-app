import { useState } from "react";
import styles from "./css/Login.module.css";
// import ModalWindow from "./ModalWindow";
const Login = ({transferInputData}) => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;

  const [formToggle, setformToggle] = useState(false);
  const [inputData, setInputData] = useState({});

  const inputGetValue = (setValue, value, name) => {
    return ({ target }) => setValue({ ...value, [name]: target.value });
  };
  const sendButtonHandler = () => {
    transferInputData({...formToggle})
    setInputData({})
  }
  const toggleFormButtonHandler = () => {
    setInputData({})
    return !formToggle ? setformToggle(true) : setformToggle(false)
  }

  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {formToggle ? (
            <input
              type="text"
              placeholder="user name"
              value={inputData.username || ''}
              onChange={inputGetValue(setInputData, inputData, "username")}
            />
          ) : (
            ""
          )}

          <input
            type="email"
            placeholder="Email"
            value={inputData.email || ''}
            onChange={inputGetValue(setInputData, inputData, "email")}
          />
          <input
            type="password"
            placeholder="Password"
            value={inputData.password || ''}
            onChange={inputGetValue(setInputData, inputData, "password")}
          />

          <button onClick={sendButtonHandler}>{formToggle ? "Зарегистрироваться" : "Войти"}</button>

          <p className={message}>
            {!formToggle ? "Нет аккаунта ?" : "Есть аккаунт ?"}
            <button onClick={toggleFormButtonHandler}> {!formToggle ? "Зарегистрироваться" : "Войти"}</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
