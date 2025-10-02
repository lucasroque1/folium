import React, { useEffect, useState } from 'react';
import { apiGet } from '../api';
import BookCard from '../components/BookCard';

export default function Library() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet('/library');
        setItems(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error('Error loading library', err);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>My Library</h2>
      {items.length === 0 && <p>No books in your library yet.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {items.map(it => <BookCard key={it._id || it.id} book={it} />)}
      </div>
    </div>
  );
}
