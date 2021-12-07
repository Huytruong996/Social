import "./Auth.scss";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { Switch, Route } from "react-router-dom";
export default function Auth() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DevSocial</h3>
          <span className="loginDesc">
            Connect with friend and the world around you on DevSocial.
          </span>
        </div>
        <div className="loginRight">
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
