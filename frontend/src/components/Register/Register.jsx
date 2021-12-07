import "./Register.scss";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div>
      <div className="registerBox">
        <div className="registerInputWrapper">
          <input type="text" placeholder="Username" className="registerInput" />
        </div>
        <div className="registerInputWrapper">
          <input type="text" placeholder="Email" className="registerInput" />
        </div>
        <div className="registerInputWrapper">
          <input
            type="password"
            placeholder="Password"
            className="registerInput"
          />
        </div>
        <div className="registerInputWrapper">
          <input
            type="password"
            placeholder="Type password again"
            className="registerInput"
          />
        </div>
        <div className="registerInputWrapper">
          <button className="signupBtn">Sign Up</button>
        </div>
        <hr className="registerHr" />
        <div className="registerInputWrapper">
          <Link to="/">
            <button className="loginBtn">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
