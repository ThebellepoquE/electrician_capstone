import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar({ userData, onCerrarSesion }) {
    return (
        <nav className='header-wrapper'>
            <div className='header'>
                <div className='logo-section'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>

                <div className='nav-wrapper'>
                    <nav className='navigation'>
                        <Link to='/'>INICIO</Link>
                        <Link to='/acerca-de'>ACERCA DE</Link>
                        <Link to='/servicios'>SERVICIOS</Link>
                        <Link to='/contacto'>CONTACTO</Link>
                        {!userData && <Link to='/auth'>LOGIN</Link>}
                        {userData && userData.role === 'admin' && <Link to='/admin'>ADMIN</Link>}
                    </nav>

                    {userData && (
                        <button onClick={onCerrarSesion} className='logout-button'>
                            CERRAR SESIÓN
                        </button>
                    )}
                    <div className='cta-wrapper'>
                        <a href='tel:123456789' className='cta-button'>
                            Contacto 123456789
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;