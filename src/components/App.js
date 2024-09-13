import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Home from "./Home";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Navbar from "./NavBar";
import NotFound from "./NotFound";
import api from "./api"; // Your API helper (JoblyApi)

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
      const { username } = jwtDecode(token);
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/companies" component={Companies} />
          <Route path="/companies/:handle" component={CompanyDetail} />
          <Route path="/jobs" component={Jobs} />

          {/* Login Route */}
          <Route path="/login">
            <Login login={login} />
          </Route>

          {/* SignUp Route */}
          <Route path="/signup">
            <SignUp signup={signup} />
          </Route>

          {/* Profile Route with currentUser and updateUser */}
          <Route path="/profile">
            <Profile currentUser={currentUser} updateUser={updateUser} />
          </Route>

          {/* Not Found Route */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
