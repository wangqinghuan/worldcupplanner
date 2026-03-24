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
          <div className="footer-social">
            <a href="https://github.com/wangqinghuan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
