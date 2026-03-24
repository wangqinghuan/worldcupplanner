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