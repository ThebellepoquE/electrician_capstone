import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import AcercaDe from './pages/AcercaDe.jsx';
import Servicios from './pages/Servicios.jsx';
import Contacto from './pages/Contacto.jsx';
import Auth from './pages/Auth.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userData');
    if (user)
      setUserData(JSON.parse(user));
  }, []);

  useEffect(() => {
    const onUserChanged = (e) => {
      setUserData(e.detail || null);
    };

    window.addEventListener('userChanged', onUserChanged);
    return () => window.removeEventListener('userChanged', onUserChanged);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/');
  };

  return (
    <div className='App'>
      <Navbar userData={userData} onCerrarSesion={cerrarSesion} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/acerca-de' element={<AcercaDe />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/auth' element={<Auth />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      <footer className='footer'>
        <p>© 2025 Electrician Services</p>
      </footer>
    </div>
  );
}

export default App;
