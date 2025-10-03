import Home from './pages/Home.jsx';
import AcercaDe from './pages/AcercaDe.jsx';
import Servicios from './pages/Servicios.jsx';
import Contacto from './pages/Contacto.jsx';
import Auth from './pages/Auth.jsx';
import Admin from './pages/Admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './index.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='header-wrapper'>
          <header className='header'>
            <div className='logo-section'>
              <img src={logo} alt="Logo de la app" className="logo" />
            </div>
              <div className='nav-wrapper'>
                <nav className='navigation'>
                  <Link to='/'>INICIO</Link>
                  <Link to='/acerca-de'>ACERCA DE</Link>
                  <Link to='/servicios'>SERVICIOS</Link> 
                  <Link to='/contacto'>CONTACTO</Link>
                  <Link to='/auth'>LOGIN</Link>
                </nav>
                <div className='cta-wrapper'>
                  <a href='tel:123456789' className='cta-btn'>Contacto 123456789</a>
                </div>
              </div>
          </header>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/acerca-de' element={<AcercaDe />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
        <footer className='footer'>
          <p>© 2025 Electrician <WebsiteLink /></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}



export default App;
