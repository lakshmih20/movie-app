
import React, { useRef } from 'react';
import MovieCard from './MovieCard';

function MovieRow({ title, movies, onCardClick }) {
  const rowRef = useRef(null);
  if (!movies || movies.length === 0) return null;

  const scrollByAmount = 320; // px, adjust for card width + gap
  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ width: '100%', marginBottom: 36, position: 'relative', padding: '0 60px' }}>
      <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 24, margin: '0 0 18px 0' }}>{title}</h2>
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          style={{
            position: 'absolute',
            left: '24px', // Arrow inside left space
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0004',
            transition: 'background 0.2s',
            opacity: 0.8,
          }}
        >
          {'<'}
        </button>
        {/* Movie Cards Row */}
        <div
          ref={rowRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 20,
            padding: '10px 0', // No horizontal padding
            scrollSnapType: 'x mandatory',
            width: '100%',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
          className="movie-row-scroll"
        >
          {movies.map(movie => (
            <div key={movie.imdbID} style={{ flex: '0 0 220px', scrollSnapAlign: 'start' }} className="movie-card-wrapper">
              <MovieCard movie={movie} onClick={() => onCardClick(movie)} />
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          style={{
            position: 'absolute',
            right: '80px', // Move arrow to overlap last card
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 5, // Ensure arrow is above the card
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0004',
            transition: 'background 0.2s',
            opacity: 0.8,
          }}
        >
          {'>'}
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
