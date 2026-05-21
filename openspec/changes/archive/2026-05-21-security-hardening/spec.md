# Spec: Security Hardening

## Requirements

### R1: No password logging
The login endpoint **MUST NOT** log the user's password in any form. It may log the email for debugging but never the password.

### R2: Password hashing on registration
The register endpoint **MUST** hash passwords using bcrypt before storing them. The hash must use at least 10 salt rounds.

### R3: Password comparison on login
The login endpoint **MUST** use `bcrypt.compare()` to verify the password against the stored hash. Login with wrong password must return 401.

### R4: Admin role enforcement
`ProtectedRoute` **MUST** verify that the logged-in user has `role === 'admin'`. Non-admin users must be redirected to `/` (or `/auth`).

### R5: Database initialization decoupled from module import
The `createTables()` function **MUST** be an exportable function, not called automatically on module import. The server startup code **MUST** call it explicitly.

### R6: Tests still pass after security changes
All existing tests **MUST** pass. bcrypt calls must be mocked in tests using `vi.mock()`.

## Acceptance Criteria

- `npx vitest run` passes (9 tests)
- Login endpoint no longer logs passwords
- Registration hashes passwords with bcrypt
- Non-admin users cannot access `/admin`
- `database.js` does not call `createTables()` on import
- `npm run build` succeeds

## Security Acceptance

| Scenario | Expected |
|----------|----------|
| Login with correct password | 200, token + user data |
| Login with wrong password | 401, error message |
| Register new user | 200, password stored as bcrypt hash |
| Admin user accesses /admin | Allowed |
| Cliente user accesses /admin | Redirected away |
| No password in console.log on login | Confirmed |
