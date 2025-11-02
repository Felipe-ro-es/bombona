import React, { useState } from 'react';
import api from '../services/api';

export default function UpdateBombonaLocal() {
  const [bombonaId, setBombonaId] = useState('');
  const [localId, setLocalId] = useState('');
  const [msg, setMsg] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/bombonas/local', { bombonaId, localId });
      setMsg('Local da bombona atualizado!');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao atualizar local');
    }
  };

  return (
    <div>
      <h2>Atualizar Local da Bombona</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="ID da Bombona" value={bombonaId} onChange={e => setBombonaId(e.target.value)} required />
        <input type="text" placeholder="ID do Local" value={localId} onChange={e => setLocalId(e.target.value)} required />
        <button type="submit">Atualizar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
