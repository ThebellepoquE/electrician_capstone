import { useState, useEffect } from 'react';
import '../styles/services.scss';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actualizarServicio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/services/${servicioToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicioToEdit)
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el servicio}`);
      }

      // Actualizar lista servicios
      const updatedService = servicios.map(serv =>
        serv.id === servicioToEdit.id ? servicioToEdit : serv
      );
      setServicios(updatedService);

      // Cerrar modal
      setModalOpen(false);
      setServicioEdit(null);

      console.log('Servicio actualizado correctamente')

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el servicio.');
    }
  };

  // Cargar servicios al montar el componente

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        console.log('🔌 Conectando con el backend...');
        const response = await fetch('/api/services');

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Servicios cargados:', data);
        setServicios(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Cargando servicios eléctricos...</h2>
        <p>Conectando con nuestra base de datos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error al cargar servicios</h2>
        <p><strong>Mensaje:</strong> {error}</p>
        <p>🔧 Asegurar que el backend está corriendo en puerto 5000</p>
      </div>
    );
  }

  // En Servicios.jsx - modificar el return
  return (
    <div className="servicios-page">
      <div className="servicios-header">
        <h1>Our Electrical Services</h1>
        <p>Professional solutions for all your electrical needs</p>
      </div>

      {loading && (
        <div className="loading">
          <h2>Loading electrical services...</h2>
        </div>
      )}

      {error && (
        <div className="error">
          <h2>Error loading services</h2>
          <p>{error}</p>
        </div>
      )}

      <div className="servicios-grid">
        {servicios.map(servicio => (
          <div key={servicio.id} className="servicio-card">
            {/* Icono - por ahora usaremos uno genérico */}
            <div className="servicio-icon">
              ⚡
            </div>

            <h3>{servicio.name}</h3>
            <p>{servicio.description}</p>

            <div className="servicio-meta">
              <span className={`categoria ${servicio.category}`}>
                {servicio.category}
              </span>
              {servicio.is_emergency && (
                <span className="emergencia-tag">
                  🚨 24/7 Emergency
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
