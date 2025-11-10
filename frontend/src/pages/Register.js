import React, { useState } from 'react';
import { apiPost, setToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const res = await apiPost('/auth/register', { name, email, password });
      if (res && res.token) {
        setToken(res.token);
        if (res.user) localStorage.setItem('folium_user', JSON.stringify(res.user));
        navigate('/');
        window.location.reload();
      } else {
        setErr('Invalid response from server');
      }
    } catch (error) {
      setErr(error.message || 'Registration failed');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '24px auto', padding: 12 }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Register</button>
        {err && <div style={{ color: 'red' }}>{err}</div>}
      </form>
    </div>
  );
}
