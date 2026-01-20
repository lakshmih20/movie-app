
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/omdb';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function TrailerPage() {
  const { imdbID } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTrailer() {
      setLoading(true);
      setError('');
      setTrailerKey(null);
      try {
        // Use getMovieDetails from omdb.js
        const { data: omdbData, error: omdbError } = await getMovieDetails(imdbID);
        console.log('OMDB Data:', omdbData, omdbError);
        if (!omdbData || !omdbData.Title || !omdbData.Year) throw new Error('Movie not found');
        // Search TMDB for the movie
        const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(omdbData.Title)}&year=${parseInt(omdbData.Year)}`);
        const searchData = await searchRes.json();
        console.log('TMDB Search:', searchData);
        if (!searchData.results || searchData.results.length === 0) throw new Error('Movie not found on TMDB');
        const tmdbId = searchData.results[0].id;
        // Get videos
        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`);
        const videoData = await videoRes.json();
        console.log('TMDB Videos:', videoData);
        const trailer = (videoData.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError('No trailer available.');
        }
      } catch (e) {
        setError('Failed to load trailer.');
        console.error(e);
      }
      setLoading(false);
    }
    fetchTrailer();
  }, [imdbID]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={() => navigate(-1)} style={{ margin: 24, background: '#0078d7', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer', fontSize: 15 }}>← Back</button>
      {loading && <div style={{ color: '#fff' }}>Loading trailer...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {trailerKey && (
        <div style={{ width: '90vw', maxWidth: 900, aspectRatio: '16/9', background: '#111', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 24px #000a' }}>
          <iframe
            title="Movie Trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default TrailerPage;
