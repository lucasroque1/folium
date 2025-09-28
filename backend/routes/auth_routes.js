const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/user.model');
const { signToken } = require('../utils/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const existing = await findUserByEmail(email);
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);
  const user = await createUser({ name, email, password_hash });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ user, token });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
});


router.get('/validate', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    
    res.json({ ok: true, id: decoded.id, email: decoded.email });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
