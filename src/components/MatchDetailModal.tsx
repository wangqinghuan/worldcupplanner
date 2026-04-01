import React from 'react';
import { type Match } from '../data/matches';
import { venues } from '../data/venues';
import './MatchDetailModal.css';

interface MatchDetailModalProps {
  match: Match;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
}

const generateCalendarLink = (match: Match) => {
  const [hours, minutes] = match.time.replace(/[APM\s]/g, '').split(':');
  let hour = parseInt(hours);
  if (match.time.includes('PM') && hour !== 12) hour += 12;
  if (match.time.includes('AM') && hour === 12) hour = 0;
  
  const startDate = new Date(`${match.date}T${String(hour).padStart(2, '0')}:${minutes}:00`);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const title = encodeURIComponent(`${match.homeTeam} vs ${match.awayTeam} - World Cup 2026`);
  const location = encodeURIComponent(`${match.venue}, ${match.city}`);
  const details = encodeURIComponent(`World Cup 2026 - ${match.stage}`);
  
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&details=${details}`;
};

const handleCalendarClick = (e: React.MouseEvent, match: Match) => {
  e.preventDefault();
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const calendarUrl = generateCalendarLink(match);
  
  if (!isMobile) {
    window.open(calendarUrl, '_blank');
    return;
  }
  
  const modal = document.getElementById('calendar-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.dataset.calendarUrl = calendarUrl;
    modal.dataset.deviceType = isIOS ? 'ios' : isAndroid ? 'android' : 'other';
  }
};

const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, isSaved, onClose, onToggleSave }) => {
  const venue = venues.find(v => v.id === match.venueId);

  const handleShare = async () => {
    const shareData = {
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      text: `World Cup 2026 - ${match.stage} on ${match.month} ${match.day} at ${match.time}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    const text = `${match.homeTeam} vs ${match.awayTeam} - World Cup 2026\n${match.stage}\n${match.month} ${match.day}, ${match.time} ${match.timezone}\n${match.venue}, ${match.city}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Copied to clipboard!');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-stage">{match.stage}</div>
        
        <div className="modal-teams">
          <div className="modal-team home">
            <span className="team-name">{match.homeTeam}</span>
          </div>
          <div className="modal-vs">
            {match.homeScore !== undefined ? (
              <div className="modal-score">
                <span>{match.homeScore}</span>
                <span>-</span>
                <span>{match.awayScore}</span>
              </div>
            ) : (
              <span>vs</span>
            )}
          </div>
          <div className="modal-team away">
            <span className="team-name">{match.awayTeam}</span>
          </div>
        </div>

        <div className="modal-datetime">
          <div className="datetime-row">
            <span className="label">📅</span>
            <span>{match.weekday}, {match.month} {match.day}, 2026</span>
          </div>
          <div className="datetime-row">
            <span className="label">⏰</span>
            <span>{match.time} {match.timezone}</span>
          </div>
        </div>

        <div className="modal-venue">
          <h3>📍 Venue</h3>
          <p className="venue-name">{match.venue}</p>
          <p className="venue-city">{match.city}, {match.country}</p>
          {venue?.capacity && (
            <p className="venue-capacity">Capacity: {venue.capacity.toLocaleString()}</p>
          )}
        </div>

        <div className="modal-actions">
          <button 
            className={`action-btn save ${isSaved ? 'saved' : ''}`}
            onClick={onToggleSave}
          >
            {isSaved ? '❤️ Saved' : '🤍 Save Match'}
          </button>
          
          <button 
            className="action-btn calendar"
            title="Set Reminder"
            onClick={(e) => handleCalendarClick(e, match)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          
          <button className="action-btn share" onClick={handleShare}>
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailModal;
