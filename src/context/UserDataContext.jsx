import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";



const UserDataContext = createContext();
export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);

  // Load user data from localStorage
  useEffect(() => {
    if (user) {
      const wl = JSON.parse(localStorage.getItem(`movieapp_watchlist_${user.email}`) || "[]");
      const hist = JSON.parse(localStorage.getItem(`movieapp_history_${user.email}`) || "[]");
      setWatchlist(wl);
      setHistory(hist);
    } else {
      setWatchlist([]);
      setHistory([]);
    }
  }, [user]);

  // Save to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`movieapp_watchlist_${user.email}` , JSON.stringify(watchlist));
    }
  }, [watchlist, user]);
  useEffect(() => {
    if (user) {
      localStorage.setItem(`movieapp_history_${user.email}` , JSON.stringify(history));
    }
  }, [history, user]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([movie, ...watchlist]);
    }
  };
  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== imdbID));
  };
  const addToHistory = (movie) => {
    setHistory((prev) => {
      const filtered = prev.filter((m) => m.imdbID !== movie.imdbID);
      return [movie, ...filtered].slice(0, 30); // keep last 30
    });
  };
  const clearHistory = () => setHistory([]);

  return (
    <UserDataContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, history, addToHistory, clearHistory }}>
      {children}
    </UserDataContext.Provider>
  );
};


