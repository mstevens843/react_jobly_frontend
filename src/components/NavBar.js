// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar component shows links for navigation and handles logging out.
 * If a user is logged in, it shows a logout link; otherwise, it shows login/signup links.
 * 
 * Props:
 * - currentUser: the currently logged-in user (or null if not logged in)
 * - logout: a function to log out the current user
 */

function Navbar({ currentUser, logout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/jobs">Jobs</Link>

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}</span>
          <Link to="/" onClick={logout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
