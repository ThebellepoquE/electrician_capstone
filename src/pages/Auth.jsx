import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import '../styles/auth.scss';
import authImage from '../assets/images/auth_page.jpg';

function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        window.dispatchEvent(new CustomEvent('userChanged', { detail: data.user }));
        navigate('/admin');
      } else {
        setError(data.message || data.error || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error al conectar con el servidor. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* 👇 SECCIÓN IMAGEN QUE FALTA */}
        <div className="auth-image">
          <img className="auth-img" src={authImage} alt="Electrician" />
        </div>

        {/* 👇 CAMBIAR auth-form por auth-form-section */}
        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Acceso Profesionales</h1>
            <p>Accede a tu panel de administración</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <p className="auth-error" role="alert">{error}</p>}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
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

            {/* 👇 BOTÓN QUE FALTABA */}
            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Acceder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
