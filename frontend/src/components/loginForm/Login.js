import { useEffect, useState } from "react";
import styles from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { loginContainer, form, thumbnail, loginForm, message } = styles;
 
  return (
    <div className={loginContainer}>
      <div className={form}>
        <div className={thumbnail}></div>
        <form className={loginForm} onSubmit={(e) => e.preventDefault()}>
         
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button> </button>
           
          <p className={message}>
            <button ></button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
