import { Pool } from 'pg';
import dotenv from 'dotenv';

// Loads .env file contents
dotenv.config();


// Create an instance of pool for connection
const pool = new Pool({
  connectionString: process.env.DATABASE_CLOUD_URL,
});

pool.on('connect', () => {});

// Export object with query method
export default {
  async query(queryString, params) {
    const res = await pool.query(queryString, params);
    return res;
  },
};

// this should close connection pool when idle
pool.on('remove', () => {
  // process.exit(0);
});

require('make-runnable');
