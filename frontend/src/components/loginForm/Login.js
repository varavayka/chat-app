import { useEffect, useState } from "react";
import styles from "./css/Login.module.css";
import buttonHandler from "../../handlers/buttonHandler";
import inputHadler from "../../handlers/inputHandler";
import httpAuthentication from '../../httpRequests/httpAuthentication'
import httpRegistration from '../../httpRequests/httpRegistration'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;
  const [formToggle,setFormToggle] = useState(false)
  const [allowRequest,setAllowRequest] = useState(false)
  const [inputValue,setInputValue] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    async function login() { 
      const dataRequest = {
        body: JSON.stringify(inputValue),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        method:'POST'
      }
      if(!formToggle) {
      
        if(allowRequest) {
          const {registrationStatus, resultFind, message} = await httpRegistration(`http://localhost:9090/${!formToggle ? 'registration' : 'authentication'}`,dataRequest)
          console.log({registrationStatus, resultFind, message})
          return  setAllowRequest(false)
        }
        return 
      }
      if(formToggle) {

        if(allowRequest) {
          const {userAuthenticated, message} = await httpAuthentication(`http://localhost:9090/${!formToggle ? 'registration' : 'authentication'}`,dataRequest,navigate, '/messenger' )
          console.log({userAuthenticated, message})
          return setAllowRequest(false)
        }
        return 
      }

    }
    
    login()

  },[allowRequest, formToggle] )
  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
          {
            !formToggle ? 
            <input type="text" placeholder="user name" onChange={inputHadler(setInputValue,inputValue,'username')}/>
            : ''
          }
          <input type="email" placeholder="Email" onChange={inputHadler(setInputValue,inputValue,'email')}/>
          <input type="password" placeholder="Password" onChange={inputHadler(setInputValue,inputValue,'password')}/>

          <button onClick={buttonHandler(setAllowRequest,allowRequest,false,true)} > {formToggle ? "Войти" : "Зарегистрироваться"}</button>
           
          <p className={message}>{formToggle ? "Нет аккаунта ?" : "Есть аккаунт ?"} 
            <button onClick={buttonHandler(setFormToggle, formToggle,true)}>{formToggle ? "Зарегистрироваться" : "Войти"}</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
