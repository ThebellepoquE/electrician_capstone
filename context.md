# Code Audit Report — electrician_capstone

**Date:** 2026-05-21
**Scope:** All files in `src/`, `backend/`, and root configuration (~26 source files, ~2200 lines)

---

## CRITICAL — Must fix before building more features

> **Update 2026-05-27:** Issues #2, #3, #4 have been resolved.

### 1. Admin.jsx: catch block sets state to wrong variable (runtime crash)
- **File:** `src/pages/Admin.jsx` (lines 4, 29)
- **Description:** `import { data } from 'react-router-dom'` shadows the `data` variable from the fetch response. In the catch block at line 29, `setServicios(data)` calls the router's `data` function (a utility, not an array) instead of setting services to `[]` or an error state.
- **Why it matters:** Any API failure on the admin page will crash React or render garbage. The admin page is unusable when the backend is down.
- **Fix:** Remove `import { data } from 'react-router-dom'` (unused). In catch, use `setServicios([])`.

### 2. ~~Auth passwords logged in plaintext~~ ✅ RESOLVED
- **File:** `backend/server.js`
- **Status:** Fixed — `password` removed from log statement. Login only logs the email.
- **Resolved:** 2026-05-27

### 3. ~~Registration endpoint stores plaintext passwords~~ ✅ RESOLVED
- **File:** `backend/server.js`
- **Status:** Fixed — `bcrypt.hash()` used on registration, `bcrypt.compare()` used on login. Salt rounds: 10.
- **Resolved:** 2026-05-27

### 4. ~~No role check on backend — any token grants admin access~~ ✅ RESOLVED
- **File:** `backend/server.js`, `src/components/ProtectedRoute.jsx`
- **Status:** Fixed — Frontend `ProtectedRoute` already checks `userData.role === 'admin'`. Backend now has `requireAuth` + `requireAdmin` middleware on POST/PUT/DELETE `/api/services`. Returns 401 without token, 403 for non-admin users.
- **Resolved:** 2026-05-27 (auth-role-check SDD change)

### 5. `.btn-danger` CSS selector missing dot prefix — styles never apply
- **File:** `src/styles/admin.scss` (line 188)
- **Description:** `btn-danger { ... }` targets a `<btn-danger>` HTML element, not a `.btn-danger` class. The Admin page uses `className="btn-danger"` (line 120 of Admin.jsx) but the styles never apply.
- **Why it matters:** Delete buttons have no styling. Also, the rule has `font-family: white;` (line 191) which is nonsensical — should be `color: white;`.
- **Fix:** Change to `.btn-danger` and fix `font-family: white` → `color: white`.

### 6. `rgba(11, 61, 145, 01)` — invalid alpha value in services.scss
- **File:** `src/styles/services.scss` (line 90)
- **Description:** `background-color: rgba(11, 61, 145, 01);` — alpha value `01` is not valid (should be `0`–`1`). Most browsers will treat this as `1` (fully opaque), but Sass may throw a build error.
- **Why it matters:** Build failure or incorrect styling for category badges on the Services page.
- **Fix:** Change to `0.1` or use a proper hex/rgba value.

---

## HIGH — Should fix soon, will cause pain later

### 7. Navbar receives props but never uses them
- **File:** `src/components/Navbar.jsx` (line 7)
- **Description:** `function Navbar({ userData, onCerrarSesion })` — both props are destructured but never referenced in the JSX. There is no logout button, no user display, no conditional rendering based on auth state.
- **Why it matters:** Logged-in users have no way to log out from the UI. The props passed from `App.jsx` are dead code.
- **Fix:** Add a conditional logout button in the navbar that shows when `userData` exists and calls `onCerrarSesion`.

### 8. No logout button exists anywhere in the UI
- **File:** `src/App.jsx` (lines 28–32) + `src/components/Navbar.jsx`
- **Description:** `cerrarSesion()` is defined in App.jsx and passed to Navbar, but Navbar never renders it. No other component provides logout.
- **Why it matters:** Users must manually clear localStorage or close the browser to log out.
- **Fix:** Same as #7 — add logout button to Navbar.

### 9. Contact form has no submit handler — does nothing
- **File:** `src/pages/Home.jsx` (lines 115–120) and `src/pages/Contact.jsx` (lines 16–21)
- **Description:** Both `<form>` elements have no `onSubmit` handler. Submitting the form triggers a page reload with no data sent anywhere.
- **Why it matters:** The contact form is a core feature of a service business site. It is completely non-functional.
- **Fix:** Add `onSubmit` handler that sends data to a backend endpoint (e.g., `POST /api/contact`). Add form state management and validation.

