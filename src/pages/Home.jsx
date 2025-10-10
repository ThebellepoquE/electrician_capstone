

// Home.jsx - ahora será la página completa
import '../styles/home.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  useEffect(() => {
    // scroll to section when route matches the anchored routes
    const { pathname } = location;
    let id = null;
    if (pathname === '/contacto') id = 'contact';
    if (pathname === '/acerca-de') id = 'about';

    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS (la que ya tenías) */}
      <section id="services" className="services-preview">
        <div className="container">
          <h2>Our Services</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Electrical Installations</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Maintenance & Repair</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚨</div>
              <h3>Emergency Services</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN ACERCA DE */}
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
                <h4>10+</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h4>500+</h4>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h4>24/7</h4>
                <p>Emergency Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN CONTACTO */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
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
              <h3>Send Message</h3>
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