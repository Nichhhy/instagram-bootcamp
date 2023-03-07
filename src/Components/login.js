import { useState, useEffect } from "react";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {});
  };

  const signUpUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {});
  };

  return (
    <div>
      <label>Email</label>
      <input
        type="text"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Password</label>
      <input
        type="text"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={signUpUser}>Signup</button>
      <button onClick={loginUser}>Login</button>
    </div>
  );
}
