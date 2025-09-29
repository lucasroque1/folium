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

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/libris_db';
connectMongo(mongoUri);

createPgPool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'libris_users',
  port: process.env.PGPORT || 5432
});


app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
