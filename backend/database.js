import mysql from 'mysql2';
import { config } from 'dotenv';

config();

// SOLO POOL - versión limpia
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'electrician_capstone',
  socketPath: '/var/run/mysqld/mysqld.sock',
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

export default pool.promise();