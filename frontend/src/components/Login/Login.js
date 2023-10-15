import { useState } from "react";
import "./Login.css";
import Input from "./Input";
import Button from "./Button";
import Form from "./Form";

function Login(props) {
  const [stateForm, setStateForm] = useState("");

  const { actionForm, setAction, setInputData, inputData, onClick} = props;

  const switchForm = (e) => {
    setInputData({ ...inputData, password: "", email: "", username: "" });
    if (!stateForm) {
      setStateForm("right-panel-active");
      setAction("registration");
    }
    if (stateForm) {
      setStateForm("");
      setAction("authentication");
    
    }
  };
  const onSubmitHandler = (e) => e.preventDefault();

  return (
    <>
      <div className={`container ${stateForm}`} id="container">
        {/* <div className="form-container sign-up-container">
          
        </div> */}

        <div
          className={`form-container ${
            actionForm === "authentication"
              ? "sign-in-container"
              : "sign-up-container"
          } `}
        >
          <Form onSubmit={onSubmitHandler}>
            <h1>
              {actionForm !== "registration" ? "Авторизация" : "Регистрация"}
            </h1>
            {actionForm === "registration" ? (
              <Input
                type="text"
                placeholder="Ваше имя"
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })
                }
                value={inputData.username}
              />
            ) : (
              ""
            )}
            <Input
              type="email"
              placeholder="Почта"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              value={inputData.email}
            />
            <Input
              type="password"
              placeholder="Пароль"
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
              value={inputData.password}
            />
            {/* <a href="#">Забыли пароль ?</a> */}
            <Button
              name={actionForm !== "registration" ? "Войти" : "Регистрация"}
              onClick={onClick}
            />
          </Form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Добро пожаловать</h1>
              <p>
                Введите свои персональные данные для создания учетной записи.
              </p>
              <Button id="signIn" onClick={switchForm} name="Войти" />
            </div>

            <div className="overlay-panel overlay-right">
              <h1>У вас уже есть аккаунт ?</h1>
              <p>Введите данные учетной записи.</p>
              <Button id="signUp" onClick={switchForm} name="Регистрация" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
