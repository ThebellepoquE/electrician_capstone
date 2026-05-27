# Spec & Design: Admin Edit + Auth Token

**Change:** `admin-edit-auth`  
**Created:** 2026-05-27

## Requirements

### AE-R1: Auth Token in Admin Requests
All `POST`, `PUT`, `DELETE` requests from Admin.jsx **MUST** include the `Authorization: Bearer <token>` header from `localStorage.getItem('authToken')`.

### AE-R2: Edit Button Per Service
Each service card in the admin list **MUST** have an "Editar" button that loads the service data into the form and switches to edit mode.

### AE-R3: Edit Mode State
When in edit mode, the form **MUST**:
- Show heading "Editar Servicio" instead of "Añadir Nuevo Servicio"
- Populate all fields with the current service data
- Change submit button text to "Actualizar Servicio"
- Show a "Cancelar" button to exit edit mode

### AE-R4: Cancel Edit
The "Cancelar" button **MUST** clear the form, reset to create mode, and reset form fields to empty.

### AE-R5: Update via PUT
Submitting in edit mode **MUST** call `PUT /api/services/:id` with the updated data, then reload the service list and reset to create mode.

## Design

### New state in Admin.jsx

```js
const [modoEdicion, setModoEdicion] = useState(false);
const [editandoId, setEditandoId] = useState(null);
```

### Helper for auth header

```js
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
});
```

### New edit function

```js
const iniciarEdicion = (servicio) => {
  setNuevoServicio({
    name: servicio.name,
    description: servicio.description,
    category: servicio.category,
  });
  setEditandoId(servicio.id);
  setModoEdicion(true);
};

const cancelarEdicion = () => {
  setNuevoServicio({ name: '', description: '', category: 'instalación' });
  setEditandoId(null);
  setModoEdicion(false);
};

const actualizarServicio = async () => {
  const res = await fetch(`${API_BASE_URL}/api/services/${editandoId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(nuevoServicio),
  });
  if (res.ok) {
    cargarServicios();
    cancelarEdicion();
  }
};
```

### JSX changes

- Form heading: `modoEdicion ? 'Editar Servicio' : 'Añadir Nuevo Servicio'`
- Submit button: text switches, onClick switches between `agregarServicio` and `actualizarServicio`
- Cancel button: shown only in edit mode
- Edit button: added next to Delete button per service card

## Files Changed

| File | Change |
|---|---|
| `src/pages/Admin.jsx` | Add edit mode state, auth headers, edit button, update function |
