import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navLinkStyle = (active) => ({
    color: active ? '#fff' : '#bbb',
    fontWeight: active ? 700 : 500,
    fontSize: 17,
    padding: '0 18px',
    lineHeight: '56px',
    textDecoration: 'none',
    borderBottom: active ? '3px solid #1da1f2' : '3px solid transparent',
    transition: 'color 0.2s, border-bottom 0.2s',
    display: 'inline-block',
  });
  return (
    <header style={{
      width: '100%',
      background: '#111',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the navbar horizontally
      padding: 0,
      height: 68,
      boxShadow: '0 2px 12px #0008',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      left: 0,
      right: 0,
      overflow: 'visible',
    }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, minWidth: 260 }}>
          <Link to="/" style={navLinkStyle(location.pathname === '/')}>Home</Link>
          <Link to="/search" style={navLinkStyle(location.pathname === '/search')}>Search</Link>
          {user && <Link to="/watchlist" style={navLinkStyle(location.pathname === '/watchlist')}>Watchlist</Link>}
          {user && <Link to="/history" style={navLinkStyle(location.pathname === '/history')}>History</Link>}
          {!user && <Link to="/signin" style={navLinkStyle(location.pathname === '/signin')}>Sign In</Link>}
          {!user && <Link to="/register" style={navLinkStyle(location.pathname === '/register')}>Register</Link>}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div title={user.email} style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1da1f2 60%, #fff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18,
                color: '#222',
                boxShadow: '0 2px 8px #0004',
                cursor: 'pointer',
              }}>
                <span role="img" aria-label="profile">👤</span>
              </div>
              <button onClick={logout} style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 16,
                cursor: 'pointer',
                fontWeight: 600,
                marginLeft: 4,
              }}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
