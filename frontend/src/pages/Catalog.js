import React, { useEffect, useState } from 'react';
import { apiGet } from '../api';
import BookCard from '../components/BookCard';

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');

  async function load() {
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (type) params.set('type', type);

      const res = await apiGet(`/books?${params.toString()}`);
      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error('Error loading books', err);
      setItems([]);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Catalog</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search"
          style={{ padding: 8, flex: 1 }}
        />

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">All</option>
          <option value="book">Book</option>
          <option value="manga">Manga</option>
          <option value="hq">HQ</option>
        </select>

        <button onClick={load} style={{ padding: '8px 14px' }}>
          Search
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12
      }}>
        {items.map(it => (
          <BookCard key={it._id || it.id} book={it} />
        ))}
      </div>
    </div>
  );
}
