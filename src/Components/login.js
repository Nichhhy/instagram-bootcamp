import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {});
    navigate("/");
  };

  const signUpUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {});
    navigate("/");
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

      <button type="button" onClick={signUpUser}>
        Sign Up
      </button>

      <button type="button" onClick={loginUser}>
        Login
      </button>
    </div>
  );
}
