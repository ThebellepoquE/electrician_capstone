import { useState } from 'react';
import '../styles/admin.scss';

function Admin() {
    const [users] = useState([]);

    // Admin podrá: crear, editar, eliminar servicios
    // Ver y gestionar usuarios (roles, permisos)

    return (
        <div className="admin-container">
            <h1>Panel de Administración</h1>
            <p>Gestión de usuarios y servicios</p>
            <button>Crear Nuevo Servicio</button>

            {/* Mostramos uso básico del estado `users` para evitar warnings de linter */}
            <section className="admin-users">
                <h2>Usuarios ({users.length})</h2>
                {users.length === 0 ? (
                    <p>No hay usuarios aún.</p>
                ) : (
                    <ul>
                        {users.map((u, idx) => (
                            <li key={u.id ?? idx}>{u.name ?? u.email ?? `Usuario ${idx + 1}`}</li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Lista de servicios con opciones editar/eliminar */}
        </div>
    );
}

export default Admin;