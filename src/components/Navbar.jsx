import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Navbar({ userData, onCerrarSesion }) {
    return (
        <div className='header-wrapper'>
            <div className='header'>
                <div className='logo-section'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>

                <div className='nav-wrapper'>
                    <nav className='navigation'>
                        <a href='/'>INICIO</a>
                        <a href='/acerca-de'>ACERCA DE</a>
                        <a href='/servicios'>SERVICIOS</a>
                        <a href='/contacto'>CONTACTO</a>
                        {userData && userData.role === 'admin' && <Link to='/admin'>ADMIN</Link>}
                    </nav>
                    <div className="user-actions">
                        {!userData ? (
                            <Link to='/auth' className='user-login'>
                                <FontAwesomeIcon icon={faRightToBracket} />
                                <span>Acceso</span>
                            </Link>
                        ) : (
                            <button onClick={onCerrarSesion} className='user-logout'>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span>Salir</span>
                            </button>
                        )}
                    </div>

                    <div className='cta-wrapper'>
                        <a href='tel:123456789' className='cta-button'>
                            Contacto 123456789
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;