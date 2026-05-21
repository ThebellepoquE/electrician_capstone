# Apply Progress: Tests para GET /api/services

## Completed Tasks

### ✅ Task 1: Instalar supertest y configurar Vitest
- `npm install -D supertest`
- Crear `vitest.config.js` con `USE_MOCK_DB=1` para tests sin MySQL real
- Agregar script `"test": "vitest run"` en package.json

### ✅ Task 2: Crear `backend/services.js`
- Nueva función `getActiveServices()` que consulta la DB con `SELECT * FROM services WHERE is_active = true`

### ✅ Task 3: Refactorizar `GET /api/services` en `server.js`
- Importar `getActiveServices` desde `./services.js`
- Handler ahora es async y usa la función en lugar de mock data
- Exportar `app` para tests de integración
- Server solo arranca cuando se ejecuta directamente

### ✅ Task 4-5: Tests unitarios y de integración
- `backend/test/services.test.js`: 7 tests (3 unit + 4 integration)
- `backend/test/services-error.test.js`: 2 tests (error handling)
- Total: 9 tests passing

### ✅ Task 6: Suite completa verificada
- `npx vitest run` → 9 passed, 0 failed

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `backend/services.js` | NEW | ~8 |
| `backend/server.js` | MODIFIED | ~10 changed |
| `backend/test/services.test.js` | NEW | ~65 |
| `backend/test/services-error.test.js` | NEW | ~45 |
| `vitest.config.js` | NEW | ~13 |
| `package.json` | MODIFIED | +1 script, +1 dep |

## TDD Cycle Evidence

| Cycle | Phase | Evidence |
|-------|-------|----------|
| 1 | RED | Tests fail: `Cannot find module '../services.js'` |
| 2 | GREEN | Created `services.js`, modified `server.js` → 7 tests pass |
| 3 | TRIANGULATE | Added error tests (`services-error.test.js`) → 9 tests pass |
| 4 | REFACTOR | N/A — code is clean |

## Deviations from Design

- None. Design followed as specified.

## Remaining Tasks

- None.

## Workload Forecast

- Total changed lines: ~140 (well under 400-line budget)
- Chained PRs: Not needed
- Single PR is safe
