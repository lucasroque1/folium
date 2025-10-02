const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  type: { type: String, enum: ['book', 'hq', 'manga'], default: 'book' },
  description: String,
  genres: [String],
  tags: [String],
  coverUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
