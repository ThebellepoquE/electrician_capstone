# Proposal: Fix Critical Runtime and CSS Bugs

## Problem

Four critical bugs found during code audit cause runtime crashes, broken styles, and dead code:

1. **Admin.jsx crash** — `import { data } from 'react-router-dom'` shadows the fetch response `data` variable. On API failure, `setServicios(data)` calls the router utility function instead of an array, crashing React.
2. **`.btn-danger` CSS never applies** — selector `btn-danger` (no dot) targets a `<btn-danger>` HTML element that doesn't exist. Delete buttons in Admin have no styling.
3. **`rgba(…, 01)` invalid alpha** — `rgba(11, 61, 145, 01)` in services.scss has alpha `01` instead of `0.1`.
4. **`index.js` dead code** — single `console.log` file. `package.json` `"main"` field wrongly points to `eslint.config.js`.

## Proposed Change

Fix all four bugs. Each is a small, well-defined fix.

## Scope

### In scope
- Remove unused `data` import in Admin.jsx, fix catch block
- Fix `.btn-danger` selector, `font-family: white` → `color: white`
- Fix `rgba` alpha value
- Fix duplicated `.servicios-list h3` block in admin.scss
- Fix `margin-bottom: 2 rem` → `2rem` in admin.scss
- Delete `index.js`, remove/fix `"main"` in package.json

### Out of scope
- Security issues (bcrypt, role check, password logging) — separate change
- Feature gaps (logout, contact form, register) — separate change
- Architecture improvements — separate change

## Estimated effort

Very small: ~5 files touched, ~30 lines changed. Single PR.
