import React, { useEffect, useState } from 'react';
import { getEnglishMovies } from '../api/omdb';
import MovieCard from './MovieCard';

function EnglishMoviesRow() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const { data } = await getEnglishMovies();
      setMovies(data || []);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ marginBottom: 16 }}>Moving English Movies</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'flex', overflowX: 'auto', gap: 18, paddingBottom: 8 }}>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EnglishMoviesRow;
