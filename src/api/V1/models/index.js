import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config';

// Loads .env file contents
dotenv.config();

let conString;
if (process.env.NODE_env === 'test') {
  conString = config.test.db;
} else if (process.env.NODE_env === 'development') {
  conString = config.development.db;
} else if (process.env.NODE_env === 'production') {
  conString = config.production.db;
}

// Create an instance of pool for connection
const pool = new Pool({
  connectionString: conString,
});

pool.on('connect', () => {
});

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
