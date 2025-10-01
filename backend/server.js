import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
app.use(cors());
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

