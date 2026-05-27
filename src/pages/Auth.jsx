import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import '../styles/auth.scss';
import authImage from '../assets/images/auth_page.jpg';

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: ''
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setFormData({ email: '', password: '', nombre: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        if (mode === 'login') {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          window.dispatchEvent(new CustomEvent('userChanged', { detail: data.user }));
          navigate('/admin');
        } else {
          setSuccessMsg(data.message || 'Cuenta creada exitosamente. Ya puedes iniciar sesión.');
          switchMode('login');
        }
      } else {
        setError(data.message || data.error || 'Ha ocurrido un error');
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
        <div className="auth-image">
          <img className="auth-img" src={authImage} alt="Electrician" />
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1>{mode === 'login' ? 'Acceso Profesionales' : 'Crear Cuenta'}</h1>
            <p>{mode === 'login'
              ? 'Accede a tu panel de administración'
              : 'Regístrate para acceder al panel'
            }</p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
              onClick={() => switchMode('register')}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <p className="auth-error" role="alert">{error}</p>}
            {successMsg && <p className="auth-success" role="status">{successMsg}</p>}

            {mode === 'register' && (
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>
            )}

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
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting
                ? (mode === 'login' ? 'Ingresando...' : 'Registrando...')
                : (mode === 'login' ? 'Acceder' : 'Crear Cuenta')
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
