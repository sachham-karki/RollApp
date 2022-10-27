import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { SiFacebook } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = (props) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  //using useNavigate
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (pass !== confirmPassword) {
        setError("** Password and Confirm Password don't match. ");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, pass);
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
        <div className="mainRegister">
          <div className="auth-form-container">
            <h2>Sign In Area </h2>
            {error && <p className="authError-message">{error}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
              <label for="name">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                placeholder="full name.."
                id="name"
                name="name"
              />

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
              <label for="password">Re-Enter Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="password.."
                id="Comfirm password"
                name="Confirm password"
              />

              <button
                className="button-login-register"
                // type="submit"
                onClick={createAccount}
              >
                {" "}
                Create Account
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
            <Link to="/login">
              <button
                className="link-btn"
                onClick={() => props.onFormSwitch("login")}
              >
                Log In Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
