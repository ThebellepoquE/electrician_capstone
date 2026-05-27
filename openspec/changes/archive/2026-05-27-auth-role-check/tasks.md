# Tasks: Admin Role Check Middleware

**Change:** `auth-role-check`  
**Status:** draft  
**Created:** 2026-05-27

## Task 1: Write failing tests for admin middleware (RED)
- Create `backend/test/admin-middleware.test.js`
- Write tests for POST/PUT/DELETE with no token (expect 401), cliente token (expect 403), admin token (expect 200/201)
- Write test for GET without token (expect 200)
- Run `npx vitest run backend/test/admin-middleware.test.js` — verify all tests FAIL
- Mock bcrypt as done in existing test files

## Task 2: Implement requireAuth middleware (GREEN)
- Add `requireAuth` function to `backend/server.js`
- Parse `Authorization: Bearer <token>` header
- Extract userId from `mock_jwt_token_<userId>` format
- Find user in `mockUsers`, attach to `req.user`
- Return 401 if missing/invalid token

## Task 3: Implement requireAdmin middleware (GREEN)
- Add `requireAdmin` function that chains `requireAuth` + role check
- Return 403 if `req.user.role !== 'admin'`
- Call `next()` if both checks pass

## Task 4: Apply middleware to write endpoints
- Add `requireAdmin` to `POST /api/services`
- Add `requireAdmin` to `PUT /api/services/:id`
- Add `requireAdmin` to `DELETE /api/services/:id`
- Verify GET `/api/services` remains unprotected
- Run tests — verify all pass (GREEN)

## Task 5: Triangulate — edge case tests
- Test with invalid token format (not starting with `mock_jwt_token_`)
- Test with non-existent userId
- Test with malformed Authorization header
- Run tests — verify all pass

## Task 6: Refactor and verify
- Review code for duplication or clarity improvements
- Run full test suite: `npx vitest run`
- Ensure no regressions in existing service tests
- Run lint: `npx eslint backend/server.js`

## Verification Checklist

- [ ] All new tests pass
- [ ] All existing tests still pass
- [ ] No lint errors
- [ ] GET /api/services works without auth
- [ ] POST/PUT/DELETE require admin auth
- [ ] 401 for no/invalid token
- [ ] 403 for non-admin user
- [ ] 200/201 for admin user
