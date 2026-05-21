# Proposal: Tests unitarios y de integración para GET /api/services

## Problem

El endpoint `GET /api/services` actualmente usa datos mock en memoria (`mockServices` array en `server.js`) en lugar de consultar la base de datos MySQL. No existen tests en el proyecto.

## Proposed Change

1. **Refactorizar el endpoint** `GET /api/services` para que consulte la base de datos usando el pool exportado desde `database.js` en lugar del mock en memoria.
2. **Escribir tests unitarios** con Vitest para verificar la lógica del endpoint (filtrado de servicios activos, manejo de errores).
3. **Escribir tests de integración** que verifiquen que el endpoint responde correctamente con datos reales desde la base de datos (usando el mock DB mode para CI sin MySQL).

## Scope

### In scope
- Refactor `GET /api/services` en `backend/server.js` para usar `database.js` pool
- Tests unitarios del handler del endpoint
- Tests de integración con supertest (o fetch natico) contra el server
- Configuración de Vitest para backend
- Verificar que solo devuelve servicios con `is_active = true`

### Out of scope
- Tests para POST, PUT, DELETE de servicios (cambios futuros)
- Tests del frontend
- Tests de autenticación
- Migración completa del server a DB (solo GET /api/services)

## Risks

- El server actual tiene todos los endpoints en un solo archivo `server.js`; habrá que modularizar mínimamente para testear el handler en aislamiento.
- Para tests de integración con DB real se necesita MySQL corriendo; se usará el modo `USE_MOCK_DB=1` como fallback.
- Los endpoints POST/PUT/DELETE seguirán usando mock data después de este cambio (inconsistencia temporal).

## Estimated effort

Pequeño: ~2-3 archivos nuevos/modificados, <200 líneas de código de cambio.
