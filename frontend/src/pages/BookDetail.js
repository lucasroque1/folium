import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../api';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet(`/books/${id}`);
        setBook(res);
      } catch (err) {
        console.error('Error loading book', err);
      }
    }
    load();
  }, [id]);

  if (!book) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{book.title}</h2>
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          style={{ width: 200 }}
        />
      )}
      <p><strong>Authors:</strong> {(book.authors || []).join(', ')}</p>
      <p><strong>Type:</strong> {book.type}</p>
      <p><strong>Description:</strong></p>
      <p>{book.description}</p>
    </div>
  );
}
