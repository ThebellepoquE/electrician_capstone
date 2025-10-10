import mysql from 'mysql2';
import { config } from 'dotenv';

config();

// Si se solicita usar DB mock (útil en Windows/Codespaces sin MySQL), activar USE_MOCK_DB=1
const useMock = process.env.USE_MOCK_DB === '1';

let exportedPool;

if (useMock) {
  console.warn('⚠️ USANDO MOCK DB: No se usará MySQL real. Set USE_MOCK_DB=0 para usar la DB real.');

  // Mock simple que expone execute() que devuelve una lista vacía.
  const mockPool = {
    execute: async () => [[], []],
    query: async () => [[], []],
    getConnection: (cb) => cb(null, { release: () => { } })
  };

  exportedPool = mockPool;
} else {
  // Conexión real a MySQL
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'electrician_capstone',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Probar conexión
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error conectando a MySQL:', err.message);
    } else {
      console.log('✅ Conexión a MySQL exitosa!');
      connection.release();
    }
  });

  exportedPool = pool.promise();
}

export default exportedPool;