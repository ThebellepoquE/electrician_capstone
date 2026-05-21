# Spec: Tests para GET /api/services

## Requirements

### R1: El endpoint consulta la base de datos
El endpoint `GET /api/services` **DEBE** consultar la tabla `services` de MySQL usando el pool exportado desde `database.js`, en lugar de usar el array `mockServices` en memoria.

### R2: Solo devuelve servicios activos
El endpoint **DEBE** filtrar y devolver únicamente servicios donde `is_active = true`.

### R3: Respuesta JSON correcta
La respuesta **DEBE** ser un array JSON de objetos con las propiedades:
- `id` (number)
- `name` (string)
- `description` (string)
- `category` (string)
- `is_active` (boolean)
- `created_at` (string/ISO date)

### R4: Manejo de errores
Si la consulta a la base de datos falla, el endpoint **DEBE** responder con status 500 y un JSON `{ "error": "Error obteniendo servicios" }`.

### R5: Test unitario del handler
**DEBE** existir al menos un test unitario que verifique la lógica del handler de `GET /api/services` en aislamiento (sin levantar el servidor HTTP).

### R6: Test de integración del endpoint
**DEBE** existir al menos un test de integración que:
- Levante el servidor HTTP
- Haga un request `GET /api/services`
- Verifique status 200 y que la respuesta es un array no vacío
- Verifique que todos los servicios retornados tienen `is_active === true`

### R7: Configuración de Vitest para backend
El proyecto **DEBE** tener configuración de Vitest que permita ejecutar tests del backend con:
- `npm test` o `npx vitest run` como command runner
- Soporte para ES modules (`type: "module"` en package.json)
- Modo mock DB activable via variable de entorno

## Scenarios

### Scenario: Servicios activos disponibles
- **Dado** que la tabla `services` tiene 3 servicios activos y 2 inactivos
- **Cuando** se hace `GET /api/services`
- **Entonces** se reciben exactamente 3 servicios
- **Y** todos tienen `is_active === true`

### Scenario: Base de datos sin servicios
- **Dado** que la tabla `services` está vacía
- **Cuando** se hace `GET /api/services`
- **Entonces** se recibe status 200 con un array vacío `[]`

### Scenario: Error de base de datos
- **Dado** que la conexión a la base de datos falla
- **Cuando** se hace `GET /api/services`
- **Entonces** se recibe status 500 con `{ "error": "Error obteniendo servicios" }`

## Database Schema Reference

Tabla `services` (ya definida en `database.js`):

```sql
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Query esperada

```sql
SELECT * FROM services WHERE is_active = true
```
