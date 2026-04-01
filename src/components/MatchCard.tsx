import React, { useState } from 'react';
import type { Match } from '../data/matches';
import { getPlayoffInfo, isPlayoffTeam } from '../data/playoffs';
import './MatchCard.css';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

const parseTime = (timeStr: string): { hour: number; minute: number } => {
  const cleaned = timeStr.replace(/[APM\s]/g, '');
  const [h, m] = cleaned.split(':').map(Number);
  let hour = h;
  if (timeStr.includes('PM') && hour !== 12) hour += 12;
  if (timeStr.includes('AM') && hour === 12) hour = 0;
  return { hour, minute: m };
};

const getCalendarUrl = (match: Match) => {
  const { hour, minute } = parseTime(match.time);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const [year, month, day] = match.date.split('-');
  const startDate = `${year}${month}${day}T${pad(hour)}${pad(minute)}00Z`;
  const matchDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour, minute);
  const endDate = `${matchDate.getFullYear()}${pad(matchDate.getMonth() + 1)}${pad(matchDate.getDate())}T${pad(matchDate.getHours() + 3)}${pad(matchDate.getMinutes())}00Z`;
  const title = `${match.homeTeam} vs ${match.awayTeam}`;
  const description = `${match.stage}\n${match.venue}, ${match.city}\n\nWebsite: https://www.fifa.com/tickets`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}`;
};

const handleCalendarClick = (e: React.MouseEvent, match: Match) => {
  e.preventDefault();
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const calendarUrl = getCalendarUrl(match);
  
  if (!isMobile) {
    window.open(calendarUrl, '_blank');
    return;
  }
  
  // Show modal for mobile
  const modal = document.getElementById('calendar-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.dataset.calendarUrl = calendarUrl;
    modal.dataset.deviceType = isIOS ? 'ios' : isAndroid ? 'android' : 'other';
  }
};

const TeamName: React.FC<{ name: string }> = ({ name }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const playoffInfo = isPlayoffTeam(name) ? getPlayoffInfo(name) : null;

  if (!playoffInfo) {
    return <span className="t-name">{name}</span>;
  }

  return (
    <span 
      className="t-name t-playoff"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {name}
      <span className="playoff-badge">⚡</span>
      {showTooltip && (
        <div className="playoff-tooltip">
          <div className="tooltip-header">{playoffInfo.path}</div>
          <div className="tooltip-teams">
            {playoffInfo.semiFinalists.map((team, i) => (
              <span key={team} className={playoffInfo.seededTeam === team ? 'seeded' : ''}>
                {team}{i < playoffInfo.semiFinalists.length - 1 ? ' / ' : ''}
              </span>
            ))}
            {playoffInfo.seededTeam && (
              <span className="seeded">(seeded)</span>
            )}
          </div>
          <div className="tooltip-footer">
            Into {playoffInfo.group} · {playoffInfo.finalDate}
          </div>
        </div>
      )}
    </span>
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ match, compact }) => {
  return (
    <>
      <div className={`match-card-v4 ${compact ? 'compact' : ''}`}>
      <div className="mc-date-box">
        <div className="mc-mon">{match.month}</div>
        <div className="mc-day-num">{match.day}</div>
        <div className="mc-time-meta">
          {match.weekday} · {match.time} {match.timezone}
        </div>
      </div>
      
      <div className="mc-info-box">
        <div className="mc-stage-group">{match.stage}</div>
        <div className="mc-matchup">
          <TeamName name={match.homeTeam} />
          <span className="vs-label">vs</span>
          <TeamName name={match.awayTeam} />
        </div>
        <div className="mc-stadium">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {match.venue}, {match.city}
        </div>
      </div>

      <div className="mc-action-box">
        {!compact && (
          <button className="btn-sel-v4" title="Set Reminder" onClick={(e) => handleCalendarClick(e, match)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
        )}
      </div>
    </div>
    
    <div id="calendar-modal" className="calendar-modal-overlay" style={{display: 'none'}} onClick={(e) => {
      if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
    }}>
      <div className="calendar-modal">
        <div className="calendar-modal-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002D72" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <h3>Set Calendar Reminder</h3>
        <p>Open in your calendar app?</p>
        <div className="calendar-modal-btns">
          <button className="modal-cancel" onClick={() => {
            const m = document.getElementById('calendar-modal');
            if (m) m.style.display = 'none';
          }}>Cancel</button>
          <button className="modal-confirm" onClick={() => {
            const modal = document.getElementById('calendar-modal') as HTMLElement | null;
            const url = modal?.dataset?.calendarUrl || '';
            const deviceType = modal?.dataset?.deviceType || 'other';
            
            if (deviceType === 'ios') {
              window.location.href = 'calshow:';
              setTimeout(() => window.open(url, '_blank'), 500);
            } else if (deviceType === 'android') {
              window.location.href = 'intent://calendar.google.com/calendar/render?action=TEMPLATE#Intent;scheme=https;package=com.google.android.calendar;end';
              setTimeout(() => window.open(url, '_blank'), 1000);
            } else {
              window.open(url, '_blank');
            }
            if (modal) modal.style.display = 'none';
          }}>Open</button>
        </div>
      </div>
    </div>
    
    <div id="calendar-modal" className="calendar-modal-overlay" style={{display: 'none'}} onClick={(e) => {
      if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
    }}>
      <div className="calendar-modal">
        <div className="calendar-modal-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#002D72" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <h3>Set Calendar Reminder</h3>
        <p>Open in your calendar app?</p>
        <div className="calendar-modal-btns">
          <button className="modal-cancel" onClick={() => document.getElementById('calendar-modal')!.style.display = 'none'}>Cancel</button>
          <button className="modal-confirm" onClick={() => {
            const modal = document.getElementById('calendar-modal');
            const url = modal?.dataset.calendarUrl || '';
            const deviceType = modal?.dataset.deviceType || 'other';
            
            if (deviceType === 'ios') {
              window.location.href = 'calshow:';
              setTimeout(() => window.open(url, '_blank'), 500);
            } else if (deviceType === 'android') {
              window.location.href = `intent://calendar.google.com/calendar/render?action=TEMPLATE#Intent;scheme=https;package=com.google.android.calendar;end`;
              setTimeout(() => window.open(url, '_blank'), 1000);
            } else {
              window.open(url, '_blank');
            }
            if (modal) modal.style.display = 'none';
          }}>Open</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MatchCard;
