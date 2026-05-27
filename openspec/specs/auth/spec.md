# Service Specification: Authentication & Authorization

## Overview

The application implements a role-based authentication system using bcrypt password hashing and mock JWT tokens for the development phase.

## Requirements

### Authentication

#### AUTH-R1: Password Hashing
All user passwords **MUST** be hashed using bcrypt with a minimum of 10 salt rounds before storage. Plaintext passwords **MUST NOT** be stored or logged.

#### AUTH-R2: Login Endpoint
`POST /api/auth/login` **MUST** accept email and password, validate against stored users using `bcrypt.compare()`, and return a mock token with user data including `role`.

#### AUTH-R3: Registration Endpoint
`POST /api/auth/register` **MUST** accept email, password, and nombre, validate with zod schema, hash the password with bcrypt, and create the user with `role: 'cliente'` by default.

#### AUTH-R4: Rate Limiting
Auth endpoints **MUST** be rate-limited to 5 requests per 15-minute window to prevent brute-force attacks.

### Authorization

#### AUTH-R5: requireAuth Middleware
A `requireAuth` middleware **MUST** validate the `Authorization: Bearer mock_jwt_token_<userId>` header, extract the user from `mockUsers`, and attach it to `req.user`. Returns `401` if missing or invalid.

#### AUTH-R6: requireAdmin Middleware
A `requireAdmin` middleware **MUST** chain `requireAuth` and verify `req.user.role === 'admin'`. Returns `403` for non-admin users.

#### AUTH-R7: Protected Write Endpoints
`POST`, `PUT`, and `DELETE` on `/api/services` **MUST** require admin authentication via `requireAdmin` middleware.

#### AUTH-R8: Public Read Access
`GET /api/services` **MUST** remain accessible without authentication.

### Frontend

#### AUTH-R9: ProtectedRoute Component
The frontend `ProtectedRoute` component **MUST** check for both a valid `authToken` and, when `requireAdmin` prop is set, verify `userData.role === 'admin'` before rendering children.

#### AUTH-R10: Session Storage
Authentication state **MUST** be persisted in `localStorage` with keys `authToken` and `userData`. The `userData` object must include the user's `role`.

## Token Format

Mock tokens follow the pattern: `mock_jwt_token_<userId>`

The middleware parses the userId from the token string and looks up the corresponding user in `mockUsers`.

## Default Users

| Email                     | Password   | Role     |
|---------------------------|------------|----------|
| `admin@electricista.com`  | `admin123` | admin    |
| `cliente@ejemplo.com`     | `cliente123` | cliente |

## Scenarios

### Scenario: Successful Admin Login
- **Given** valid admin credentials
- **When** `POST /api/auth/login` is called
- **Then** status `200` is returned with token and `user.role === 'admin'`

### Scenario: Failed Login
- **Given** incorrect password
- **When** `POST /api/auth/login` is called
- **Then** status `401` is returned with error message

### Scenario: Admin Creates Service
- **Given** valid admin token
- **When** `POST /api/services` is called with `Authorization: Bearer mock_jwt_token_1`
- **Then** the service is created successfully (status `200`)

### Scenario: Cliente Cannot Create Service
- **Given** valid cliente token
- **When** `POST /api/services` is called with `Authorization: Bearer mock_jwt_token_2`
- **Then** status `403` is returned with `Forbidden: admin access required`

### Scenario: Unauthenticated Request to Protected Endpoint
- **Given** no Authorization header
- **When** `POST /api/services` is called
- **Then** status `401` is returned with `Unauthorized`

## Related Specifications

- `specs/services/spec.md` — Service CRUD operations
