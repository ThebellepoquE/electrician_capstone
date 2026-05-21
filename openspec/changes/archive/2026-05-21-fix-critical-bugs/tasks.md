# Tasks: Fix Critical Runtime and CSS Bugs

## Task 1: Fix Admin.jsx crash
- Remove `import { data } from 'react-router-dom'`
- Change `setServicios(data)` to `setServicios([])` in catch block
- **Verify:** `npx vitest run` still passes

---

## Task 2: Fix admin.scss bugs
- Fix `margin-bottom: 2 rem` → `2rem`
- Remove duplicate `.servicios-list h3` block
- Fix `btn-danger` → `.btn-danger`
- Fix `font-family: white` → `color: white`
- **Verify:** `npm run build` succeeds

---

## Task 3: Fix services.scss rgba alpha
- Change `rgba(11, 61, 145, 01)` → `rgba(11, 61, 145, 0.1)`
- **Verify:** `npm run build` succeeds

---

## Task 4: Remove dead code
- Delete `index.js`
- Remove `"main": "eslint.config.js"` from package.json
- **Verify:** `npm run build` succeeds, app works normally

---

## Task 5: Full verification
- Run `npm run build` — no errors
- Run `npx vitest run` — 9 tests pass
- Run `npm run lint` — no new errors
