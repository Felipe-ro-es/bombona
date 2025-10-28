const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) return res.status(400).json({ message: 'Campos faltando' });
  const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (rows.length) return res.status(400).json({ message: 'Email já cadastrado' });
  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hash]);
  return res.json({ id: result.insertId, name, email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Campos faltando' });
  const [rows] = await pool.query('SELECT id, password_hash, name, role FROM users WHERE email = ?', [email]);
  if (!rows.length) return res.status(401).json({ message: 'Credenciais inválidas' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, email, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
};

module.exports = { signup, login };
