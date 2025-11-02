// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Bombonas from './components/Bombonas';
import BombonaForm from './components/BombonaForm';
import LocalForm from './components/LocalForm';
import UpdateBombonaLocal from './components/UpdateBombonaLocal';
import QRCodeScanner from './components/QRCodeScanner';


function App() {
  // Armazena o token do usuário
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Se não estiver logado, redireciona para login
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
        </Routes>
      </Router>
    );
  }

  // Se estiver logado, mostra as rotas do sistema
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/bombonas" style={{ marginRight: '10px' }}>Bombonas</Link>
          <Link to="/bombona/criar" style={{ marginRight: '10px' }}>Criar Bombona</Link>
          <Link to="/locais" style={{ marginRight: '10px' }}>Locais</Link>
          <Link to="/bombona/atualizar" style={{ marginRight: '10px' }}>Atualizar Local</Link>
          <Link to="/scanner" style={{ marginRight: '10px' }}>Scanner QR</Link>

          <button onClick={handleLogout}>Logout</button>
        </nav>

        <Routes>
          <Route path="/bombonas" element={<Bombonas />} />
          <Route path="/bombona/criar" element={<BombonaForm />} />
          <Route path="/locais" element={<LocalForm />} />
          <Route path="/bombona/atualizar" element={<UpdateBombonaLocal />} />
          <Route path="*" element={<Navigate to="/bombonas" />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
