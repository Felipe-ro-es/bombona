const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Nenhum token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
