# Tasks: Navbar Logout Button & Session Termination

**Change:** `navbar-logout-session`  
**Status:** draft  
**Created:** 2026-05-27

## Task 1: Update Navbar.jsx with user name display
- Add `.user-section` wrapper around logout button
- Display `userData.nombre` as a compact label
- Ensure `onCerrarSesion()` + `closeMenu()` still fire on click

## Task 2: Add root-level logout button styles
- Add `.user-section` and `.logout-button` styles at root level in `navbar.scss`
- Styles must work on desktop (≥768px)
- Danger color palette (`#dc3545` / `#c82333`)

## Task 3: Update responsive styles
- Add `.user-section` overrides inside `@media (max-width: tablet)`
- Remove old mobile-only `.logout-button` block from `@media (max-width: mobile)`
- Update landscape media query for `.user-section`

## Task 4: Verify and lint
- Dev server renders correctly on desktop + mobile viewports
- No lint errors
- No regressions in existing navbar behavior
