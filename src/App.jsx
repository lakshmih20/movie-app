import React from 'react';
const TrailerPage = React.lazy(() => import('./pages/TrailerPage'));
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const MovieDetails = React.lazy(() => import('./pages/MovieDetails'));
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const WatchlistPage = React.lazy(() => import('./pages/WatchlistPage'));

const PersonDetails = React.lazy(() => import('./pages/PersonDetails'));
const WatchHistoryPage = React.lazy(() => import('./pages/WatchHistoryPage'));

function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0f0f0f', padding: 0, margin: 0 }}>
      <Navbar />
      <React.Suspense fallback={<div style={{ textAlign: 'center', color: '#1da1f2', margin: '24px 0' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/history" element={<WatchHistoryPage />} />
          <Route path="/person/:name" element={<PersonDetails />} />
          <Route path="/movie/:imdbID/trailer" element={<TrailerPage />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
