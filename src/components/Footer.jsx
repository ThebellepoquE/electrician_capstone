import '../styles/footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-content">
        {/* NUEVO CTA CENTRADO */}
        <div className='cta-wrapper'>
            <a href='tel:123456789' className='cta-button'>
                Contacto 123456789
            </a>
        </div>
        
        <div className="footer-info">
            <p className="copyright">
                © 2025 Electrician Services - Todos los derechos reservados
            </p>
          <div className="footer-links">
            <a href="#privacy">Política de Privacidad</a>
            <a href="#terms">Términos de Servicio</a>
            <a href="#contact">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





