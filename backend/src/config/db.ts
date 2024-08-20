import { Pool } from 'pg';
import { pgDatabase, pgHost, pgPassword, pgPort, pgUsername } from '../constants';

const pool = new Pool({
  user: pgUsername,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

export default pool;
