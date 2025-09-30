import Home from './pages/Home.jsx';
import Servicios from './pages/Servicios.jsx';
import AcercaDe from './pages/AcercaDe.jsx';
import Contacto from './pages/Contacto.jsx';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='header-wrapper'>
          <header className='header'>
            <div className='logo'>LOGO</div>
            <nav className='navigation'>
              <Link to='/'>INICIO</Link>
              <Link to='/servicios'>SERVICIOS</Link>
              <Link to='/acerca-de'>ACERCA DE</Link>
              <Link to='/contacto'>CONTACTO</Link>
            </nav>
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
