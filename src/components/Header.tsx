import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'team-routes', label: 'By Team' },
    { id: 'match-selection', label: 'By Matches' },
    { id: 'routes-list', label: 'Explore' },
  ];

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/" className="brand" onClick={() => handleNavClick('home')}>
          <div className="logo-main">🏆</div>
          <div className="logo-sub">WC26 Planner</div>
        </a>

        <nav className="main-nav">
          {menuItems.map(item => (
            <button 
              key={item.id}
              className={`nav-link ${activeView === item.id ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button 
            className={`hamburger ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {menuItems.map(item => (
            <button 
              key={item.id}
              className={`mobile-nav-link ${activeView === item.id ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
