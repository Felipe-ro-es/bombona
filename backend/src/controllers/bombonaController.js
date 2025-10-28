const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
const { generateQR } = require('../utils/qrcode');

const createBombona = async (req, res) => {
  const { description, code } = req.body;
  const uuid = uuidv4();
  // Insert
  const [result] = await pool.query(
    'INSERT INTO bombonas (uuid, code, description, created_by) VALUES (?, ?, ?, ?)',
    [uuid, code || null, description || null, req.user.id]
  );
  // Let's build a QR payload — simplest: url with uuid that front-end will scan
  // e.g. https://your-front-url/scan/<uuid> (but we'll just include uuid)
  const qrText = JSON.stringify({ uuid });
  const dataUrl = await generateQR(qrText);
  const [rows] = await pool.query('SELECT * FROM bombonas WHERE id = ?', [result.insertId]);
  return res.json({ bombona: rows[0], qr: dataUrl });
};

const listBombonas = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM bombonas ORDER BY created_at DESC');
  return res.json(rows);
};

const getBombonaByUuid = async (req, res) => {
  const { uuid } = req.params;
  const [rows] = await pool.query('SELECT * FROM bombonas WHERE uuid = ?', [uuid]);
  if (!rows.length) return res.status(404).json({ message: 'Bombona não encontrada' });
  return res.json(rows[0]);
};

module.exports = { createBombona, listBombonas, getBombonaByUuid };
