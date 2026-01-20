import React, { useEffect, useState } from 'react';
// Add TMDB API key from .env
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import { useUserData } from '../context/UserDataContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovieDetails } from '../api/omdb';
import { useAuth } from '../context/AuthContext';
import './MovieDetails.css'; // IMPORTANT: This must be present

function MovieDetails() {
  const { imdbID } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const navigate = useNavigate();
  const { addToHistory, watchlist, addToWatchlist, removeFromWatchlist } = useUserData();
  const { user } = useAuth();

  useEffect(() => {
    if (typeof user === 'undefined') return;
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError('');
      setDetails(null);
      setTrailerKey(null);
      
      const { data, error } = await getMovieDetails(imdbID);
      setDetails(data);
      setError(error || '');
      setLoading(false);

      if (data && !error && user) {
        addToHistory(data);
      }

      if (data && data.Title && data.Year) {
        setTrailerLoading(true);
        try {
          const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(data.Title)}&year=${parseInt(data.Year)}`);
          const searchData = await searchRes.json();
          if (searchData.results && searchData.results.length > 0) {
            const tmdbId = searchData.results[0].id;
            const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`);
            const videoData = await videoRes.json();
            const trailer = (videoData.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          }
        } catch (e) {
          console.error("Trailer fetch error", e);
        }
        setTrailerLoading(false);
      }
    };
    fetchMovieDetails();
  }, [imdbID, user]);

  if (loading) return <div className="movie-bg" style={{color: 'white', padding: '100px'}}>Loading movie details...</div>;
  if (error) return <div className="movie-bg" style={{color: 'red', padding: '100px'}}>{error}</div>;

  return (
    <div 
      className="movie-bg" 
      style={{ backgroundImage: details?.Poster !== 'N/A' ? `url(${details?.Poster})` : 'none' }}
    >
      <div className="movie-gradient-overlay">
        
        <div className="movie-content">
          <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

          {details && (
            <>
              <div className="movie-genres">{details.Genre}</div>
              <h1 className="movie-title">
                {details.Title} <span className="movie-year">({details.Year})</span>
              </h1>
              

              <div className="movie-meta">
                <div className="movie-rating">⭐ {details.imdbRating} / 10</div>
                <div className="movie-meta-row">
                  <span className="movie-meta-label">Director</span>
                  <span className="movie-meta-value">{details.Director}</span>
                </div>
                <div className="movie-meta-row">
                  <span className="movie-meta-label">Cast</span>
                  <span className="movie-meta-value">{details.Actors}</span>
                </div>
              </div>

              <p className="movie-description">{details.Plot}</p>

              <div className="movie-buttons">
                {!trailerLoading && trailerKey && (
                  <button className="trailer-btn" onClick={() => navigate(`/movie/${imdbID}/trailer`)}>
                    ▶ Watch Trailer
                  </button>
                )}
                <WatchlistButton 
                  movie={details} 
                  watchlist={watchlist} 
                  addToWatchlist={addToWatchlist} 
                  removeFromWatchlist={removeFromWatchlist} 
                />
              </div>
            </>
          )}
        </div>

        {details && details.Poster !== 'N/A' && (
          <div className="movie-poster-right">
            <img src={details.Poster} alt={details.Title} />
          </div>
        )}
      </div>
    </div>
  );
}

function WatchlistButton({ movie, watchlist, addToWatchlist, removeFromWatchlist }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);
  
  const handleClick = () => {
    if (!user) { navigate('/signin'); return; }
    isInWatchlist ? removeFromWatchlist(movie.imdbID) : addToWatchlist(movie);
  };

  return (
    <button onClick={handleClick} className={isInWatchlist ? "favorite-btn active" : "favorite-btn"}>
      {isInWatchlist ? (
        <>
          <span className="favorite-icon">❤️</span> In Watchlist
        </>
      ) : (
        <>
          <span className="favorite-icon">☆</span> Add to Favorites
        </>
      )}
    </button>
  );
}

export default MovieDetails;