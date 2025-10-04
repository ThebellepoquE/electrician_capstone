import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();

// Configuración de CORS específica
// Allow local development (vite on 5173) and keep the existing production origin.
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://musical-waddle-g47wj5v56ppg2vxg9-5173.app.github.dev'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., server-to-server, curl, Postman).
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend electricista funcionando!' });
});

app.get('/api/services', async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services WHERE is_active = true');
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

