const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/user.model');

const jwtSecret = process.env.JWT_SECRET || 'dev_secret';

function signToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: process.env.TOKEN_EXPIRY || '7d' });
}

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await findUserById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { signToken, authMiddleware };
