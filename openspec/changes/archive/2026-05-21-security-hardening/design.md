# Design: Security Hardening

## 1. Install bcrypt

```bash
npm install bcrypt
```

## 2. `backend/server.js` — Fix login logging + add bcrypt

### 2a. Remove password from log
```diff
- console.log('Intento de login:', email, password);
+ console.log('Intento de login:', email);
```

### 2b. Import bcrypt
```diff
+ import bcrypt from 'bcrypt';
```

### 2c. Update mock users with pre-hashed password
Use a known bcrypt hash for `$2a$10$` with password `"admin123"` for admin user.

### 2d. Hash on register
```js
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
const newUser = {
  ...
  password_hash: hashedPassword,
};
```

### 2e. Compare on login
```js
const validPassword = await bcrypt.compare(password, user.password_hash);
if (!validPassword) {
  return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
}
```

### 2f. Call createTables explicitly
```diff
+ import { createTables } from './database.js';
+ 
+ const isDirect = process.argv[1] && process.argv[1].includes('server.js');
  if (isDirect) {
+   await createTables();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, '0.0.0.0', () => { ... });
  }
```

Note: Need async IIFE or top-level await for the server startup block.

## 3. `backend/database.js` — Export createTables, remove auto-call

### 3a. Wrap createTables as export
```diff
- const createTables = async () => {
+ export const createTables = async () => {

- createTables();
```

## 4. `src/components/ProtectedRoute.jsx` — Add role check

```diff
  import { Navigate } from 'react-router-dom';

- function ProtectedRoute({ children }) {
+ function ProtectedRoute({ children, requireAdmin = false }) {
    const token = localStorage.getItem('authToken');
+   const userData = JSON.parse(localStorage.getItem('userData') || 'null');

    if (!token) {
      return <Navigate to="/auth" replace />;
    }
+   
+   if (requireAdmin && userData?.role !== 'admin') {
+     return <Navigate to="/" replace />;
+   }

    return children;
  }
```

### 4b. Update App.jsx usage
```diff
  <Route
    path='/admin'
    element={
-     <ProtectedRoute>
+     <ProtectedRoute requireAdmin>
        <Admin />
      </ProtectedRoute>
    }
  />
```

## 5. `backend/test/services.test.js` — Mock bcrypt

```js
vi.mock('bcrypt', () => ({
  default: {
    compare: async () => true,  // Accept any password in tests
    hash: async (pw) => 'mock_hash_' + pw,
  },
}));
```

## 6. `backend/test/services-error.test.js` — Mock bcrypt

Same mock as above.

## File Change Summary

| File | Change |
|------|--------|
| `backend/server.js` | Remove password log, add bcrypt hash/compare, import & call createTables |
| `backend/database.js` | Export createTables, remove auto-call |
| `src/components/ProtectedRoute.jsx` | Add role check via `requireAdmin` prop |
| `src/App.jsx` | Pass `requireAdmin` to admin route |
| `backend/test/services.test.js` | Mock bcrypt |
| `backend/test/services-error.test.js` | Mock bcrypt |

## Risk: bcrypt in tests

bcrypt is a native module with async hashing. In tests, we mock it via `vi.mock('bcrypt')`. Tests should run without bcrypt being compiled. The mock returns `true` for `compare` and a mock string for `hash`.
