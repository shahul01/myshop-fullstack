import { Pool } from 'pg';

const password = process.env.POSTGRES_PASSWORD || 'postgres';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myshop-fullstack',
  password: password,
  port: 5432
});

export default pool;
