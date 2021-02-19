import React from "react";
import { Link } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser }) {
  function logout() {
    // remove the token
    localStorage.removeItem("token");
    // clear currentUser
    setCurrentUser(null);
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {currentUser ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
