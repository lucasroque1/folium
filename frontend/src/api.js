// simples helper para comunicação com o backend
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('folium_token');
}

function setToken(token) {
  localStorage.setItem('folium_token', token);
}

function removeToken() {
  localStorage.removeItem('folium_token');
}

async function request(path, opts = {}) {
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
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
