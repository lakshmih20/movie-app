import React from 'react';

function HeroBanner({ movie, onWatch, onWatchlist }) {
  if (!movie) return null;
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 420,
        background: `linear-gradient(90deg, #0f0f0f 60%, rgba(24,24,24,0.2)), url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1200x600?text=No+Image'}) center/cover no-repeat`,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 32,
        overflow: 'hidden',
        boxShadow: '0 4px 32px #0008',
      }}
    >
      <div style={{ padding: '48px 48px 48px 64px', maxWidth: 600, zIndex: 2 }}>
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>{movie.Title}</div>
        <div style={{ fontSize: 18, color: '#e0e0e0', marginBottom: 18 }}>{movie.Year} &bull; {movie.Type?.toUpperCase()}</div>
        <div style={{ fontSize: 17, color: '#ccc', marginBottom: 24, maxWidth: 500 }}>{movie.Plot || 'No description available.'}</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{ background: '#fff', color: '#181818', fontWeight: 700, fontSize: 18, borderRadius: 8, padding: '12px 32px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #0004' }} onClick={onWatch}>
            ▶ Ep. 1
          </button>
          <button style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 8, padding: '12px 32px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #0002' }} onClick={onWatchlist}>
            + Watchlist
          </button>
        </div>
      </div>
      {/* Poster image for mobile/side */}
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/320x480?text=No+Image'}
        alt={movie.Title}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          height: 400,
          objectFit: 'cover',
          borderRadius: '0 16px 16px 0',
          boxShadow: '0 2px 16px #0008',
          zIndex: 1,
          display: 'block',
        }}
      />
    </section>
  );
}

export default HeroBanner;
