import React from "react";
import { useUserData } from "../context/UserDataContext";
import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const { watchlist } = useUserData();
  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", color: "#fff" }}>
      <h2 style={{ marginBottom: 24 }}>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <div style={{ color: "#bbb" }}>No movies in your watchlist yet.</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
