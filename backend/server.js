import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();

app.use(cors({
  origin: 'https://musical-waddle-g47wj5v56ppg2vxg9-5173.app.github.dev',
  credentials: true
}));
app.use(express.json());

// Mock data users an services
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

const mockServices = [
  {
    id: 1,
    name: 'Localización de Fallos Eléctricos',
    description: 'Diagnóstico y reparación de problemas eléctricos, cortocircuitos y fallos en instalaciones',
    category: 'reparación',
    is_emergency: true,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2, 
    name: 'Instalación de Iluminación',
    description: 'Instalación de nuevos puntos de luz, lámparas, sistemas de iluminación interior y exterior',
    category: 'instalación',
    is_emergency: false,
    is_active: true,
    created_at: new Date().toISOString()
  }
  // ... añadir los otros 6 servicios
];

// Endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Backend electricista funcionando!' });
});

app.get('/api/services', async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services WHERE is_active = true');
    res.json(services);
  } catch (error) {
    // Si falla MySQL, USAR MOCK DATA
    res.json(mockServices.filter(services => services.is_active));
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Intento de login:', email);

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
  console.log('Intento de registro:', email);

  const newUser = {
    id: mockUsers.length + 1,
    email,
    password_hash: 'mock_hash_' + Date.now(),
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

// CRUD SERVICES
app.post('/api/services', (req, res) => {
  const newService = {
    id: mockServices.length + 1,
    ...req.body,
    created_at: new Date().toISOString()
  };
  mockServices.push(newService);
  res.json({ success: true, service: newService });
});

app.put('/api/services/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockServices.findIndex(s => s.id === id);
  
  if (index !== -1) {
    mockServices[index] = { ...mockServices[index], ...req.body };
    res.json({ success: true, service: mockServices[index] });
  } else {
    res.status(404).json({ success: false, message: 'Servicio no encontrado' });
  }
});

app.delete('/api/services/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = mockServices.findIndex(s => s.id === id);

  if (index !== -1) {
    mockServices.splice(index, 1);
    res.json({ success: true, message: 'Servicio eliminado' });
  } else {
    res.status(404).json({ success: false, message: 'Servicio no encontrado' });
  }
});

// PUERTO ( luego )
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
