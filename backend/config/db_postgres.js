const { Pool } = require('pg');

function createPgPool(config) {
  const pool = new Pool(config);
  pool.on('error', (err) => {
    console.error('Unexpected PG error', err);
    process.exit(-1);
  });
  return pool;
}

module.exports = createPgPool;
