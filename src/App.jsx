import Home from './pages/Home.jsx';
import Servicios from './pages/Servicios.jsx';
import AcercaDe from './pages/AcercaDe.jsx';
import Contacto from './pages/Contacto.jsx';
import './index.scss';
import logo from './assets/logo.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

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
                  <Link to='/servicios'>SERVICIOS</Link>
                  <Link to='/acerca-de'>ACERCA DE</Link>
                  <Link to='/contacto'>CONTACTO</Link>
                </nav>
                <div className='cta-wrapper'>
                  <a href='tel:+34123456789' className='cta-btn'>Llama al 123 456 789</a>
                </div>
              </div>
          </header>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/acerca-de' element={<AcercaDe />} />
          <Route path='/contacto' element={<Contacto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App;
