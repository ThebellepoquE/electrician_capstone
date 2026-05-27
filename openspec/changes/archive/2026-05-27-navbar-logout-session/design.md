# Design: Navbar Logout Button & Session Termination

**Status:** draft  
**Created:** 2026-05-27  
**Change:** `navbar-logout-session`

## Architecture Decision

Keep session management in `App.jsx` (current pattern). The logout logic is simple (localStorage clear + state reset + navigate) and doesn't warrant a separate hook or context at this scale.

## JSX Changes: Navbar.jsx

The logout button already exists and calls `onCerrarSesion` + `closeMenu`. Changes:

```jsx
// BEFORE (inside cta-wrapper)
{userData && (
    <button onClick={() => { onCerrarSesion(); closeMenu(); }} className='logout-button'>
        Logout
    </button>
)}

// AFTER
{userData && (
    <div className='user-section'>
        <span className='user-name'>{userData.nombre}</span>
        <button onClick={() => { onCerrarSesion(); closeMenu(); }} className='logout-button'>
            Logout
        </button>
    </div>
)}
```

New `.user-section` wrapper groups the name and button for flexible layout.

## SCSS Changes: navbar.scss

### Root-level `.logout-button` styles (all viewports)

```scss
.header-wrapper .header .cta-wrapper {
  .user-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .user-name {
      color: v.$color-primary;
      font-size: 0.85rem;
      font-weight: v.$font-weight-semibold;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .logout-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background: #dc3545;
      color: white;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: v.$font-weight-bold;
      font-family: v.$font-family-principal;
      transition: background 0.2s, opacity 0.15s;

      &:hover {
        background: #c82333;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  .cta-button {
    @include m.btn-light;

    &:hover {
      border: 2px solid v.$color-primary;
    }
  }
}
```

### Mobile overrides (inside `@media (max-width: tablet)`)

Move `.logout-button` rules to `.user-section .logout-button` within the mobile query:

```scss
@media (max-width: v.$breakpoint-tablet) {
  .header-wrapper .header .nav-wrapper {
    .cta-wrapper {
      width: 100%;
      margin-top: 1rem;

      .user-section {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;

        .user-name {
          font-size: 0.9rem;
          max-width: none;
        }

        .logout-button {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
        }
      }

      .cta-button {
        width: 100%;
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
      }
    }
  }
}
```

### Remove old mobile-only `.logout-button` block

Delete the existing `.logout-button` block inside `@media (max-width: v.$breakpoint-mobile)` since the new mobile overrides handle it.

### Update mobile landscape

```scss
@media (max-height: 500px) and (orientation: landscape) {
  .header-wrapper .header .nav-wrapper .cta-wrapper {
    .user-section {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      width: auto;
      max-width: 100%;

      .logout-button {
        width: auto;
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }

      .user-name {
        max-width: 80px;
      }
    }
  }
}
```

## Implementation Order

1. Add `.user-section` wrapper to `Navbar.jsx` with user name display
2. Add root-level `.logout-button` + `.user-section` styles to `navbar.scss`
3. Update mobile media query styles for `.user-section`
4. Remove old `.logout-button` block from mobile-only query
5. Update landscape media query
6. Verify: dev server renders correctly on desktop + mobile viewports

## Files Changed

| File | Change |
|---|---|
| `src/components/Navbar.jsx` | Add `.user-section` wrapper with `userData.nombre` display |
| `src/styles/navbar.scss` | Add root-level logout/user styles, update responsive blocks |
