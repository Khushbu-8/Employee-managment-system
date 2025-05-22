import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import API from "../services/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const login = (userData) => setUser(userData);
  console.log(user,"profile");
  
   useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log(storedUser);
      
      setUser(storedUser);
    }
  }, [token]);
  // context/AuthContext.js or similar
 const logout = async () => {
    try {
      await API.post("/auth/logout"); // if you're using cookie-based auth
      localStorage.clear(); // clear localStorage
      setUser(null);
      setToken(null);
     
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
