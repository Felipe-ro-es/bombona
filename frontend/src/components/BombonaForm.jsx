// src/components/BombonaForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function BombonaForm() {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localId, setLocalId] = useState('');
  const [locais, setLocais] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchLocais = async () => {
      const res = await api.get('/locais');
      setLocais(res.data);
    };
    fetchLocais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/bombonas', { codigo, descricao, localId });
      setMsg('Bombona criada com sucesso!');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao criar bombona');
    }
  };

  return (
    <div>
      <h2>Criar Bombona</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Código" value={codigo} onChange={e=>setCodigo(e.target.value)} required />
        <input type="text" placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} required />
        <select value={localId} onChange={e=>setLocalId(e.target.value)} required>
          <option value="">Selecione o local</option>
          {locais.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
        </select>
        <button type="submit">Criar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
