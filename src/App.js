import "./App.css";
import Post from "./Components/Posts";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import logo from "./logo.png";
import { auth } from "./firebase";
import Login from "./Components/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setEmail(user.email);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {isLoggedIn ? (
          <button type="button" onClick={logout}>
            Logout
          </button>
        ) : null}
        {isLoggedIn ? <Post userLoggedIn={email} /> : <Login />}
      </header>
    </div>
  );
}

export default App;
