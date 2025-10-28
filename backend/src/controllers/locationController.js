const pool = require('../db');

const listLocations = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM locations ORDER BY name');
  return res.json(rows);
};

const createLocation = async (req, res) => {
  const { name, description } = req.body;
  const [result] = await pool.query('INSERT INTO locations (name, description) VALUES (?, ?)', [name, description]);
  const [rows] = await pool.query('SELECT * FROM locations WHERE id = ?', [result.insertId]);
  return res.json(rows[0]);
};

module.exports = { listLocations, createLocation };
