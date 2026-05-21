import pool from './database.js';

export async function getActiveServices() {
  const [rows] = await pool.execute(
    'SELECT * FROM services WHERE is_active = true'
  );
  return rows;
}
