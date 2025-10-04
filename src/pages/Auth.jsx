import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.scss';

function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIslogin] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(' 1. Iniciando submit...')

        const API_BASE = 'http://localhost:3001';
        const API_URL = '${API_BASE}/api/auth'
        
        try {
            const endpoint = isLogin ? '/login' : '/register';
            console.log('2. Haciendo fetch a:', API_URL + endpoint);
            
            const response = await fetch(API_URL + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('3. Respuesta status:', response.status);

            const data = await response.json();
            console.log('4. Respuesta del servidor:', data);

            // guardar token si login exitoso
            if (data.success) {
                console.log('🔐 5. Login exitoso, guardando token...');
                
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                console.log('🔐 6. Redirigiendo a /admin...');
                navigate('/admin');
                
                // redirigir a la página principal
            } else {
                console.log('🔐 7. Error en login:', data.error);
                alert('Error de conexion con el servidor');
            }
        
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('Error al conectar con el servidor. Intenta nuevamente.');
        }
    };

    // (removed show/hide password toggle)

    return (
        <div className="auth-container">
            {/* Seccion de imagen */}
            <div className="auth-image">
                <img 
                src="images/auth_page.jpg"
                alt="Electricista profesional"
                />
            </div>
            {/* Aquí va el resto de tu formulario */}
            <div className="auth-form">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Nombre de Usuario</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder='Tu nombre'
                                required={!isLogin}
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
                                placeholder='tu@email.com'
                                required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" /* visual: bullets; actual masking is handled by the browser */
                            required
                        />
                    </div>
                    <button type="submit" className='auth-button'>
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
                <button
                    className="auth-switch"
                    onClick={() => setIslogin(!isLogin)}
                >
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </button>
            </div>
        </div>
    );
}

export default Auth;