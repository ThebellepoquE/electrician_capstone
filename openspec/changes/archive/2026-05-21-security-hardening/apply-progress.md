# Apply Progress: Security Hardening

## Completed Tasks

### ✅ Task 1: Install bcrypt
- `npm install bcrypt`

### ✅ Task 2: Fix login logging (R1)
- Removed `password` from `console.log` in `/api/auth/login`

### ✅ Task 3: Refactor database.js (R5)
- Changed `createTables` to `export const createTables`
- Removed auto-call at module scope

### ✅ Task 4: Add bcrypt to auth endpoints (R2, R3)
- Imported bcrypt in server.js
- Login: async handler with `bcrypt.compare()`, returns 401 on wrong password
- Register: async handler with `bcrypt.hash(password, 10)`
- Updated mockUsers with real bcrypt hashes (admin123/cliente123)
- Fixed typo: `sucess` → `success` in register error response

### ✅ Task 5: Add role check to ProtectedRoute (R4)
- Added `requireAdmin` prop (default false)
- Checks `userData.role === 'admin'` from localStorage
- Non-admin users redirected to `/`
- Updated App.jsx: `<ProtectedRoute requireAdmin>` for /admin route

### ✅ Task 6: Update tests for bcrypt mocking (R6)
- Added `vi.mock('bcrypt')` in both test files
- Cleaned unused imports

### ✅ Task 7: Full verification
- `npx vitest run` → 9 passed
- `npm run build` → success
- `npm run lint` → 0 errors, 3 pre-existing warnings

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `backend/server.js` | MODIFIED | ~35 (bcrypt, logging, createTables call) |
| `backend/database.js` | MODIFIED | ~3 (export createTables, remove auto-call) |
| `src/components/ProtectedRoute.jsx` | MODIFIED | ~6 (role check) |
| `src/App.jsx` | MODIFIED | ~1 (requireAdmin prop) |
| `backend/test/services.test.js` | MODIFIED | ~8 (bcrypt mock, cleanup) |
| `backend/test/services-error.test.js` | MODIFIED | ~8 (bcrypt mock, cleanup) |
| `.env.example` | NEW | ~15 |

## TDD Note

Security refactoring of existing endpoints — tests still pass confirming no regression.

## Workload

~76 lines changed, well under 400-line budget. Single PR.