### 10. All routes are client-side only — no SSR/SEO
- **File:** `src/App.jsx`, `vite.config.js` (line 5: `base: '/electrician_capstone/'`)
- **Description:** The app uses `BrowserRouter` with no fallback. Direct URL navigation (e.g., `/services`) works on the dev server but will 404 on GitHub Pages without a `404.html` redirect trick.
- **Why it matters:** The `deploy` script targets GitHub Pages (`gh-pages -d dist`). Hash routing or a 404.html fallback is needed for SPA routing on static hosts.
- **Fix:** Either switch to `HashRouter` for GitHub Pages deployment, or add a `public/404.html` that redirects to `index.html`. Also reconsider the `base` config if deploying to a custom domain.

### 11. `index.js` root file is dead code
- **File:** `index.js` (line 1)
- **Description:** `console.log("Hola desde electrician_capstone");` — this file does nothing. It is set as `"main": "eslint.config.js"` in package.json, which is also wrong.
- **Why it matters:** Confusion about project entry point. `package.json` `"main"` field points to `eslint.config.js` which makes no sense for a web app.
- **Fix:** Delete `index.js` or use it as the Express server entry. Fix `"main"` in package.json or remove it (not needed for web apps).

### 12. `database.js` has side effect at import time — `createTables()` auto-runs
- **File:** `backend/database.js` (line 140)
- **Description:** `createTables()` is called unconditionally when the module is imported. This runs DDL on every server start and on every test import.
- **Why it matters:** Tests that import `database.js` (even when mocking) trigger table creation logic. The comment says "TEMPORAL: Crear tablas si no existen (borrar despues)" but it's still there.
- **Fix:** Move table creation to a separate migration script or guard it behind an environment flag. Remove the `createTables()` call from module scope.

### 13. ~~No input validation on any backend endpoint~~ ✅ RESOLVED
- **File:** `backend/server.js`, `backend/validation.js`
- **Status:** Fixed — Zod v4 schemas defined for all endpoints: `createServiceSchema`, `updateServiceSchema`, `loginSchema`, `registerSchema`, `contactSchema`. All handlers validate `req.body` before processing.
- **Resolved:** 2026-05-27

### 14. ~~No rate limiting on auth endpoints~~ ✅ RESOLVED
- **File:** `backend/server.js`
- **Status:** Fixed — `express-rate-limit` applied to auth (5 req/15min) and contact (3 req/15min) endpoints. Skipped in test mode.
- **Resolved:** 2026-05-27

### 15. `server.js` and `database.js` share mock user definitions
- **File:** `backend/server.js` (lines 24–40) and `backend/database.js` (lines 15–17)
- **Description:** Mock users are defined in two places with different structures: `server.js` has `password_hash`, `database.js` mock has `password`. Fields are inconsistent (`nombre` vs `name`).
- **Why it matters:** If the codebase transitions from mock to real DB, the schema mismatch will cause bugs.
- **Fix:** Define mock data in one place. Align field names.

---

## MEDIUM — Technical debt worth addressing

### 16. `POST /api/services` has no 400 validation for missing fields
- **File:** `backend/server.js` (lines 120–134)
- **Description:** Creates a service with `undefined` fields if `name`, `description`, or `category` are missing from `req.body`.
- **Why it matters:** Allows creation of incomplete/broken service records.
- **Fix:** Validate required fields. Return 400 if missing.

### 17. `PUT /api/services/:id` doesn't validate ID format
- **File:** `backend/server.js` (lines 137–159)
- **Description:** `parseInt(req.params.id)` will return `NaN` for non-numeric IDs. `findIndex` will never match, returning 404 — which is acceptable but the `NaN` case should be handled explicitly.
- **Why it matters:** Silent failures for malformed IDs.
- **Fix:** Add explicit check: `if (isNaN(serviceId)) return res.status(400).json({ error: 'ID inválido' });`

### 18. Auth.jsx has no registration option
- **File:** `src/pages/Auth.jsx`
- **Description:** Only login is implemented. The backend has a `/api/auth/register` endpoint but no UI for it.
- **Why it matters:** The register endpoint exists but is unusable from the frontend.
- **Fix:** Add a tab or toggle on the Auth page to switch between Login and Register forms.

