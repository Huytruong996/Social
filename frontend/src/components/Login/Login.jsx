import { useContext, useRef } from "react";
import "./Login.scss";
import { GlobalContext } from "../../context/GlobalContext";
import { CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { LoginAction } from "../../context/action/AuthAction";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const { isFetching, AuthDispatch } = useContext(GlobalContext);
  const handleClick = async (e) => {
    e.preventDefault();

    const userLogin = {
      email: email.current.value,
      password: password.current.value,
    };
    await LoginAction(history, userLogin)(AuthDispatch);
  };
  return (
    <div>
      <form className="loginBox" onSubmit={handleClick}>
        <div className="loginInputWrapper">
          <input
            type="email"
            required
            placeholder="Email"
            className="loginInput"
            ref={email}
          />
        </div>
        <div className="loginInputWrapper">
          <input
            type="password"
            required
            placeholder="Password"
            className="loginInput"
            minLength={6}
            ref={password}
          />
        </div>
        <div className="loginInputWrapper">
          <button type="submit" className="loginBtn" disabled={isFetching}>
            {isFetching ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <div className="loginInputWrapper">
          <span className="loginForgot">Forgot Password?</span>
        </div>
        <hr className="loginHr" />
        <div className="loginInputWrapper">
          <Link to="/register">
            <button type="button" className="registerBtn" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Create New Account"
              )}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
