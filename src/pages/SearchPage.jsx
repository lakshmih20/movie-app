import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { searchMovies } from '../api/omdb';
import './MovieDetails.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError('');
    setResults([]);
    searchMovies(query).then(({ data, error }) => {
      setResults(data || []);
      setError(error || '');
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="movie-bg" style={{ minHeight: '100vh' }}>
      <div className="movie-gradient-overlay">
        <div className="movie-content">
          <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: 30 }}>
            ← Back
          </button>
          <h2 className="movie-title" style={{ fontSize: '2rem', marginBottom: 16 }}>
            Search Results for: <span style={{ color: '#1da1f2' }}>{query}</span>
          </h2>
          {loading && <div style={{ color: '#fff', fontSize: '1.2rem' }}>Loading...</div>}
          {error && <div style={{ color: 'red', fontSize: '1.2rem' }}>{error}</div>}
          {!loading && !error && results.length === 0 && (
            <div style={{ color: '#bbb', fontSize: '1.1rem' }}>No movies found.</div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 24, justifyContent: 'center' }}>
            {results.map((movie) => (
              <Link
                to={`/movie/${movie.imdbID}`}
                key={movie.imdbID}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
                  width: 180,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'background 0.18s, box-shadow 0.18s',
                }}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x260?text=No+Image'}
                  alt={movie.Title}
                  style={{ width: '100%', height: 260, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <div style={{ padding: '12px 10px', width: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{movie.Title}</div>
                  <div style={{ color: '#aaa', fontSize: '0.95rem' }}>{movie.Year}</div>
                  <div style={{ color: '#1da1f2', fontSize: '0.9rem', marginTop: 2 }}>{movie.Type}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;