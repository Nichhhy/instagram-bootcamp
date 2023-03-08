import { Link } from "react-router-dom";

import { auth } from "../firebase";

import { signOut } from "firebase/auth";
import { useContext } from "react";
import { LoginInfo } from "../App";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginInfo);
  const logout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div>
      {isLoggedIn ? null : <Link to="/login">Login Page</Link>}
      {isLoggedIn ? (
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      ) : null}
    </div>
  );
}
