import { useContext, useRef, useCallback } from "react";
import {useNavigate} from 'react-router-dom';
import "./login.css";
import { loginCall } from "../../loginCall";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const createNewAccountClick = useCallback(() => navigate('/register', {replace: true}), [navigate]);

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Bistro</h3>
          <span className="loginDesc">Find Dining is Fine Dining.</span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? "Loading..." : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={createNewAccountClick}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
