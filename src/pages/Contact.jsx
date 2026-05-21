import { useState } from 'react';
import API_BASE_URL from '../config/api';
import '../styles/home.scss';

function Contact() {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactStatus, setContactStatus] = useState({ type: '', text: '' });

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactStatus({ type: '', text: '' });
        try {
            const res = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            });
            const data = await res.json();
            if (data.success) {
                setContactStatus({ type: 'success', text: 'Message sent! We\'ll get back to you soon.' });
                setContactForm({ name: '', email: '', message: '' });
            } else {
                setContactStatus({ type: 'error', text: data.error || 'Failed to send message.' });
            }
        } catch {
            setContactStatus({ type: 'error', text: 'Connection error. Please try again.' });
        }
    };

    return (
        <div className="contact-page">
            <section className="contact-section">
                <div className="container">
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
                            <form onSubmit={handleContactSubmit}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows="4"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                ></textarea>
                                <button type="submit" className="btn-primary">Send Message</button>
                            </form>
                            {contactStatus.text && (
                                <p className={`form-status ${contactStatus.type}`}>{contactStatus.text}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
