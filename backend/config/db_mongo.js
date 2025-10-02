const mongoose = require('mongoose');

async function connectMongo(mongoUri) {
  let uri = mongoUri;
  if (!uri) {
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST || 'localhost';
    const port = process.env.MONGO_PORT || '27017';
    const db = process.env.MONGO_DB || 'libris_db';

    if (user && pass) {
      uri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}?authSource=admin`;
    } else {
      uri = `mongodb://${host}:${port}/${db}`;
    }
  }

  const maxAttempts = 8;
  let attempt = 0;
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  while (attempt < maxAttempts) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
      return;
    } catch (err) {
      attempt++;
      console.warn(`MongoDB connection attempt ${attempt}/${maxAttempts} failed:`, err.message);
      if (attempt >= maxAttempts) {
        console.error('Could not connect to MongoDB after multiple attempts. Exiting.');
        process.exit(1);
      }
      await wait(1000 * attempt);
    }
  }
}

module.exports = connectMongo;