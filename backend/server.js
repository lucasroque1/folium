require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/db_mongo');
const createPgPool = require('./config/db_postgres');

const authRoutes = require('./routes/auth.routes');
const booksRoutes = require('./routes/books.routes');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    const envMongoUri = process.env.MONGO_URI || null;
    await connectMongo(envMongoUri);

    const pool = createPgPool();
    try {
      await pool.query('SELECT 1');
      console.log('Connected to Postgres');
    } catch (pgErr) {
      console.warn('Postgres connection test failed:', pgErr.message);
    }

    app.use('/api/auth', authRoutes);
    app.use('/api/books', booksRoutes);

    app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
  } catch (err) {
    console.error('Error during initial DB connections', err);
    process.exit(1);
  }
})();
