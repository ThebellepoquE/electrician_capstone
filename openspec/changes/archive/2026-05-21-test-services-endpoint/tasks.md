# Tasks: Tests para GET /api/services

## Task 1: Instalar supertest y configurar Vitest
- Instalar `supertest` como devDependency: `npm install -D supertest`
- Crear `vitest.config.js` para tests de backend
- Agregar script `"test": "vitest run"` en `package.json`

**Verification:** `npx vitest --version` funciona

---

## Task 2: Crear `backend/services.js`
- Extraer la query de servicios activos a una función exportable `getActiveServices()`
- Usar el pool importado desde `database.js`
- Query: `SELECT * FROM services WHERE is_active = true`

**Verification:** El módulo importa correctamente y exporta `getActiveServices`

---

## Task 3: Refactorizar `GET /api/services` en `server.js`
- Importar `getActiveServices` desde `./services.js`
- Reemplazar el handler actual (que usa `mockServices`) por una versión async que llama a `getActiveServices()`
- Exportar `app` para tests de integración

**Verification:** `node backend/server.js` arranca sin errores; `curl localhost:3001/api/services` responde (usa mock DB si no hay MySQL)

---

## Task 4: Escribir test unitario de `getActiveServices()`
- Test que verifica que `getActiveServices()` retorna un array
- Test que verifica que los servicios tienen `is_active === true`
- Test que verifica manejo de errores

**Verification:** `npx vitest run backend/test/services.test.js` → tests unitarios pasan

---

## Task 5: Escribir tests de integración de `GET /api/services`
- Test: GET /api/services → status 200
- Test: la respuesta es un array no vacío
- Test: todos los servicios tienen `is_active === true`
- Test: estructura de campos correcta

**Verification:** `npx vitest run backend/test/services.test.js` → TODOS los tests (unit + integration) pasan

---

## Task 6: Ejecutar suite completa y verificar
- Correr `npx vitest run` y confirmar que todos los tests pasan
- Verificar que no hay warnings ni errores

**Verification:** `npx vitest run` → exit code 0, todos los tests green
