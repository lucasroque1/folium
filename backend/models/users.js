const createPgPool = require('../config/db_postgres');
const pool = createPgPool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

const ensureTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(150),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
ensureTable().catch(console.error);

async function createUser({ name, email, password_hash }) {
  const res = await pool.query(
    `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at`,
    [name, email, password_hash]
  );
  return res.rows[0];
}

async function findUserByEmail(email) {
  const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return res.rows[0];
}

async function findUserById(id) {
  const res = await pool.query(`SELECT id, name, email, role, created_at FROM users WHERE id = $1`, [id]);
  return res.rows[0];
}

module.exports = {
  pool,
  createUser,
  findUserByEmail,
  findUserById
};
