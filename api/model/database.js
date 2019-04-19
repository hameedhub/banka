import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://bfvbzggj:kT9e4RXweJwaqqGGJJxxYyDW0H72QnHT@isilo.db.elephantsql.com:5432/bfvbzggj',
});
pool.on('connect', () => {
  console.log('connected to the database');
});

export default pool;