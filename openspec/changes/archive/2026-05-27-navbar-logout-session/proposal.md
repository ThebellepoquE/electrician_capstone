# Proposal: Navbar Logout Button Styling & Session Termination UX

**Status:** draft  
**Created:** 2026-05-27

## Why

The logout button exists in `Navbar.jsx` and `cerrarSesion()` in `App.jsx` already clears localStorage and redirects. However:

1. **No desktop styling** — `.logout-button` only has styles inside `@media (max-width: 480px)`. On desktop, it renders as a plain, unstyled button in the navbar.
2. **No visual feedback** — session closes instantly without confirmation or state indication.
3. **Issues #7 and #8 from the code audit** were partially resolved (the button exists), but the UX is incomplete.

## What

1. **Desktop styling for logout button** — add consistent `.logout-button` styles that work on all viewports, matching the navbar's accent color theme.
2. **Mobile styling cleanup** — move the `.logout-button` rules out of the mobile-only media query so they apply everywhere.
3. **Session termination UX** — add a brief confirmation/visual indication when logging out (the `cerrarSesion` function works, but user gets no feedback).
4. **Navbar user indicator** — when logged in, show the user's name in the navbar alongside the logout button.

## Impact

- `src/components/Navbar.jsx` — add user name display
- `src/styles/navbar.scss` — add desktop `.logout-button` styles, reorganize
- `src/App.jsx` — potentially add brief logout confirmation state
- No backend changes needed (mock phase, no real sessions)
- No new dependencies

## Out of Scope

- Backend session invalidation endpoint (requires real JWT)
- Token blacklisting (requires real JWT + server-side state)
- "Remember me" functionality

## Risks

- Low risk: purely cosmetic and UX improvements. Existing functionality is not affected.
- Need to ensure logout button doesn't break the mobile menu layout.
