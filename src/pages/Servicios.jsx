import React from 'react';
import { useState, useEffect } from 'react';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        console.log('🔌 Conectando con el backend...');
        const response = await fetch('https://musical-waddle-g47wj5v56ppg2vxg9-5000.app.github.dev/api/services');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Servicios cargados:', data);
        setServicios(data);
      } catch (err) {
        console.error('❌ Error:', err);
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
        <h2>⚡ Cargando servicios eléctricos...</h2>
        <p>Conectando con nuestra base de datos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>❌ Error al cargar servicios</h2>
        <p><strong>Mensaje:</strong> {error}</p>
        <p>🔧 Asegúrate de que el backend está corriendo en puerto 5000</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Nuestros Servicios Eléctricos</h1>
      
      {servicios.map(servicio => (
        <div key={servicio.id}>
          <h3>{servicio.name}</h3>
          <p>{servicio.description}</p>
          <div>
            <span>Categoría: {servicio.category}</span>
            {servicio.is_emergency && (
              <span> 🚨 Servicio de Emergencia</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Servicios;
