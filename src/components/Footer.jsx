import { CONTACT_INFO } from '../config/contact';
import '../styles/footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-content">
        {/* NUEVO CTA CENTRADO */}
        <div className='cta-wrapper'>
            <a href={`tel:${CONTACT_INFO.phone}`} className='cta-button'>
                Contacto {CONTACT_INFO.phoneDisplay}
            </a>
        </div>
        
        <div className="footer-info">
            <p className="copyright">
                © 2025 Electrician Services | All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





