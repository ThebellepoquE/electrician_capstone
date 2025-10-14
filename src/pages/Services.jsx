import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/services.scss';

function Services() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Añadir clase al body para prevenir scroll
  useEffect(() => {
    document.body.classList.add('services-page-active');
    return () => {
      document.body.classList.remove('services-page-active');
    };
  }, []);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        console.log('🔌 Conectando con el backend...');
        const response = await fetch(`${API_BASE_URL}/api/services`);

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
        <p>Asegúrate de que el backend está corriendo en puerto 5000</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Nuestros Servicios Eléctricos</h1>
        <p>Profesionales para todas tus necesidades eléctricas</p>
      </div>

      <div className="services-grid">
        {servicios.map(servicio => (
          <div key={servicio.id} className="service-card">
            <h3>{servicio.name}</h3>
            <p>{servicio.description}</p>
            <div className="service-meta">
              <span className={`categoria ${servicio.category}`}>
                {servicio.category}
              </span>
              {servicio.is_emergency && (
                <span className="emergencia-tag">24/7 Emergency</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
