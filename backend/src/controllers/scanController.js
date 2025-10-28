const pool = require('../db');

const createScan = async (req, res) => {
  // body expects: uuid (do QR), location_id (nullable), scanner_info (optional)
  const { uuid, location_id, scanner_info } = req.body;
  if (!uuid) return res.status(400).json({ message: 'uuid é obrigatório' });

  // Encontrar bombona
  const [brows] = await pool.query('SELECT id FROM bombonas WHERE uuid = ?', [uuid]);
  if (!brows.length) return res.status(404).json({ message: 'Bombona não encontrada' });
  const bombonaId = brows[0].id;

  const [result] = await pool.query(
    'INSERT INTO scans (bombona_id, location_id, scanned_by, scanner_info) VALUES (?, ?, ?, ?)',
    [bombonaId, location_id || null, req.user ? req.user.id : null, scanner_info || null]
  );

  // Opcional: atualizar status da bombona com base em location:
  if (location_id) {
    // buscar nome do local e setar status se for a sede/ex.: logica simples
    const [loc] = await pool.query('SELECT name FROM locations WHERE id = ?', [location_id]);
    if (loc.length) {
      const name = loc[0].name.toLowerCase();
      let status = 'em_transito';
      if (name.includes('sede')) status = 'na_sede';
      if (name.includes('hospital') || name.includes('farmacia')) status = 'entregue';
      await pool.query('UPDATE bombonas SET status = ? WHERE id = ?', [status, bombonaId]);
    }
  }

  return res.json({ id: result.insertId, bombona_id: bombonaId, location_id, scanned_by: req.user ? req.user.id : null });
};

const getScansByBombona = async (req, res) => {
  const { uuid } = req.params;
  const [brows] = await pool.query('SELECT id FROM bombonas WHERE uuid = ?', [uuid]);
  if (!brows.length) return res.status(404).json({ message: 'Bombona não encontrada' });
  const bombonaId = brows[0].id;
  const [rows] = await pool.query(
    `SELECT s.*, l.name as location_name, u.name as scanned_by_name
     FROM scans s
     LEFT JOIN locations l ON s.location_id = l.id
     LEFT JOIN users u ON s.scanned_by = u.id
     WHERE bombona_id = ? ORDER BY s.created_at DESC`,
    [bombonaId]
  );
  return res.json(rows);
};

module.exports = { createScan, getScansByBombona };
