import "./App.css";
import Post from "./Components/Posts";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import logo from "./logo.png";
import { auth } from "./firebase";
import Login from "./Components/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

export const LoginInfo = createContext(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <BrowserRouter>
          <LoginInfo.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Post userLoggedIn={email} />
                  ) : (
                    <p>Welcome to my app</p>
                  )
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </LoginInfo.Provider>
        </BrowserRouter>

        {/* {isLoggedIn ? (
          <button type="button" onClick={logout}>
            Logout
          </button>
        ) : null}
        {isLoggedIn ? <Post userLoggedIn={email} /> : <Login />} */}
      </header>
    </div>
  );
}

export default App;
