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
    getConnection: (cb) => cb(null, { release: () => {} })
  };

  exportedPool = mockPool;
} else {
  // Conexión real a MySQL
  const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'electrician_capstone',
    // socketPath may be irrelevant on Windows; keep if provided
    // socketPath: process.env.DB_SOCKET || '/var/run/mysqld/mysqld.sock',
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

// Funcion para actualizar servicios
export const updateService = async (id, serviceData) => {
  try {
    const [result] = await exportedPool.execute(
      'UPDATE services SET ? WHERE id = ?,description = ?, category = ? WHERE id = ?',
      [serviceData.name, serviceData.description, serviceData.category, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    throw error;
  }
};

// TEMPORAL: Crear tablas si no existen (borrar despues)
  const createTables = async () => {
    try {
      await exportedPool.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          role ENUM('admin', 'client') DEFAULT 'client',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await exportedPool.execute(`
        CREATE TABLE IF NOT EXISTS services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          description TEXT,
          category VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Tablas users y services creadas/existen');
    } catch (error) {
      console.error('Error creando tablas:', error);
    }  
  };

createTables();

export default exportedPool;