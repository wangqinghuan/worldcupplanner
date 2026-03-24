import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="logo-main">WC26</div>
              <div className="logo-sub">PLANNER</div>
            </div>
            <p className="footer-desc">
              Your ultimate companion for planning the perfect journey across North America for the FIFA World Cup 2026™.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>USA (11 Cities)</h4>
            <ul>
              <li>New York / New Jersey</li>
              <li>Dallas</li>
              <li>Los Angeles</li>
              <li>Miami</li>
              <li>Atlanta</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Mexico & Canada</h4>
            <ul>
              <li>Mexico City</li>
              <li>Monterrey</li>
              <li>Guadalajara</li>
              <li>Toronto</li>
              <li>Vancouver</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://www.fifa.com/tickets" target="_blank" rel="noopener noreferrer">FIFA Tickets</a></li>
              <li><a href="https://www.fifa.com/worldcup" target="_blank" rel="noopener noreferrer">Official Website</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 World Cup 2026 Planner. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
