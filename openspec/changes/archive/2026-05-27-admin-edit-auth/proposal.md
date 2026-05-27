# Proposal: Admin Edit Functionality + Auth Token in Admin Requests

**Status:** draft  
**Created:** 2026-05-27

## Why

1. **Issue #19**: Admin.jsx has no edit/update functionality. Backend has `PUT /api/services/:id` but the UI only supports add and delete — CRUD is incomplete.
2. **Bug introduced by auth-role-check**: Now that `requireAdmin` middleware protects POST/PUT/DELETE `/api/services`, the Admin page will return 401 because it doesn't send `Authorization` headers. The admin panel is broken after the previous PR.

## What

1. **Add edit button** per service in Admin.jsx that populates the form and switches the submit to PUT.
2. **Add auth token** to all admin requests (POST, PUT, DELETE) using the stored `authToken`.
3. **Update form state** to track editing vs creating mode.
4. **Update form heading** to reflect current mode ("Añadir Nuevo Servicio" vs "Editar Servicio").

## Impact

- `src/pages/Admin.jsx` — edit button, mode state, auth headers, updated form
- No backend changes needed (PUT endpoint already exists with `requireAdmin`)
- No new dependencies

## Risks

- Low risk: purely additive UI changes + bug fix for auth headers.
