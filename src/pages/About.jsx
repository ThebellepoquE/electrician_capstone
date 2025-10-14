import React from 'react';
import '../styles/home.scss';

function About() {
  return (
    <div className="about-page">
      <section className="about-section">
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
    </div>
  );
}

export default About;