### 19. Admin.jsx has no edit/update functionality
- **File:** `src/pages/Admin.jsx`
- **Description:** Only add and delete are implemented. The backend has `PUT /api/services/:id` but the admin page has no edit button or form.
- **Why it matters:** Incomplete CRUD. Admins cannot fix typos or update service details.
- **Fix:** Add an "Edit" button per service that populates the form and switches the submit action to PUT.

### 20. `Home.jsx` does too much — routing, scrolling, data fetching, and four sections in one file
- **File:** `src/pages/Home.jsx` (~130 lines)
- **Description:** Home.jsx contains: API fetch for services, location-based scroll logic, and four full page sections (hero, about, services, contact). It duplicates content from `About.jsx`, `Services.jsx`, and `Contact.jsx`.
- **Why it matters:** Tight coupling between the landing page and standalone pages. Duplicated content means changes must be made in multiple places.
- **Fix:** Extract sections into shared components (`<HeroSection>`, `<AboutSection>`, `<ContactSection>`). Have Home.jsx compose them. Have standalone pages import and reuse the same components.

### 21. `Services.jsx` and `Home.jsx` duplicate service fetching logic
- **File:** `src/pages/Services.jsx` (lines 16–37) and `src/pages/Home.jsx` (lines 12–24)
- **Description:** Both components have nearly identical `useEffect` + `fetch` logic for loading services.
- **Why it matters:** Duplicated data-fetching logic. If the API URL or error handling changes, it must be updated in multiple places.
- **Fix:** Extract into a custom hook `useServices()` or a shared API module.

### 22. `about-stats` inconsistency between Home and About pages
- **File:** `src/pages/Home.jsx` (lines 72–87) and `src/pages/About.jsx` (lines 15–30)
- **Description:** Home.jsx shows "100+ Projects Completed" and "50+ Partners". About.jsx shows "50+ Projects Completed" and "40+ Customer Satisficed". Numbers and stats don't match. "Customer Satisficed" is a typo (should be "Satisfied").
- **Why it matters:** Inconsistent data damages credibility. "Satisficed" is not a word in this context.
- **Fix:** Unify stats in a shared data file or component. Fix the typo.

### 23. `admin.scss` has duplicate `.servicios-list h3` block
- **File:** `src/styles/admin.scss` (lines 64–69 and 71–76)
- **Description:** The `.servicios-list h3` selector is defined twice with identical content.
- **Why it matters:** Dead/duplicated CSS. Increases bundle size (minor) and causes confusion.
- **Fix:** Remove the duplicate block.

### 24. `admin.scss` has `margin-bottom: 2 rem` (space in value)
- **File:** `src/styles/admin.scss` (line 12)
- **Description:** `margin-bottom: 2 rem;` — the space between `2` and `rem` makes this an invalid CSS value. Sass may or may not catch this.
- **Why it matters:** The h1 margin-bottom won't apply.
- **Fix:** Change to `margin-bottom: 2rem;`.

### 25. Auth.jsx uses `alert()` for error messages
- **File:** `src/pages/Auth.jsx` (lines 42, 47)
- **Description:** `alert('Error: ' + data.error)` and `alert('Error al conectar con el servidor')` — browser alerts are blocking, ugly, and inaccessible.
- **Why it matters:** Poor UX. Alerts are inaccessible to screen readers. They block the main thread.
- **Fix:** Use inline error state displayed in the form.

### 26. No loading state on login button
- **File:** `src/pages/Auth.jsx`
- **Description:** The submit button has no loading/disabled state during the fetch. Users can double-click and submit twice.
- **Why it matters:** Race condition potential. Poor UX on slow connections.
- **Fix:** Add `isSubmitting` state. Disable button during request.

### 27. `vite.config.js` proxies `/api` but `API_BASE_URL` uses full URLs
- **File:** `vite.config.js` (line 9) and `src/config/api.js` (lines 1–5)
- **Description:** Vite is configured to proxy `/api` → `http://localhost:3001`, but the frontend uses `API_BASE_URL` to construct full URLs like `http://localhost:3001/api/services`. The proxy is unused.
- **Why it matters:** Confusing configuration. In production, CORS must be configured correctly because the proxy won't exist.
- **Fix:** Either use relative paths (`/api/services`) and rely on the proxy in dev + same-origin in production, or keep full URLs and remove the unused proxy config.

