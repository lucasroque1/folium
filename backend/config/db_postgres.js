const { Pool } = require('pg');

let pool = null;

function createPgPoolFromEnv() {
  if (pool) return pool;
  const config = {
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'libris_users',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  };
  pool = new Pool(config);
  pool.on('error', (err) => {
    console.error('Unexpected PG pool error', err);
  });
  return pool;
}

module.exports = createPgPoolFromEnv;