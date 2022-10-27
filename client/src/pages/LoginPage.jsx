import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import "./firebaseConfig.js";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
//Icons for facebook and google.
import { SiFacebook } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const LoginPage = (props) => {
  const auth = getAuth();

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
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          console.log("user has signed IN");
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  let googleProvider = new GoogleAuthProvider();

  const signInWithGoggle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.displayName);
        console.log(user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facebookProvider = new FacebookAuthProvider();
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
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
            <div className="flex m-5 mt-8 xl justify-between ">
              <button className="fb btn" onClick={signInWithFacebook}>
                <SiFacebook color=" #4267B2" size="2rem" />
              </button>
              <button className="goggle btn" onClick={signInWithGoggle}>
                <FcGoogle size="2rem" />
              </button>
            </div>
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
