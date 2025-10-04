import { useState, useEffect } from 'react';
import '../styles/admin.scss';

function Admin() {
    const [servicios, setServicios] = useState([]);
    const [nuevoServicio, setNuevoServicio] = useState({
        name: '',
        description: '',
        category: 'instalación'
    });

    // Cargar servicios al montar el componente
    const cargarServicios = async () => {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServicios(data);
    };

    // Añadir servicio
    const agregarServicio = async () => {
        await fetch('/api/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoServicio)
        });
        cargarServicios();
        setNuevoServicio({
            name: '',
            description: '',
            category: 'instalación'
        });
    };

    // Eliminar servicio
    const eliminarServicio = async (id) => {
        await fetch(`/api/services/${id}`, {
            method: 'DELETE'
        });
        cargarServicios();
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    return (
        <div className="admin-container">
            <h1>Panel de Administración - Gestión de Servicios</h1>

            {/* Formulario para añadir nuevo servicio */}
            <div className="admin-form">
                <h2>Añadir Nuevo Servicio</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nombre del Servicio"
                        value={nuevoServicio.name}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, name: e.target.value })}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={nuevoServicio.description}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, description: e.target.value })}
                        className="form-input"
                    />
                    <select
                        value={nuevoServicio.category}
                        onChange={(e) => setNuevoServicio({ ...nuevoServicio, category: e.target.value })}
                        className="form-select"
                    >
                        <option value="instalación">Instalación</option>
                        <option value="reparación">Reparación</option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="emergencia">Emergencia</option>
                    </select>
                    <button onClick={agregarServicio} className="btn-dark">
                        Añadir Servicio
                    </button>
                </div>
            </div>

            {/* Lista de servicios */}
            <div className="servicios-list">
                <h2>Servicios Existentes ({servicios.length})</h2>
                {servicios.map((servicio) => (
                    <div key={servicio.id} className="servicio-item">
                        <h3>{servicio.name}</h3>
                        <p>{servicio.description}</p>
                        <span className="category">{servicio.category}</span>
                        <button onClick={() => eliminarServicio(servicio.id)} className="btn-delete">
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;