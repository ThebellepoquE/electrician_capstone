# Spec: Navbar Logout Button & Session Termination

**Status:** draft  
**Created:** 2026-05-27  
**Change:** `navbar-logout-session`

## Requirements

### UI-R1: Logout Button Desktop Styling
The `.logout-button` **MUST** have visible, styled appearance on desktop viewports (≥768px), matching the navbar's color theme. It should be distinct from the CTA button and use a danger/destructive color palette.

### UI-R2: Logout Button Mobile Styling
The `.logout-button` styles **MUST** be defined at the root level (not inside a mobile-only media query) so they apply to all viewports. Mobile-specific overrides may exist in media queries.

### UI-R3: User Name Display
When `userData` is present, the navbar **MUST** display the user's `nombre` (from `userData.nombre`) in a compact label next to the logout button.

### UI-R4: Session Termination
Calling `onCerrarSesion()` **MUST**:
- Clear `localStorage.removeItem('authToken')` and `localStorage.removeItem('userData')`
- Reset `userData` state to `null`
- Navigate to `/` (home page)
- Close the mobile menu if open

### UI-R5: Logout Confirmation
The logout button **MUST** not require a confirmation dialog. The action is immediate but visually reversible (user can log back in). A brief visual feedback (e.g., button opacity change on click) **SHOULD** indicate the action was triggered.

### UI-R6: Logged-Out State
When no `userData` is present, the navbar **MUST NOT** show the logout button or user name. The CTA phone button remains visible.

## Scenarios

### Scenario: Logged-in User Sees Logout
- **Given** a user has logged in and `userData` is stored
- **When** the navbar renders
- **Then** the user's name is displayed alongside a styled logout button

### Scenario: Logged-out User Does Not See Logout
- **Given** no user is logged in
- **When** the navbar renders
- **Then** only the CTA phone button is visible, no logout button or user name

### Scenario: User Clicks Logout
- **Given** a logged-in user clicks the logout button
- **When** the button is clicked
- **Then** localStorage is cleared, state is reset, and the user is redirected to `/`
- **And** the navbar no longer shows the logout button or user name

### Scenario: Logout in Mobile Menu
- **Given** a logged-in user has the mobile menu open
- **When** the user clicks the logout button
- **Then** the session is terminated and the mobile menu is closed

## Files Affected

| File | Change |
|---|---|
| `src/components/Navbar.jsx` | Add user name display, ensure logout button triggers closeMenu |
| `src/styles/navbar.scss` | Add `.logout-button` root-level styles, reorganize responsive rules |
