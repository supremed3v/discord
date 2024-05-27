import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component that wraps your application and provides the AuthContext
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [jwt, setJwt] = useState(null);

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      if (res.data.success) {
        const token = res.data.token;
        await storeToken(token);
        loadUser();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const storeToken = async (token) => {
    if (await window.api.safeStorage.isEncryptionAvailable()) {
      const encryptedToken = await window.api.safeStorage.encryptString(token);
      localStorage.setItem('authToken', encryptedToken);
    } else {
      console.error('Safe storage is not available');
    }
  };

  const retrieveToken = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && await window.api.safeStorage.isEncryptionAvailable()) {
      return await window.api.safeStorage.decryptString(storedToken);
    }
    return null;
  };

  const loadUser = useCallback(async () => {
    const token = await retrieveToken();
    setJwt(token);
    if (token) {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, loadUser, jwt }}>
      {children}
    </AuthContext.Provider>
  );
}
