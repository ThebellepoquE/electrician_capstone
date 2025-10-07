import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());

// Mock data users solo para auth por ahora (sin MySQL)
const mockUsers = [
  {
    id: 1, 
    email: 'admin@electricista.com', 
    password_hash: '$2a$10$examplehash',
    nombre: 'Administrador Principal',
    role: 'admin'
  },
  {
    id: 2,
    email: 'cliente@ejemplo.com',
    password_hash: '$2a$10$examplehash', 
    nombre: 'Cliente Demo',
    role: 'cliente'
  }
];

// Endpoints de servicios 
app.get('/', (_req, res) => {
  res.json({ message: 'Backend electricista funcionando'});
});

// ENDPOINTS MYSQL DE SERVICIOS

// GET /api/services - desde MySQL
app.get('/api/services', async (_req, res) => {
  try {
    const [services] = await db.execute(
  'SELECT * FROM services WHERE is_active = true ORDER BY created_at DESC'
    );
    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error obteniendo servicios' });
  }
});

// POST /api/services - crear en MySQL
app.post('/api/services', async(req, res) => {
  try {
    const { name, description, category } = req.body;
    const [result] = await db.execute(
      'INSERT INTO services (name, description, category) VALUES (?, ?, ?)',
      [name, description, category]
    );

    const [newService] = await db.execute(
      'SELECT * FROM services WHERE id = ?',
      [result.insertId]);
      res.json(newService[0]);
  } catch (error) {
    console.error('Error creando servicio:', error);
    res.status(500).json({ error: 'Error creando servicio' });
  }
});

// PUT /api/services/:id - actualizar en MySQL
app.put('/api/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { name, description, category } = req.body;

    const [result] = await db.execute(
      'UPDATE services SET name = ?, description = ?, category = ? WHERE id = ?',
      [name, description, category, serviceId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json({ sucess: true, message: 'Servicio actualizado' });
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    res.status(500).json({ error: 'Error actualizando servicio' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const [result] = await db.execute(
      'UPDATE services SET is_active = false WHERE id = ?',
      [serviceId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json({ success: true, message: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error eliminando servicio:', error);
    res.status(500).json({ error: 'Error eliminando servicio'});
  }
});
    
 // ENDPOINTS AUTH MOCK
app.post('/api/auth/login', (req, res) => { 
  const { email, password } = req.body;
  console.log('Intento de login:', email, password);

  const user = mockUsers.find(user => user.email === email);

  if (user) {
    res.json({
      success: true,
      message: 'login exitoso',
      token: 'mock_jwt_token_' + user.id,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Usuario no encontrado. Usa: admin@electricista.com o cliente@ejemplo.com'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, nombre } = req.body;
  console.log('Registro de usuario:', email);

  // Verificar si el usuario ya existe
  const userExists = mockUsers.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({
      sucess: false,
      message: 'El usuario ya existe'
    });
  }

  const newUser = {
    id: mockUsers.length + 1,
    email,
    password_hash: password,
    nombre,
    role: 'cliente'
  };

  mockUsers.push(newUser);

  res.json({
    success: true,
    message: 'Usuario registrado exitosamente',
    token: 'mock_jwt_token_' + newUser.id,
    user: {
      id: newUser.id,
      email: newUser.email,
      nombre: newUser.nombre,
      role: newUser.role    
    }  
  });
});

// PUERTO ( luego )
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
