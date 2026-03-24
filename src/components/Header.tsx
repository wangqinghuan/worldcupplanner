import React, { useMemo, useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import './Header.css';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onViewChange }) => {
  const { selectedMatches } = useItinerary();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const daysToKickoff = useMemo(() => {
    const today = new Date();
    const kickoff = new Date('2026-06-11');
    return Math.ceil((kickoff.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }, []);

  const menuItems = [
    { id: 'schedule', label: 'Schedule' },
    { id: 'standings', label: 'Standings' },
    { id: 'wiki', label: 'History' },
    { id: 'routes', label: 'Routes' },
    { id: 'itinerary', label: 'My Trip', badge: selectedMatches.length > 0 ? selectedMatches.length : undefined },
  ];

  const handleNavClick = (view: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/" className="brand" onClick={() => handleNavClick('schedule')}>
          <div className="logo-main">🏆</div>
          <div className="logo-sub">WC26</div>
        </a>

        <nav className="main-nav">
          {menuItems.map(item => (
            <button 
              key={item.id}
              className={`nav-link ${activeView === item.id ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
              {item.badge && <span className="trip-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <a 
            href="https://github.com/wangqinghuan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          <a 
            href="mailto:your@email.com" 
            className="github-link"
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          
          <div className="countdown">
            <span className="days">{daysToKickoff > 0 ? daysToKickoff : 0}</span>
            <span className="label">Days</span>
          </div>
          
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
              {item.badge && <span className="trip-badge">{item.badge}</span>}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;