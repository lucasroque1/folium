// frontend/src/api.js
const API_BASE = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, '');

function getToken() {
  return localStorage.getItem('folium_token');
}

function setToken(token) {
  localStorage.setItem('folium_token', token);
}

function removeToken() {
  localStorage.removeItem('folium_token');
  localStorage.removeItem('folium_user');
}

async function request(path, opts = {}) {
  // garante que o path começa com /api
  const normalizedPath = path.startsWith('/api') ? path : `/api${path.startsWith('/') ? '' : '/'}${path}`;
  const url = `${API_BASE}${normalizedPath}`;

  const headers = opts.headers || {};
  // only add content-type when there is a body and it's JSON
  if (opts.body && !(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json';

  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { ...opts, headers });

  if (res.status === 204) return null;

  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export async function apiGet(path) {
  return request(path, { method: 'GET' });
}
export async function apiPost(path, body) {
  return request(path, { method: 'POST', body: JSON.stringify(body) });
}
export async function apiPut(path, body) {
  return request(path, { method: 'PUT', body: JSON.stringify(body) });
}
export async function apiDelete(path) {
  return request(path, { method: 'DELETE' });
}

export { API_BASE, getToken, setToken, removeToken };
export default { apiGet, apiPost, apiPut, apiDelete };
