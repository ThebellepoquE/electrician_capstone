import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.scss';

function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(' Iniciando login...');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(' Respuesta del servidor:', response.status);

      const data = await response.json();
      console.log(' Datos recibidos:', data);

      if (data.success) {
        console.log(' Login exitoso, guardando token...');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        // Notify other parts of the app that user data changed (so Navbar updates immediately)
        window.dispatchEvent(new CustomEvent('userChanged', { detail: data.user }));
        console.log(' Redirigiendo a /admin...');
        navigate('/admin');
      } else {
        console.log(' Error en login:', data.error);
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error(' Error de conexión:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-container">
      {/* Sección de imagen */}
      <div className="auth-image">
        <img
          src="images/auth_page.jpg"
          alt="Electricista profesional"
        />
      </div>

      {/* Sección del formulario */}
      <div className="auth-form">
        <h2>Acceso Administrativo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='admin@electricista.com'
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className='auth-button'>
            Acceder al Panel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;