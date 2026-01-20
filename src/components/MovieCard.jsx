import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div
      className="movie-card"
      style={{
        position: 'relative',
        width: 160,
        minWidth: 160,
        height: 240,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClick}
      tabIndex={0}
      onKeyPress={e => { if (e.key === 'Enter') onClick(); }}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/160x240?text=No+Image'}
        alt={movie.Title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <div
        className="movie-info"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          background: 'linear-gradient(0deg, rgba(24,24,24,0.95) 80%, rgba(24,24,24,0.2) 100%)',
          color: '#fff',
          padding: '18px 12px 10px 12px',
          minHeight: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2, textShadow: '0 2px 8px #000' }}>{movie.Title}</div>
        <div style={{ color: '#bbb', fontSize: 13 }}>
          {movie.Year}
          {movie.Type && <span style={{ color: '#ffd700', marginLeft: 6 }}>{movie.Type.toUpperCase()}</span>}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;