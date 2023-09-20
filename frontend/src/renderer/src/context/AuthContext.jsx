import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component that wraps your application and provides the AuthContext
export function AuthProvider({ children }) {
  // State to store user data received from the backend
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      loadUser();
    }
  }, [isMounted]);

  // State to manage the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login (you can replace this with your actual login logic)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/me", {
        withCredentials: true,
      });
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Implement your logout logic here, communicate with the backend if necessary.
    // Clear user data and set isAuthenticated to false to indicate logged out state.
    setUser(null);
    setIsAuthenticated(false);
  };

  // Provide the AuthContext values to the children components
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