### 28. Backend `package.json` missing test script and dev dependencies
- **File:** `backend/package.json`
- **Description:** No `"test"` script. Tests are run from root via vitest+supertest. `nodemon` is a devDependency but `supertest` is only in root devDependencies.
- **Why it matters:** Running backend tests standalone is confusing. Backend can't be tested in isolation.
- **Fix:** Either consolidate all test deps in root (current approach, works fine) or add a test script to backend/package.json.

### 29. Hardcoded phone number in Navbar and Footer
- **File:** `src/components/Navbar.jsx` (line 40) and `src/components/Footer.jsx` (line 8)
- **Description:** `href='tel:123456789'` and text `Contacto 123456789` are hardcoded in two places.
- **Why it matters:** Changing the phone number requires editing multiple files.
- **Fix:** Extract to a config file or environment variable.

### 30. CORS allows specific origins but production URL may change
- **File:** `backend/server.js` (lines 8–12)
- **Description:** `allowedOrigins` hardcodes `https://thebellepoque.github.io`. If the app moves to a custom domain, this must be updated.
- **Why it matters:** Deployment friction. Silent CORS failures if URL changes.
- **Fix:** Read allowed origins from environment variable.

### 31. No error boundary in React app
- **File:** Root — missing
- **Description:** No `<ErrorBoundary>` component anywhere. A crash in any component unmounts the entire app.
- **Why it matters:** Production errors result in a blank white screen.
- **Fix:** Add a React Error Boundary class component or use `react-error-boundary`.

### 32. `index.html` title is the repo name, not a brand name
- **File:** `index.html` (line 10)
- **Description:** `<title>electrician_capstone</title>` — the repo name is visible in browser tabs and bookmarks.
- **Why it matters:** Unprofessional. Should be the business name.
- **Fix:** Change to a proper brand title.

---

## LOW — Nice to have

### 33. Excessive console.log statements in production code
- **Files:** Multiple — `src/pages/Auth.jsx`, `src/pages/Home.jsx`, `src/pages/Admin.jsx`, `src/pages/Services.jsx`
- **Description:** Debug logs with emoji (`🔌`, `🔍`, `❌`) are left in source. These will appear in production browser consoles.
- **Why it matters:** Noisy console. Potential information leakage.
- **Fix:** Use a logging utility that respects `NODE_ENV`. Strip in production via Vite config or remove.

### 34. Unused `React` import in several files
- **File:** `src/pages/About.jsx` (line 1), `src/pages/Contact.jsx` (line 1), `src/pages/Auth.jsx` (line 1)
- **Description:** `import React from 'react'` is unnecessary in React 17+ with the new JSX transform.
- **Why it matters:** Lint warning at best, but signals outdated patterns.
- **Fix:** Remove unused imports.

### 35. License is ISC but README says "educational purposes"
- **File:** `package.json` (license: "ISC") and `README.md`
- **Description:** Package.json declares ISC license. README says "created for educational purposes."
- **Why it matters:** Ambiguous licensing.
- **Fix:** Align license field with intent.

### 36. No `.env.example` file
- **File:** Missing
- **Description:** `.env` is gitignored but there's no `.env.example` showing required variables.
- **Why it matters:** New contributors or deployments don't know what env vars are needed.
- **Fix:** Add `.env.example` with all required keys (no secrets).

### 37. `render.yaml` only deploys backend, not frontend
- **File:** `render.yaml`
- **Description:** Only `electrician-backend` service is defined. The frontend (GitHub Pages) is deployed separately via `npm run deploy`.
- **Why it matters:** Inconsistent deployment story. Frontend and backend are deployed via completely different mechanisms.
- **Fix:** Either add a static site service to render.yaml for the frontend, or document the two-step deployment clearly.

### 38. Missing `aria-label` on contact form inputs
- **File:** `src/pages/Home.jsx`, `src/pages/Contact.jsx`
- **Description:** Form inputs use `placeholder` but no `aria-label` or `<label>` elements (except Auth.jsx which does have labels).
- **Why it matters:** Accessibility gap. Screen readers may not properly identify fields.
- **Fix:** Add proper `<label>` elements or `aria-label` attributes.

### 39. `Services.jsx` error message references wrong port
- **File:** `src/pages/Services.jsx` (line 48)
- **Description:** `<p>Asegúrate de que el backend está corriendo en puerto 5000</p>` — the backend runs on port 3001, not 5000. Port 5000 is the frontend.
- **Why it matters:** Misleading error message for debugging.
- **Fix:** Change to "puerto 3001".

