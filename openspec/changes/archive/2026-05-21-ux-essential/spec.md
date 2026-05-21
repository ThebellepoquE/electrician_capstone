# Spec: UX Essential Fixes

## Requirements

### R1: Logout button in Navbar
- When `userData` exists, Navbar **MUST** render a logout button
- Clicking logout **MUST** call `onCerrarSesion()` and close mobile menu if open
- Logout button **MUST** only be visible when logged in

### R2: Contact form functional
- Contact forms in both Home.jsx and Contact.jsx **MUST** have `onSubmit` handlers
- Form **MUST** manage state for name, email, message fields
- Form **MUST** send data to `POST /api/contact` backend endpoint
- Form **MUST** show success/error feedback after submission

### R3: GitHub Pages SPA routing
- The project **MUST** include `public/404.html` that redirects to `index.html` preserving the path for GitHub Pages deployment

### R4: Backend contact endpoint
- `POST /api/contact` **MUST** accept `{ name, email, message }` 
- **MUST** validate required fields (name, email, message)
- **MUST** return 400 if fields missing
- **MUST** return 200 on success

## Acceptance Criteria

- `pnpm run build` succeeds
- `pnpm test` still passes (9 tests)
- Logout button visible when logged in
- Contact form sends data without page reload
- `public/404.html` exists
