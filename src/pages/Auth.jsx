import React, { useState} from 'react';

function Auth() {
    const [isLogin, setIslogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
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
        console.log('Enviando:', formData);

        const API_URL = 'https://musical-waddle-g47wj5v56ppg2vxg9-5000.app.github.dev/api/auth';

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const response = await fetch(API_URL + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

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
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='........'
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