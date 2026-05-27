# Design: Admin Role Check Middleware

**Status:** draft  
**Created:** 2026-05-27  
**Change:** `auth-role-check`

## Architecture Decision

Keep middleware inline in `backend/server.js` rather than extracting to a separate file. The project is in mock-data phase with a single server file; extracting middleware now adds unnecessary indirection. Extract to a separate module when migrating to real JWT + real DB.

## Middleware Design

### `requireAuth`

```js
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7); // strip 'Bearer '
  const tokenPrefix = 'mock_jwt_token_';
  if (!token.startsWith(tokenPrefix)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = parseInt(token.slice(tokenPrefix.length), 10);
  const user = mockUsers.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  next();
}
```

### `requireAdmin`

```js
function requireAdmin(req, res, next) {
  requireAuth(req, res, (err) => {
    if (err) return next(err);
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: admin access required' });
    }
    next();
  });
}
```

### Route Changes

```diff
-app.post('/api/services', (req, res) => { ... });
-app.put('/api/services/:id', (req, res) => { ... });
-app.delete('/api/services/:id', (req, res) => { ... });
+app.post('/api/services', requireAdmin, (req, res) => { ... });
+app.put('/api/services/:id', requireAdmin, (req, res) => { ... });
+app.delete('/api/services/:id', requireAdmin, (req, res) => { ... });
```

## Test Design

### Test file: `backend/__tests__/adminMiddleware.test.js`

Uses `supertest` against the Express app exported from `server.js`.

```js
import request from 'supertest';
import { app } from '../server.js';

describe('Admin role middleware', () => {
  const adminToken = 'Bearer mock_jwt_token_1';
  const clienteToken = 'Bearer mock_jwt_token_2';

  describe('POST /api/services', () => {
    it('401 without token', async () => {
      const res = await request(app)
        .post('/api/services')
        .send({ name: 'Test', description: 'Test', category: 'test' });
      expect(res.status).toBe(401);
    });

    it('403 with cliente token', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', clienteToken)
        .send({ name: 'Test', description: 'Test', category: 'test' });
      expect(res.status).toBe(403);
    });

    it('200 with admin token', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', adminToken)
        .send({ name: 'Test', description: 'Test', category: 'test' });
      expect(res.status).toBe(200);
    });
  });

  describe('PUT /api/services/:id', () => {
    it('401 without token', async () => {
      const res = await request(app).put('/api/services/1').send({ name: 'Updated' });
      expect(res.status).toBe(401);
    });

    it('403 with cliente token', async () => {
      const res = await request(app)
        .put('/api/services/1')
        .set('Authorization', clienteToken)
        .send({ name: 'Updated' });
      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/services/:id', () => {
    it('401 without token', async () => {
      const res = await request(app).delete('/api/services/1');
      expect(res.status).toBe(401);
    });

    it('403 with cliente token', async () => {
      const res = await request(app)
        .delete('/api/services/1')
        .set('Authorization', clienteToken);
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/services remains public', () => {
    it('200 without token', async () => {
      const res = await request(app).get('/api/services');
      expect(res.status).toBe(200);
    });
  });
});
```

## TDD Cycle (Strict TDD is active per config.yaml)

1. **RED** — Write failing tests first for each middleware scenario
2. **GREEN** — Implement `requireAuth` and `requireAdmin` middleware
3. **TRIANGULATE** — Add edge cases (invalid token format, non-existent userId)
4. **REFACTOR** — Clean up middleware code, ensure no duplication

## Implementation Order

1. Write tests (RED)
2. Implement `requireAuth` middleware
3. Implement `requireAdmin` middleware  
4. Apply middleware to routes
5. Run tests, verify GREEN
6. Add edge case tests, triangulate
7. Refactor if needed

## Files Changed

| File | Action |
|---|---|
| `backend/server.js` | Add middleware, apply to 3 routes |
| `backend/__tests__/adminMiddleware.test.js` | New test file |
