import React, { useEffect, useState } from 'react';
import api from '../services/api';
import BombonaCard from './BombonaCard';

export default function Bombonas() {
  const [bombonas, setBombonas] = useState([]);

  const fetchBombonas = async () => {
    try {
      const res = await api.get('/bombonas');
      setBombonas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBombonas();
  }, []);

  return (
    <div>
      <h2>Bombonas</h2>
      {bombonas.length === 0 && <p>Nenhuma bombona cadastrada</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {bombonas.map(b => <BombonaCard key={b.id} bombona={b} />)}
      </div>
    </div>
  );
}