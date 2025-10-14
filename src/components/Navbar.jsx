import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/light-bulb.svg';
import '../styles/navbar.scss';


function Navbar({ userData, onCerrarSesion }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className='header-wrapper'>
            <div className='header'>
                <div className='logo-section'>
                    <img src={logo} alt='Logo' className='logo' />
                </div>

                <button
                    className='mobile-menu-toggle'
                    onClick={toggleMenu}
                    aria-label='Toggle menu'
                >
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                    <span className={menuOpen ? 'open' : ''}></span>
                </button>

                <div className={`nav-wrapper ${menuOpen ? 'mobile-open' : ''}`}>
                    <nav className='navigation'>
                        <Link to='/' onClick={closeMenu}>HOME</Link>
                        <Link to='/about-us' onClick={closeMenu}>ABOUT US</Link>
                        <Link to='/services' onClick={closeMenu}>SERVICES</Link>
                        <Link to='/contact' onClick={closeMenu}>CONTACT</Link>
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