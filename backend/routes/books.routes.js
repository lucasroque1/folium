const express = require('express');
const Book = require('../models/book.model');
const { authMiddleware } = require('../utils/auth');
const { recommend } = require('../utils/recommender');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const b = new Book(req.body);
    const saved = await b.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating', err });
  }
});

router.get('/', async (req, res) => {
  const { q, type, genre, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (genre) filter.genres = genre;
  if (q) filter.$text = { $search: q };
  try {
    const items = await Book.find(filter).skip((page - 1) * limit).limit(parseInt(limit));
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching', err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Book.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error', err });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating', err });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting', err });
  }
});


router.get('/:id/recommend', async (req, res) => {
  try {
    const item = await Book.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const all = await Book.find({});
    const recs = recommend(all, item, 6);
    res.json(recs);
  } catch (err) {
    res.status(500).json({ message: 'Error recommending', err });
  }
});

module.exports = router;
