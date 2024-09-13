import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Update this line
import { decode as jwt_decode } from "jwt-decode";
import Home from "./Home";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Navbar from "./NavBar";
import NotFound from "./NotFound";
import api from "../api/api";  // Correct import

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // Handles login
  async function login(data) {
    const token = await api.login(data);
    setToken(token);
  }

  // Handles signup
  async function signup(data) {
    const token = await api.register(data);
    setToken(token);
  }

  // Handles logout
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  // Fetch user data when token changes (on login/signup)
  useEffect(() => {
    if (token) {
      const { username } = jwt_decode(token);
      api.token = token;
      async function fetchUser() {
        try {
          const user = await api.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Problem fetching user", err);
          setCurrentUser(null);
        }
      }
      fetchUser();
    }
  }, [token]);

  // Profile Update Function
  async function updateUser(userData) {
    try {
      const updatedUser = await api.updateUser(currentUser.username, userData);
      setCurrentUser(updatedUser);
    } catch (err) {
      throw new Error("Error updating user");
    }
  }

  return (
    <Router>
      <Navbar currentUser={currentUser} logout={logout} />
      <div>
        <Routes>  {/* Replace Switch with Routes */}
          <Route exact path="/" element={<Home />} /> {/* Use element instead of component */}
          <Route exact path="/companies" element={<Companies />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* Login Route */}
          <Route path="/login" element={<Login login={login} />} />

          {/* SignUp Route */}
          <Route path="/signup" element={<SignUp signup={signup} />} />

          {/* Profile Route with currentUser and updateUser */}
          <Route path="/profile" element={<Profile currentUser={currentUser} updateUser={updateUser} />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
