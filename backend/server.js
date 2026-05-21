import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import { getActiveServices } from './services.js';
import { createTables } from './database.js';
import {
  createServiceSchema,
  updateServiceSchema,
  loginSchema,
  registerSchema,
  contactSchema,
} from './validation.js';

const isTest = process.env.NODE_ENV === 'test';

export const app = express();

// CORS configuration for development and production
const allowedOrigins = [
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'https://thebellepoque.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Rate limiting (disabled in test environment)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
  skip: () => isTest,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many requests, please try again later.' },
  skip: () => isTest,
});

// Mock data users (password_hash is bcrypt of "admin123" and "cliente123")
const BCRYPT_SALT_ROUNDS = 10;
const mockUsers = [
  {
    id: 1,
    email: 'admin@electricista.com',
    password_hash: '$2b$10$duVpfvoAt1yF5HNtskI0Y.Qrzt1bUCGnBjgBtncBxAn3lZMpzDQBm',
    nombre: 'Administrador Principal',
    role: 'admin'
  },
  {
    id: 2,
    email: 'cliente@ejemplo.com',
    password_hash: '$2b$10$7GwX48wXq0aiF7Vm4AzjYunIa4CoASOnSttLMYbgCMrIbQ8f9jBo2',
    nombre: 'Cliente Demo',
    role: 'cliente'
  }
];

// Mock data services
let mockServices = [
  {
    id: 1,
    name: 'Instalación Eléctrica Residencial',
    description: 'Instalación completa de sistemas eléctricos para hogares, incluyendo cableado, tableros y puntos de luz.',
    category: 'instalación',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Mantenimiento Preventivo',
    description: 'Revisión y mantenimiento de instalaciones eléctricas para prevenir fallas y garantizar seguridad.',
    category: 'mantenimiento',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Reparación de Averías',
    description: 'Diagnóstico y reparación de problemas eléctricos, cortocircuitos y fallas en el sistema.',
    category: 'reparación',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Instalación de Sistemas de Iluminación',
    description: 'Diseño e instalación de sistemas de iluminación LED, decorativa y de emergencia.',
    category: 'instalación',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Instalación de Paneles Solares',
    description: 'Instalación y configuración de sistemas de energía solar fotovoltaica para hogares y empresas.',
    category: 'instalación',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Actualización de Instalaciones',
    description: 'Modernización de instalaciones eléctricas antiguas para cumplir con normativas actuales de seguridad.',
    category: 'mantenimiento',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

// Endpoints de servicios 
app.get('/', (_req, res) => {
  res.json({ message: 'Backend electricista funcionando' });
});

// ENDPOINTS DE SERVICIOS CON MOCK DATA

// GET /api/services
app.get('/api/services', async (_req, res) => {
  try {
    const services = await getActiveServices();
    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error obteniendo servicios' });
  }
});

// POST /api/services
app.post('/api/services', (req, res) => {
  try {
    const result = createServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }
    const { name, description, category } = result.data;
    const newService = {
      id: mockServices.length + 1,
      name,
      description,
      category,
      is_active: true,
      created_at: new Date().toISOString()
    };

    mockServices.push(newService);
    res.json(newService);
  } catch (error) {
    console.error('Error creando servicio:', error);
    res.status(500).json({ error: 'Error creando servicio' });
  }
});

// PUT /api/services/:id
app.put('/api/services/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const result = updateServiceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }

    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    mockServices[serviceIndex] = {
      ...mockServices[serviceIndex],
      ...result.data,
    };

    res.json({ success: true, message: 'Servicio actualizado' });
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    res.status(500).json({ error: 'Error actualizando servicio' });
  }
});

// DELETE /api/services/:id
app.delete('/api/services/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);

    if (serviceIndex === -1) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    mockServices[serviceIndex].is_active = false;
    res.json({ success: true, message: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error eliminando servicio:', error);
    res.status(500).json({ error: 'Error eliminando servicio' });
  }
});

// ENDPOINTS AUTH (rate limited)
app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  console.log('Intento de login:', email);

  const loginResult = loginSchema.safeParse({ email, password });
  if (!loginResult.success) {
    return res.status(400).json({ success: false, message: loginResult.error.errors[0].message });
  }

  const user = mockUsers.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Usuario no encontrado. Usa: admin@electricista.com o cliente@ejemplo.com'
    });
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: 'Contraseña incorrecta'
    });
  }

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
});

app.post('/api/auth/register', authLimiter, async (req, res) => {
  const { email, password, nombre } = req.body;
  console.log('Registro de usuario:', email);

  const registerResult = registerSchema.safeParse({ email, password, nombre });
  if (!registerResult.success) {
    return res.status(400).json({ success: false, message: registerResult.error.errors[0].message });
  }

  // Verificar si el usuario ya existe
  const userExists = mockUsers.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'El usuario ya existe'
    });
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const newUser = {
    id: mockUsers.length + 1,
    email,
    password_hash: hashedPassword,
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

// ENDPOINTS CONTACT (rate limited)
app.post('/api/contact', contactLimiter, (req, res) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, error: result.error.errors[0].message });
  }
  const { name, email, message } = result.data;
  console.log('Contact form submission:', { name, email, message });
  res.json({ success: true, message: 'Message received' });
});

// PUERTO ( solo cuando se ejecuta directamente, no al importar para tests )
const isDirect = process.argv[1] && process.argv[1].includes('server.js');
if (isDirect) {
  (async () => {
    await createTables();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })();
}
