# Design: Fix Critical Runtime and CSS Bugs

## Changes

### 1. `src/pages/Admin.jsx`
**Edit 1:** Remove unused import
```diff
- import { data } from 'react-router-dom';
```

**Edit 2:** Fix catch block
```diff
  } catch (error) {
      console.error(' Error cargando servicios:', error);
-     setServicios(data);
+     setServicios([]);
  }
```

### 2. `src/styles/admin.scss`
**Edit 1:** Fix `margin-bottom: 2 rem` → `2rem` (line ~12)
**Edit 2:** Remove duplicate `.servicios-list h3` block (lines ~71-76)
**Edit 3:** Fix `btn-danger` → `.btn-danger` (line ~188)
**Edit 4:** Fix `font-family: white` → `color: white` (line ~191)

### 3. `src/styles/services.scss`
**Edit:** Fix `rgba(11, 61, 145, 01)` → `rgba(11, 61, 145, 0.1)` (line ~90)

### 4. `package.json`
**Edit:** Remove `"main": "eslint.config.js"` field

### 5. `index.js`
**Action:** Delete the file

## Verification

- `npm run build` — no warnings/errors
- `npx vitest run` — 9 tests still pass (unchanged code paths)
- Manual: Admin page loads without crash even with no API
