import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function LocalForm() {
  const [nome, setNome] = useState('');
  const [msg, setMsg] = useState('');
  const [locais, setLocais] = useState([]);

  const fetchLocais = async () => {
    const res = await api.get('/locais');
    setLocais(res.data);
  };

  useEffect(() => {
    fetchLocais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/locais', { nome });
      setMsg('Local criado com sucesso!');
      fetchLocais();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao criar local');
    }
  };

  return (
    <div>
      <h2>Locais</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome do local" value={nome} onChange={e => setNome(e.target.value)} required />
        <button type="submit">Criar</button>
      </form>
      {msg && <p>{msg}</p>}
      <ul>
        {locais.map(l => <li key={l.id}>{l.nome}</li>)}
      </ul>
    </div>
  );
}
