// CurrentUserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api'; // Assuming api.js contains the API methods
import jwt_decode from 'jwt-decode';

// Create a context for currentUser
const CurrentUserContext = createContext(null);

// Custom hook to use the CurrentUserContext easily
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

// Provider component to wrap around the app and provide currentUser context
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // For storing the current user
  const [token, setToken] = useState(null); // For storing the JWT token

  // Login function
  async function login(data) {
    const token = await api.login(data); // Get token from API login
    setToken(token); // Set token in state
  }

  // Signup function
  async function signup(data) {
    const token = await api.register(data); // Get token from API register
    setToken(token); // Set token in state
  }

  // Logout function
  function logout() {
    setCurrentUser(null); // Clear current user
    setToken(null); // Clear token
  }

  // Effect to load user when token changes
  useEffect(() => {
    if (token) {
      const { username } = jwt_decode(token); // Decode the token to get username
      api.token = token; // Set token in API helper
      api.getUser(username).then(user => setCurrentUser(user)); // Fetch user info
    }
  }, [token]);

  // Provide the currentUser, login, signup, and logout functionality to the entire app
  return (
    <CurrentUserContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
