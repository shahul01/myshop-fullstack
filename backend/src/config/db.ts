import { Pool } from 'pg';
import { password } from '../constants';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myshop-fullstack',
  password: password,
  port: 5432
});

export default pool;
