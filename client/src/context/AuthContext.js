import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
// creates a context named AuthContext that you can use to access 
// authentication-related data (like token, username, login/logout 
// functions) anywhere in your component tree

// The below is a wrapper component that stores and provides auth state 
// (token, username) to all components inside it using 
// <AuthContext.Provider>
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  // This initializes the state from localStorage so that the user stays 
  // logged in across browser refreshes.

  const login = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
  };
  // Updates the React state.
  // Saves the token and username to localStorage (so the user remains 
  // logged in even after a page refresh).

  const logout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };
  // Clears the state and localStorage — effectively logging the user out.

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
    // Any component wrapped inside this provider can access and modify 
    // auth state using useContext(AuthContext)
  );
};
