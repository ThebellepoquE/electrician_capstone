# Proposal: Security Hardening

## Problem

Four critical security issues found during code audit:

1. **Password logging** — `console.log('Intento de login:', email, password)` logs plaintext passwords in `backend/server.js`.
2. **Plaintext password storage** — Registration stores raw passwords: `password_hash: password` with no hashing.
3. **No role-based access control** — `ProtectedRoute` only checks token existence, not user role. Any registered user (`role: "cliente"`) gets full admin access.
4. **`createTables()` runs on every import** — Side effect at module scope in `database.js` runs DDL on every server start and test import, making tests unreliable and coupling initialization to module loading.

## Proposed Change

1. Remove password from login log statement
2. Add bcrypt for password hashing on registration and comparison on login
3. Enforce admin role check in ProtectedRoute
4. Move `createTables()` to a separate exportable function called explicitly from server startup

## Scope

### In scope
- Remove `password` from `console.log` in login endpoint
- Install `bcrypt`, hash passwords on register, compare on login
- Add role check to ProtectedRoute + redirect non-admin users
- Export `createTables()` from database.js, remove auto-call
- Update existing tests to handle bcrypt async (mock bcrypt)
- Update mock users to use pre-hashed passwords for dev

### Out of scope
- JWT implementation (still using mock tokens)
- Rate limiting (separate change)
- Input validation (separate change)
- CORS improvements (separate change)

## Estimated effort

Medium: ~5-7 files, ~80-120 lines. Single PR, well within 400-line budget.
