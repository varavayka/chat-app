import { useState } from "react";
import styles from "./css/Login.module.css";
// import ModalWindow from "./ModalWindow";
const Login = ({ setInputData, setSwitchPath }) => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;
  const [data, setData] = useState({ email: "", password: "" });
  const [switchForm, setSwitchForm] = useState(false);
  const inputDataHandler = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };
  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {switchForm ? (
            <input
              type="text"
              placeholder="user name"
              onChange={(e) => inputDataHandler(e, "username")}
              value={data.username || ''} 
            />
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => inputDataHandler(e, "email")}
            value={data.email || ''}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => inputDataHandler(e, "password")}
            value={data.password || ''}
          />
          <button onClick={() => setInputData(data)}>
            {!switchForm ? "Войти" : "Зарегистрироваться"}
          </button>
          <p className={message}>
            {/* {!switchForm ? "Нет аккаунта ?" : "Есть аккаунт ?"}{" "} */}
            <button
              onClick={() => {
                if(!switchForm) {
                  setSwitchForm(true)
                  setSwitchPath('registration')
                  setData({})
                  return 
                }
                setSwitchForm(false)
                setSwitchPath('authentication')
                setData({})

                return 
              }
              }
            >
              {!switchForm ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
