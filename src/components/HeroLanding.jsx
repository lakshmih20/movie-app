import React, { useState } from 'react';

function HeroLanding({ onSearch }) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };
  // List of YouTube trailer video IDs (public, popular English movies)

  return (
    <section
      style={{
        width: '100%',
        minHeight: 520,
        background: `linear-gradient(120deg, rgba(10,10,10,0.65) 40%, rgba(30,30,30,0.3) 100%), url('/movie_app.jpg') center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        marginBottom: 32,
        boxShadow: '0 8px 48px #000c',
      }}
    >
      <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 54, marginBottom: 18, letterSpacing: 1, textShadow: '0 4px 32px #000a, 0 2px 16px #1da1f2' }}>
        Unlimited movies, shows, and more
      </h1>
      <h2 style={{ color: '#e0e0e0', fontWeight: 500, fontSize: 26, marginBottom: 32, textShadow: '0 2px 8px #0008' }}>
        Search for your favorite movies and TV shows
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies, TV shows..."
          style={{
            padding: '18px 22px',
            fontSize: 20,
            border: 'none',
            borderRadius: '10px 0 0 10px',
            outline: 'none',
            width: 360,
            maxWidth: '60vw',
            background: 'rgba(255,255,255,0.97)',
            color: '#181818',
            fontWeight: 600,
            boxShadow: '0 2px 12px #0002',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '18px 38px',
            fontSize: 20,
            border: 'none',
            borderRadius: '0 10px 10px 0',
            background: '#1da1f2',
            color: '#fff',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 12px #0004',
            letterSpacing: 1,
            textShadow: '0 2px 8px #0008',
            transition: 'background 0.2s',
          }}
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default HeroLanding;
