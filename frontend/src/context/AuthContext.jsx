import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

// Create context
const AuthContext = createContext();

// Auth provider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Check for existing token and user in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token"); // Changed to 'token'
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  // Handle login (save token and user to localStorage and state)
  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken); // Changed to 'token'
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  // Handle logout (remove token and user from localStorage and state)
  const logout = () => {
    localStorage.removeItem("token"); // Changed to 'token'
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Add Authorization token to Axios headers
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers["Authorization"];
    }
  }, [token]);

  // Provide auth state and methods to components
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to auth context
const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
