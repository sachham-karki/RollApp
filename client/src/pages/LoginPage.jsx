import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const logIn = async () => {
    try {
      // await signInWithEmailAndPassword(getAuth(), email, pass);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <div className="login-register__bg">
        <div className="mainLogin">
          <div className="auth-form-container">
            <h2>Login</h2>
            {error && <p className="authError-message">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <label for="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email.."
                id="email"
                name="email"
              />
              <label for="password">Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="password.."
                id="password"
                name="password"
              />
              <button
                className="button-login-register"
                type="submit"
                onClick={logIn}
              >
                Log In
              </button>
            </form>
            <Link to="/register">
              <button
                className="link-btn"
                onClick={() => props.onFormSwitch("register")}
              >
                Register Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
