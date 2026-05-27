import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/admin.scss';

function Admin() {
    const [servicios, setServicios] = useState([]);
    const [nuevoServicio, setNuevoServicio] = useState({
        name: '',
        description: '',
        category: 'instalación'
    });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
    });

    const cancelarEdicion = () => {
        setNuevoServicio({ name: '', description: '', category: 'instalación' });
        setEditandoId(null);
        setModoEdicion(false);
    };

    // Cargar servicios al montar el componente
    const cargarServicios = async () => {
        try {
            console.log(' Cargando servicios...');
            const response = await fetch(`${API_BASE_URL}/api/services`);

            if (!response.ok)
                throw new Error(`Error HTTP: ${response.status}`);

            const data = await response.json();
            console.log(' Servicios cargados:', data);
            setServicios(data);

        } catch (error) {
            console.error(' Error cargando servicios:', error);
            setServicios([]);
        }
    };

    // Añadir servicio
    const agregarServicio = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/services`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(nuevoServicio)
            });
            cargarServicios();
            setNuevoServicio({
                name: '',
                description: '',
                category: 'instalación'
            });
        } catch (error) {
            console.error('Error añadiendo servicio:', error);
        }
    };

    // Iniciar edición de un servicio
    const iniciarEdicion = (servicio) => {
        setNuevoServicio({
            name: servicio.name,
            description: servicio.description,
            category: servicio.category,
        });
        setEditandoId(servicio.id);
        setModoEdicion(true);
    };

    // Actualizar servicio
    const actualizarServicio = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/services/${editandoId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(nuevoServicio),
            });
            if (res.ok) {
                cargarServicios();
                cancelarEdicion();
            }
        } catch (error) {
            console.error('Error actualizando servicio:', error);
        }
    };

    // Eliminar servicio
    const eliminarServicio = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/api/services/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            cargarServicios();
        } catch (error) {
            console.error('Error eliminando servicio:', error);
        }
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    return (
        <div className="admin-container">
            <h1>Panel de Administración - Gestión de Servicios</h1>

            {/* Formulario para añadir/editar servicio */}
            <div className="admin-form">
                <h2>{modoEdicion ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}</h2>
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
                    <button onClick={modoEdicion ? actualizarServicio : agregarServicio} className="btn-dark">
                        {modoEdicion ? 'Actualizar Servicio' : 'Añadir Servicio'}
                    </button>
                    {modoEdicion && (
                        <button onClick={cancelarEdicion} className="btn-cancel">
                            Cancelar
                        </button>
                    )}
                </div>
            </div>

            {/* Lista de servicios */}
            <div className="servicios-list">
                <h3>Servicios Existentes ({servicios.length})</h3>
                {servicios.map((servicio) => (
                    <div key={servicio.id} className="servicio-card">
                        <div className="servicio-info">
                            <h4>{servicio.name}</h4>
                            <p className="servicio-description">{servicio.description}</p>
                            <div className="servicio-meta">
                                <span className={`categoria ${servicio.category}`}>
                                    {servicio.category}
                                </span>
                                {servicio.is_emergency && (
                                    <span className="emergencia-tag">
                                        Emergencia
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="servicio-actions">
                            <button
                                onClick={() => iniciarEdicion(servicio)}
                                className="btn-edit"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarServicio(servicio.id)}
                                className="btn-danger"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
