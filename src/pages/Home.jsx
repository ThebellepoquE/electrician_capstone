import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/home.scss';

function Home() {
  const location = useLocation();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar servicios desde la API
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  // Handle smooth scroll with navbar offset
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 83;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // scroll to section when route matches the anchored routes
    const { pathname } = location;
    let id = null;
    if (pathname === '/contact') id = 'contact';
    if (pathname === '/about-us') id = 'about';
    if (pathname === '/services') id = 'services';

    if (id) {
      // Small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          // Offset for sticky navbar height (83px)
          const navbarHeight = 83;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (pathname === '/') {
      // Scroll to top for home route
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);


  return (
    <div className="home-page">
      {/* SECCIÓN HOME/HERO */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Lorem Ipsum Electrical Solutions</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary" onClick={(e) => handleScrollToSection(e, 'services')}>Get Started</a>
            <a href="#contact" className="btn-secondary" onClick={(e) => handleScrollToSection(e, 'about')}>Learn More</a>
          </div>
        </div>
      </section>

      {/* SECCIÓN ACERCA DE */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Lorem Ipsum Electrical</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>100+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Partners</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Emergency Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS DINÁMICA */}
      <section id="services" className="services-preview">
        <div className="container">
          <h2>Services</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          {loading ? (
            <p>Loading services...</p>
          ) : (
            <div className="services-grid">
              {servicios.slice(0, 6).map(servicio => (
                <div key={servicio.id} className="service-card">
                  <h3>{servicio.name}</h3>
                  <p>{servicio.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN CONTACTO */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <div className="contact-item">
                <strong>Phone:</strong> 123-456-789
              </div>
              <div className="contact-item">
                <strong>Email:</strong> info@loremipsum.com
              </div>
              <div className="contact-item">
                <strong>Address:</strong> Lorem Ipsum Street, 123
              </div>
            </div>
            <div className="contact-form">
              <h2>Send Message</h2>
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="4"></textarea>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;