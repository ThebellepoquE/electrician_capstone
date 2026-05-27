# Spec: Admin Role Check Middleware

**Status:** draft  
**Created:** 2026-05-27  
**Change:** `auth-role-check`

## Requirements

### Requirement A1: requireAuth Middleware
A `requireAuth` middleware function **MUST** be created in `backend/server.js` that:
- Reads the `Authorization` header from incoming requests
- Expects the format: `Authorization: Bearer mock_jwt_token_<userId>`
- Validates that the token matches a user in `mockUsers`
- Attaches the found user to `req.user`
- Returns `401` with `{ error: 'Unauthorized' }` if the token is missing or invalid

### Requirement A2: requireAdmin Middleware
A `requireAdmin` middleware function **MUST** be created that:
- Chains `requireAuth` to validate the user
- Checks `req.user.role === 'admin'`
- Returns `403` with `{ error: 'Forbidden: admin access required' }` if the user is not an admin
- Proceeds to the next handler if both checks pass

### Requirement A3: Protect Write Endpoints
The `requireAdmin` middleware **MUST** be applied to:
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Requirement A4: GET Remains Public
`GET /api/services` **MUST** remain accessible without authentication.

### Requirement A5: Auth Endpoints Remain Public
`POST /api/auth/login`, `POST /api/auth/register`, and `POST /api/contact` **MUST** remain accessible without authentication (they are already rate-limited).

### Requirement A6: Admin Token Validation
When an admin user logs in via `POST /api/auth/login`, the response **MUST** include their `role` in the `user` object. The frontend **MUST** store the user data including `role` in `localStorage`.

### Requirement A7: Unit Tests
A test file `backend/__tests__/adminMiddleware.test.js` **MUST** exist with tests for:
- `401` when no Authorization header is sent to POST /api/services
- `401` when an invalid token is sent
- `403` when a user with `role: 'cliente'` sends a valid token to POST /api/services
- `200` (or `201`) when a user with `role: 'admin'` sends a valid token to POST /api/services
- Same pattern applied to PUT and DELETE

## Scenarios

### Scenario: Unauthenticated Request to Create Service
- **Given** no Authorization header is present
- **When** a `POST /api/services` request is made with valid service data
- **Then** the server responds with status `401`
- **And** the response body contains `{ "error": "Unauthorized" }`

### Scenario: Non-Admin Request to Create Service
- **Given** a user with `role: 'cliente'` has logged in and received a valid token
- **When** that user sends a `POST /api/services` request with their token
- **Then** the server responds with status `403`
- **And** the response body contains `{ "error": "Forbidden: admin access required" }`

### Scenario: Admin Creates Service
- **Given** a user with `role: 'admin'` has logged in and received a valid token
- **When** that user sends a `POST /api/services` request with valid data and their token
- **Then** the service is created successfully
- **And** the server responds with status `200` or `201`
- **And** the response contains the created service data

### Scenario: Admin Updates Service
- **Given** a service with `id: 1` exists
- **And** an admin user has a valid token
- **When** the admin sends `PUT /api/services/1` with updated data
- **Then** the service is updated
- **And** the server responds with status `200`

### Scenario: Admin Deletes Service
- **Given** a service with `id: 1` exists
- **And** an admin user has a valid token
- **When** the admin sends `DELETE /api/services/1`
- **Then** the service is marked inactive
- **And** the server responds with status `200`

### Scenario: Public Can Browse Services
- **Given** no Authorization header
- **When** a `GET /api/services` request is made
- **Then** the server responds with status `200`
- **And** returns the list of active services

## Token Format

For the mock-data phase, tokens follow the format:
```
mock_jwt_token_<userId>
```
The middleware extracts `<userId>` from the token string, finds the matching user in `mockUsers`, and checks their role.

## Files Affected

| File | Change |
|---|---|
| `backend/server.js` | Add `requireAuth`, `requireAdmin` middleware; apply to 3 endpoints |
| `backend/__tests__/adminMiddleware.test.js` | New test file |
