# Proposal: UX Essential Fixes

## Problem

1. **No logout button** — Logged-in users cannot log out. `Navbar` receives `userData` and `onCerrarSesion` props but never renders a logout button.
2. **Contact form non-functional** — Both `Home.jsx` and `Contact.jsx` have `<form>` elements with no `onSubmit` handler. Submitting just reloads the page.
3. **SPA routing broken on GitHub Pages** — `BrowserRouter` with custom base path (`/electrician_capstone/`) requires a `404.html` redirect trick for client-side routing on static hosts.

## Proposed Change

1. Add logout button to Navbar (visible when logged in)
2. Add form state + submit handler to Contact form (send to backend endpoint)
3. Add `public/404.html` for GitHub Pages SPA routing

## Scope

### In scope
- Navbar logout button
- Contact form with state management and backend endpoint
- `public/404.html` redirect
- New backend endpoint `POST /api/contact`
- Fix `useEffect` unused import in Auth.jsx

### Out of scope
- Email delivery (contact form stores in console/log for now)
- Form validation library
- Contact form tests (new feature, not bug fix)

## Estimated effort

Small-medium: ~8 files, ~100 lines. Single PR.
