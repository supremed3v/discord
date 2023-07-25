import React, { createContext, useState, useContext } from "react";

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

  // State to manage the authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login (you can replace this with your actual login logic)
  const login = async (email, password) => {
    // Implement your login logic here, communicate with the backend, and set the user and isAuthenticated states accordingly.
    // For example, you can make an API request to your backend for authentication.
    // If the login is successful, update the user and isAuthenticated states.
    try {
      // Simulate successful login with hardcoded data
      const userDataFromBackend = {
        id: 1,
        email: "example@example.com",
        username: "exampleuser",
        // Other user data...
      };

      setUser(userDataFromBackend);
      setIsAuthenticated(true);
    } catch (error) {
      // Handle login errors
      console.error("Login failed", error);
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
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
