import mysql from 'mysql2';
import { config } from 'dotenv';

// Cargar variables del .env
config();

// Crear pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'elecrician_capstone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error(' ❌ Error al conectando MySQL:', err.message);
  } else {
    console.log('✅Conexión a MySQL exitosa!'); // EXIT
    connection.release();
  }
});

export default pool.promise();