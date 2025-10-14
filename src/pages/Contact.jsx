import React from 'react';
import '../styles/home.scss';

function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-section">
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

export default Contact;
