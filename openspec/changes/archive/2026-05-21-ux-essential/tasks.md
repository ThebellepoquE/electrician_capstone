# Tasks: UX Essential Fixes

## Task 1: Add logout button to Navbar
- Render logout button when `userData` exists
- Call `onCerrarSesion()` + `closeMenu()` on click
- Add basic styling in navbar.scss
- **Verify:** `pnpm run build` succeeds

---

## Task 2: Add POST /api/contact backend endpoint
- Accept `{ name, email, message }`, validate required fields
- Return 400 if missing fields, 200 on success
- **Verify:** `curl -X POST localhost:3001/api/contact -H 'Content-Type: application/json' -d '{}'` → 400

---

## Task 3: Fix Home.jsx contact form
- Add form state + onSubmit handler
- Call POST /api/contact
- Show success/error feedback
- **Verify:** Form no longer reloads page

---

## Task 4: Fix Contact.jsx contact form
- Same as Task 3
- **Verify:** `pnpm run build` succeeds

---

## Task 5: Add public/404.html for GitHub Pages
- Standard SPA redirect script
- **Verify:** File exists in public/

---

## Task 6: Fix unused imports
- Remove unused `useEffect` from Auth.jsx
- **Verify:** `pnpm run lint` — one less warning

---

## Task 7: Full verification
- `pnpm test` → 9 tests pass
- `pnpm run build` → success
- `pnpm run lint` → no new errors
