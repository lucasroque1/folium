const mongoose = require('mongoose');

async function connectMongo(uri) {
  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectMongo;
