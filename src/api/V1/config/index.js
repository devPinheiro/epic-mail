import dotenv from 'dotenv';

dotenv.config();
const config = {
  test: {
    secret: process.env.secret,
    db: process.env.DATABASE_TEST_URL,
    port: process.env.PORT,
  },
  production: {
    secret: process.env.secret,
    db: process.env.DATABASE_CLOUD_URI,
    port: process.env.PORT,
  },
  development: {
    secret: 'WEUOR878WEQKALOPOJ',
    db: 'postgres://postgres:samuel40@localhost:5432/epic-mail',
    port: 4100,
  },
};

export default config;
