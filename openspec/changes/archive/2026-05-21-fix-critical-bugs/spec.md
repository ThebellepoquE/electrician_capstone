# Spec: Fix Critical Runtime and CSS Bugs

## Requirements

### R1: Admin.jsx must not crash on API failure
- Remove `import { data } from 'react-router-dom'` (unused import)
- In the catch block, change `setServicios(data)` to `setServicios([])`
- After fix, API failure should set empty array, not crash

### R2: `.btn-danger` styles must apply to delete buttons
- Fix selector from `btn-danger` to `.btn-danger`
- Fix `font-family: white` to `color: white`
- Delete button in Admin.jsx (`className="btn-danger"`) must receive red/warning styling

### R3: Invalid `rgba` alpha must be corrected
- Change `rgba(11, 61, 145, 01)` to `rgba(11, 61, 145, 0.1)` in services.scss

### R4: Dead code must be removed
- Delete `index.js` (single console.log, never imported)
- Remove `"main": "eslint.config.js"` from package.json (not needed for web apps)

### R5: Duplicated CSS blocks must be removed
- Remove duplicate `.servicios-list h3` block in admin.scss (lines 64-69 duplicated at 71-76)

### R6: Invalid CSS value must be fixed
- Change `margin-bottom: 2 rem` to `margin-bottom: 2rem` in admin.scss h1

## Acceptance Criteria

- `npm run build` succeeds without warnings/errors
- `npx vitest run` still passes (9 tests)
- Admin page does not crash when API is unavailable
- Delete button has visible styling (red/warning background)
- No dead code files in project root
