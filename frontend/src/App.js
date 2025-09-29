import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/library" element={<ProtectedRoute><div style={{padding:20}}>My Library (placeholder)</div></ProtectedRoute>} />
        <Route path="/books/:id" element={<div style={{padding:20}}>Book details page - ainda não implementado aqui</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
