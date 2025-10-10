import { useState, useEffect } from 'react';
import '../styles/servicios.scss';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <p>🔧 Asegúrate de que el backend está corriendo en puerto 5000</p>
      </div>
    );
  }

  return (
    <div className="servicios-page">
      <div className="servicios-header">
        <h1>Nuestros Servicios Eléctricos</h1>
        <p>Profesionales para todas tus necesidades eléctricas</p>
      </div>

      <div className="servicios-grid">
        {servicios.map(servicio => (
          <div key={servicio.id} className="servicio-card">
            <div className="servicio-icon">⚡</div>
            <h3>{servicio.name}</h3>
            <p>{servicio.description}</p>

            <div className="servicio-meta">
              <span className={`categoria ${servicio.category}`}>
                {servicio.category}
              </span>
              {servicio.is_emergency && (
                <span className="emergencia-tag">🚨 24/7 Emergency</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
