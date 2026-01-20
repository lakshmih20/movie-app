

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroLanding from '../components/HeroLanding';
import MovieRow from '../components/MovieRow';
import { searchMovies } from '../api/omdb';

const featuredQuery = 'Avengers';
const popularQuery = 'Batman';
const recommendedQuery = 'Star Wars';


function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [popular, setPopular] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError('');
      try {
        const [featuredRes, popularRes, recommendedRes] = await Promise.all([
          searchMovies(featuredQuery),
          searchMovies(popularQuery),
          searchMovies(recommendedQuery),
        ]);
        setFeatured(featuredRes.data && featuredRes.data[0]);
        setPopular(popularRes.data || []);
        setRecommended(recommendedRes.data || []);
        setError(featuredRes.error || popularRes.error || recommendedRes.error || '');
      } catch (e) {
        setError('Failed to load movies.');
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div style={{ width: '100%', padding: '0 0 32px 0' }}>
      <HeroLanding onSearch={q => navigate(`/search?q=${encodeURIComponent(q)}`)} />
      {loading && <div style={{ textAlign: 'center', color: '#1da1f2', margin: '24px 0' }}>Loading...</div>}
      {error && <div style={{ textAlign: 'center', color: 'red', margin: '24px 0' }}>{error}</div>}
      <MovieRow title="Popular" movies={popular} onCardClick={movie => navigate(`/movie/${movie.imdbID}`)} />
      <MovieRow title="Recommended" movies={recommended} onCardClick={movie => navigate(`/movie/${movie.imdbID}`)} />
    </div>
  );
}

export default HomePage;
