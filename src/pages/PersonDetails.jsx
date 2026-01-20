import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// You will need to set your TMDB API key in an .env file as REACT_APP_TMDB_API_KEY
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function PersonDetails() {
  const { name } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPerson() {
      setLoading(true);
      setError('');
      setPerson(null);
      setMovies([]);
      try {
        // 1. Search for the person by name
        const searchRes = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(name)}`);
        const searchData = await searchRes.json();
        if (!searchData.results || searchData.results.length === 0) {
          setError('No person found.');
          setLoading(false);
          return;
        }
        // Try to find a result that matches the name case-insensitively and trimmed
        const match = searchData.results.find(
          p => p.name.trim().toLowerCase() === name.trim().toLowerCase()
        ) || searchData.results[0];
        const personId = match.id;
        // 2. Get person details
        const detailsRes = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${TMDB_API_KEY}`);
        const detailsData = await detailsRes.json();
        setPerson(detailsData);
        // 3. Get movie credits
        const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}`);
        const creditsData = await creditsRes.json();
        setMovies(creditsData.cast || []);
      } catch (e) {
        setError('Failed to fetch person details.');
      }
      setLoading(false);
    }
    fetchPerson();
  }, [name]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px #0002', padding: 32 }}>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {person && (
        <>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            {person.profile_path && (
              <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} style={{ borderRadius: 8, width: 160 }} />
            )}
            <div>
              <h2>{person.name}</h2>
              <div><b>Known for:</b> {person.known_for_department}</div>
              <div><b>Birthday:</b> {person.birthday || 'N/A'}</div>
              <div><b>Place of Birth:</b> {person.place_of_birth || 'N/A'}</div>
              <div style={{ marginTop: 12 }}>{person.biography}</div>
            </div>
          </div>
          <h3 style={{ marginTop: 32 }}>Filmography</h3>
          <ul>
            {movies.map(movie => (
              <li key={movie.credit_id}>{movie.title} ({movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'})</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default PersonDetails;
