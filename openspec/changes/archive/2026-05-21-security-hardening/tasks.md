# Tasks: Security Hardening

## Task 1: Install bcrypt
- `npm install bcrypt`
- **Verify:** `node -e "import('bcrypt').then(b => console.log('bcrypt OK:', typeof b.default.hash))"`

---

## Task 2: Fix login logging (R1)
- Remove `password` from `console.log` in `/api/auth/login`
- **Verify:** Grep for `password` in log statements — none found

---

## Task 3: Refactor database.js (R5)
- Change `createTables` from IIFE to `export const createTables`
- Remove `createTables()` call at module scope
- **Verify:** No side effects on `import database.js`

---

## Task 4: Add bcrypt to auth endpoints (R2, R3)
- Import bcrypt in server.js
- Register: hash password before storing
- Login: use bcrypt.compare, return 401 on wrong password
- **Verify:** `npm run build` succeeds

---

## Task 5: Add role check to ProtectedRoute (R4)
- Add `requireAdmin` prop to ProtectedRoute
- Check `userData.role === 'admin'` from localStorage
- Update App.jsx to pass `requireAdmin` on /admin route
- **Verify:** No runtime errors in build

---

## Task 6: Update tests for bcrypt mocking (R6)
- Add `vi.mock('bcrypt')` in both test files
- **Verify:** `npx vitest run` → 9 tests pass

---

## Task 7: Full verification
- `npx vitest run` → all green
- `npm run build` → no errors
- `npm run lint` → no new errors
