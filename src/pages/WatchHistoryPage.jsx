import React from "react";
import { useUserData } from "../context/UserDataContext";
import MovieCard from "../components/MovieCard";

const WatchHistoryPage = () => {
  const { history, clearHistory } = useUserData();
  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", color: "#fff" }}>
      <h2 style={{ marginBottom: 24 }}>Watch History</h2>
      {history.length === 0 ? (
        <div style={{ color: "#bbb" }}>No movies watched yet.</div>
      ) : (
        <>
          <button onClick={clearHistory} style={{ marginBottom: 18, background: '#1da1f2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Clear History</button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {history.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WatchHistoryPage;