### 40. No favicon files actually exist
- **File:** `index.html` (lines 5–8)
- **Description:** References `./favicon.png`, `./favicon.ico`, `./favicon.svg`, `./apple-touch-icon.png` — none of these exist in `public/`.
- **Why it matters:** 404 errors in browser console. No custom favicon shown.
- **Fix:** Add favicon files or remove the references.

### 41. `useLocation` used in App.jsx but not needed
- **File:** `src/App.jsx` (line 34)
- **Description:** `const location = useLocation()` is declared but only used in the JSX to conditionally hide the footer on `/auth`. This is fine but could be cleaner.
- **Why it matters:** Minor. Works as intended.
- **Fix:** No action needed, just noting.

### 42. No CI lint check in GitHub Actions
- **File:** `.github/workflows/test.yml`
- **Description:** CI only runs tests (`npm test`). ESLint is not run.
- **Why it matters:** Code quality issues can merge without detection.
- **Fix:** Add `npm run lint` step to CI workflow.

### 43. Root `package.json` has both backend and frontend deps
- **File:** `package.json`
- **Description:** Express, mysql2, cors, and dotenv are listed as root dependencies alongside React deps. The backend has its own `package.json` with overlapping deps.
- **Why it matters:** Dependency duplication. Root deps are likely unused (frontend doesn't import express).
- **Fix:** Move backend-only deps to `backend/package.json`. Keep frontend deps in root.

### 44. `backend/server.js` mixes mock data and real DB imports
- **File:** `backend/server.js` (lines 3, 24–91)
- **Description:** Imports `getActiveServices` from `services.js` (which uses real/mock DB), but also defines `mockServices` and `mockUsers` inline. GET uses DB, but POST/PUT/DELETE use mock arrays.
- **Why it matters:** Inconsistent data layer. Reads from DB, writes to in-memory array. Data written via POST won't be returned by GET if DB has different data.
- **Fix:** Either fully commit to mock (all endpoints use mock arrays) or implement all endpoints against the DB layer.

### 45. No pagination for services list
- **File:** Backend and frontend
- **Description:** `GET /api/services` returns all services with no pagination, limit, or offset.
- **Why it matters:** Will become a performance issue as the service catalog grows.
- **Fix:** Add `?limit=&offset=` query params. Implement pagination in DB query and frontend.

### 46. `Services.jsx` uses `document.body.classList` for page-specific styles
- **File:** `src/pages/Services.jsx` (lines 12–16)
- **Description:** Direct DOM manipulation to toggle `services-page-active` class on `<body>`.
- **Why it matters:** Breaks if component unmounts unexpectedly (e.g., React error). Mixing React state with direct DOM is an anti-pattern.
- **Fix:** Use a CSS wrapper class on the page component instead of modifying `<body>`. Or use a React context for page-level layout state.

---

## Summary by Category

| Category | CRITICAL | HIGH | MEDIUM | LOW |
|---|---|---|---|---|
| Security | ~~#2~~, ~~#3~~, ~~#4~~ ✅ | ~~#14~~ ✅ | — | — |
| Runtime Bugs | #1, #5, #6 | — | #16, #17, #24 | — |
| Architecture | — | #9, #10, #12 | #20, #21, #44 | #43 |
| Code Quality | — | #7, #8, #11 | #18, #19, #22, #23, #25, #26, #27, #28 | #33, #34, #35, #36, #41 |
| Missing Features | — | #9, #18, #19 | — | #45 |
| DevEx/CI | — | — | #28 | #37, #42, #40 |
| Accessibility | — | — | — | #38 |

## Total: ~~6~~ **2 CRITICAL** remaining | ~~9~~ **5 HIGH** | 17 MEDIUM | 14 LOW

### Resolved in Previous SDD Changes
- `backend-validation-rate-limit` (2026-05-21): #13, #14
- `auth-role-check` (2026-05-27): #4
- bcrypt was already implemented: #2, #3

## Remaining Priority Order

1. **#1 Admin.jsx crash** — broken admin page on any error
2. **#5 btn-danger CSS** — broken UI
3. **#6 rgba typo** — potential build failure
4. **#7/#8 Logout** — basic UX gap
5. **#9 Contact form** — non-functional core feature
6. **#12 createTables side effect** — test reliability
7. **#16 POST /api/services** — no 400 validation for missing fields (partially covered by zod now)
