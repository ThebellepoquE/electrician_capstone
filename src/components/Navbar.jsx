import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/navbar.scss';


function Navbar({ userData, onCerrarSesion }) {
    return (
        <div className='header-wrapper'>
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
                    </nav>

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