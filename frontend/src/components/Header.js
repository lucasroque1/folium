import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../api';

export default function Header() {
  const navigate = useNavigate();
  const token = getToken();

  function handleLogout() {
    removeToken();
    navigate('/login');
    window.location.reload();
  }

  return (
    <header style={headerStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: '700', fontSize: 20 }}>Folium</Link>
      </div>
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Catalog</Link>
        {token ? (
          <>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 20px',
  borderBottom: '1px solid #eee',
  alignItems: 'center',
  background: '#fff'
};
const linkStyle = { textDecoration: 'none', color: '#333' };
const btnStyle = { padding: '6px 10px', cursor: 'pointer' };
