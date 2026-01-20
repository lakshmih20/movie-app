import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("movieapp_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email) => {
    setUser({ email });
    localStorage.setItem("movieapp_user", JSON.stringify({ email }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("movieapp_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
