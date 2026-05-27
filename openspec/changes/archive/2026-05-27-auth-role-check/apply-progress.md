# Apply Progress: auth-role-check

**Status:** applied  
**Applied:** 2026-05-27

## Changes Applied

1. ✅ **Middleware added to `backend/server.js`:**
   - `requireAuth()` — validates Bearer token, extracts user from mockUsers
   - `requireAdmin()` — chains requireAuth + role check
2. ✅ **Middleware applied to routes:**
   - `POST /api/services` → requireAdmin
   - `PUT /api/services/:id` → requireAdmin
   - `DELETE /api/services/:id` → requireAdmin
   - `GET /api/services` → remains public
3. ✅ **Tests added:** `backend/test/admin-middleware.test.js` (12 tests)

## Test Results

- 12/12 new tests pass
- 21/21 total backend tests pass (no regressions)
- 0 lint errors
