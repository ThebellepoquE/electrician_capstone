# Proposal: Backend Admin Role Middleware for Service Endpoints

## Why

bcrypt password hashing is already implemented (login uses `bcrypt.compare`, register uses `bcrypt.hash`). The frontend `ProtectedRoute` already checks `userData.role === 'admin'` before rendering the admin page.

**However, the backend has zero authorization.** The POST, PUT, and DELETE endpoints on `/api/services` accept requests from anyone — no token check, no role check. A client-side bypass (e.g., curl, Postman) gives full CRUD access to any user.

This was identified as critical issue #4 in the code audit.

## What

1. **Create `requireAuth` middleware** — validates the incoming `Authorization: Bearer <token>` header against mockUsers.
2. **Create `requireAdmin` middleware** — chains `requireAuth` + checks `user.role === 'admin'`.
3. **Apply `requireAdmin`** to POST, PUT, DELETE `/api/services` endpoints.
4. **Leave GET `/api/services` public** — browsing services doesn't require auth.
5. **Add tests** — verify admin access granted, cliente access rejected (403), and no-token rejected (401).

## Impact

- `backend/server.js` — new middleware functions, applied to 3 endpoints
- `backend/__tests__/` — new test file for auth middleware
- `backend/package.json` — may need test dependencies
- No frontend changes needed (already has role check)
- No database schema changes (mockUsers already have `role` field)

## Risks

- **Low risk** — purely additive. Existing endpoints remain functional.
- Token validation is mock-based (string prefix check), not JWT — this is acceptable for current mock-data phase.
- If real JWT is introduced later, middleware will need updating to decode tokens.

## Alternatives considered

- **Real JWT with jsonwebtoken**: More production-ready but out of scope for mock-data phase.
- **Session-based auth**: Heavier infrastructure change.
