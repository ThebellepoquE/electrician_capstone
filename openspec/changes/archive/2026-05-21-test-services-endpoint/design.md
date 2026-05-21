# Design: Tests para GET /api/services

## Architecture

### Current State
```
server.js
├── mockServices (array en memoria)
├── GET /api/services → filtra mockServices
├── POST /api/services → push a mockServices
├── PUT /api/services/:id → modifica mockServices
├── DELETE /api/services/:id → modifica mockServices
└── auth endpoints → mockUsers
```

### Target State
```
server.js
├── GET /api/services → db.query("SELECT * FROM services WHERE is_active = true")
├── POST /api/services → mockServices (sin cambio, out of scope)
├── PUT /api/services/:id → mockServices (sin cambio, out of scope)
├── DELETE /api/services/:id → mockServices (sin cambio, out of scope)
└── auth endpoints → mockUsers

database.js
└── exportedPool (MySQL real o mock)

backend/services.js (NUEVO)
└── getActiveServices() → query a DB, retorna array

backend/test/services.test.js (NUEVO)
├── Test unitario de getActiveServices()
└── Tests de integración GET /api/services
```

## File Changes

### 1. `backend/services.js` (NUEVO)
Módulo que encapsula las queries de servicios. Extrae la lógica de `server.js` para que sea testeable en unidad.

```js
import pool from './database.js';

export async function getActiveServices() {
  const [rows] = await pool.execute(
    'SELECT * FROM services WHERE is_active = true'
  );
  return rows;
}
```

### 2. `backend/server.js` (MODIFICAR)
- Importar `getActiveServices` desde `./services.js`
- Reemplazar el handler de `GET /api/services` para usar la función
- Mantener los demás endpoints con mock data (out of scope para este cambio)
- Exportar la app para tests de integración

```js
import { getActiveServices } from './services.js';

// ...

app.get('/api/services', async (req, res) => {
  try {
    const services = await getActiveServices();
    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error obteniendo servicios' });
    }
  });

// Export para tests
export { app };
```

### 3. `backend/test/services.test.js` (NUEVO)
Tests unitarios y de integración.

```js
import { describe, it, expect } from 'vitest';
import request from 'supertest'; // o usar node fetch
import { app } from '../server.js';
import { getActiveServices } from '../services.js';
```

### 4. `vite.config.js` o `vitest.config.js` (NUEVO/MODIFICAR)
Configuración de Vitest para tests de backend.

### 5. `package.json` (MODIFICAR)
Agregar script `"test": "vitest run"` y dependencia `supertest`.

## Test Strategy

### Unit Tests
- `getActiveServices()` retorna array de servicios activos
- `getActiveServices()` propaga errores de la DB

### Integration Tests
- `GET /api/services` → 200, array de servicios
- Todos los servicios tienen `is_active === true`
- Estructura de respuesta correcta (id, name, description, category, is_active, created_at)

### DB Strategy
- Tests usan el modo mock DB (`USE_MOCK_DB=1`) por defecto
- El mock pool de `database.js` ya soporta `SELECT * FROM services`

## Dependencies to Add
- `supertest` (-D): para tests de integración HTTP
