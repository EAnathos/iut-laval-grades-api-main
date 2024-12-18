import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'iut_laval_grades',
  password: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export { pool };