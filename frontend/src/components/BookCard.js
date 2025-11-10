import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  if (!book) return null;
  const id = book._id || book.id;
  return (
    <div style={card}>
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
      ) : (
        <div style={{ ...noCover }}>No cover</div>
      )}
      <div style={{ padding: 10 }}>
        <h3 style={{ margin: 0 }}>{book.title}</h3>
        <p style={{ margin: '6px 0', color: '#666', fontSize: 14 }}>{(book.authors || []).join(', ')}</p>
        <p style={{ margin: '6px 0', fontSize: 13, color: '#444' }}>
          {(book.description || '').slice(0, 120)}
          {(book.description || '').length > 120 ? '...' : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={`/books/${id}`} style={{ textDecoration: 'none', color: '#1a73e8' }}>Details</Link>
          <span style={{ fontSize: 12, padding: '2px 6px', border: '1px solid #ddd', borderRadius: 4 }}>
            {book.type || 'book'}
          </span>
        </div>
      </div>
    </div>
  );
}

const card = {
  border: '1px solid #e6e6e6',
  borderRadius: 6,
  overflow: 'hidden',
  background: '#fff',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
};
const noCover = {
  height: 180,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f4f4f4',
  color: '#888'
};
