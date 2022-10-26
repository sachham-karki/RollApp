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
import { useState } from "react";
export default function Participant() {
  const auth = getAuth();

  const [data, setData] = useState({ email: "", password: "" });

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
    console.log(data);
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
  const createUserWithEmail = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInUserWithEmail = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("user has signed IN");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="App">
      <button className="fb btn" onClick={signInWithFacebook}>
        <SiFacebook />
        Login with Facebook
      </button>
      <button className="goggle btn" onClick={signInWithGoggle}>
        <FcGoogle />
        Login with Google
      </button>{" "}
      <button className="LogOut" onClick={logOut}>
        {" "}
        LogOut
      </button>
      <div className="Email-Password">
        <input
          className="Email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => handleInput(event)}
        />
        <input
          className="Passsword"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => handleInput(event)}
        />
        <button onClick={createUserWithEmail}>Submit</button>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Participant = () => {
//   useEffect(() => {
//     loadAsync();
//   }, []);

//   const [data, setData] = useState(null);
//   const [load, setLoad] = useState(false);

//   const loadAsync = async () => {
//     const response = await axios.get("http://localhost:8000/spinner");

//     setData(response.data[0].spinner);
//     setLoad(true);
//   };

//   return <>{load && data.map((datas) => <h1 key={datas.x}>{datas.x}</h1>)}</>;
// };

// export default Participant;

// import { useState } from "react";

// <form action="/spinner" method="POST">
//   <input type="text" placeholder="Items" name="Items" />
//   <input type="text" placeholder="Items" name="Items" />

//   <button>Submit</button>
// </form>
