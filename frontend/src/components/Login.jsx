import React, { useState } from 'react';
import api, { setToken } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, senha });
      setToken(res.data.token);
      onLogin(res.data.token);
      navigate('/bombonas');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao logar');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
         <Link to="/"><button type='submit'>Cadastro</button></Link>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
