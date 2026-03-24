import React, { useState, useMemo } from 'react';
import { matches, type Match } from '../data/matches';
import MatchDetailModal from './MatchDetailModal';
import './TodayPage.css';

const TodayPage: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [savedMatchIds, setSavedMatchIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedMatches');
    return saved ? JSON.parse(saved) : [];
  });

  const [todayRange] = useState<[string, string]>(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    return [todayStr, tomorrowDate.toISOString().split('T')[0]];
  });
  const today = todayRange[0];
  const tomorrow = todayRange[1];
  
  const todayMatches = useMemo(() => 
    matches.filter(m => m.date === today || m.date === tomorrow).slice(0, 6),
    [today, tomorrow]
  );

  const upcomingMatches = useMemo(() => 
    matches
      .filter(m => m.date > tomorrow)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
      .slice(0, 8),
    [tomorrow]
  );

  const toggleSave = (matchId: number) => {
    const newSaved = savedMatchIds.includes(matchId)
      ? savedMatchIds.filter(id => id !== matchId)
      : [...savedMatchIds, matchId];
    setSavedMatchIds(newSaved);
    localStorage.setItem('savedMatches', JSON.stringify(newSaved));
  };

  const savedMatches = useMemo(() => 
    matches.filter(m => savedMatchIds.includes(m.id)),
    [savedMatchIds]
  );

  const getDateLabel = (date: string) => {
    if (date === today) return 'Today';
    if (date === tomorrow) return 'Tomorrow';
    return '';
  };

  const formatMatchTime = (date: string, time: string) => {
    const [hours, minutes] = time.replace(/[APM\s]/g, '').split(':');
    let hour = parseInt(hours);
    if (time.includes('PM') && hour !== 12) hour += 12;
    if (time.includes('AM') && hour === 12) hour = 0;
    
    const matchDate = new Date(`${date}T${String(hour).padStart(2, '0')}:${minutes}:00`);
    const now = new Date();
    const diff = matchDate.getTime() - now.getTime();
    
    if (diff > 0 && diff < 24 * 60 * 60 * 1000) {
      return `In ${Math.round(diff / (1000 * 60 * 60))}h`;
    }
    return '';
  };

  return (
    <div className="today-page">
      <header className="hero">
        <div className="hero-content">
          <h1>🏆 World Cup 2026</h1>
          <p className="hero-subtitle">
            {todayMatches.length > 0 ? (
              <>Today & Tomorrow: {todayMatches.length} matches</>
            ) : (
              <>June 11 - July 19, 2026</>
            )}
          </p>
        </div>
      </header>

      <div className="content-wrapper">
        {todayMatches.length > 0 && (
          <section className="section upcoming-section">
            <h2 className="section-title">⚡ Upcoming Matches</h2>
            <div className="matches-grid">
              {todayMatches.map(match => {
                const countdown = formatMatchTime(match.date, match.time);
                const isLive = match.status === 'live';
                const isSaved = savedMatchIds.includes(match.id);
                
                return (
                  <div 
                    key={match.id} 
                    className={`match-card-large ${isLive ? 'is-live' : ''} ${isSaved ? 'is-saved' : ''}`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    {isLive && (
                      <div className="live-badge">
                        <span className="live-dot"></span>
                        LIVE
                      </div>
                    )}
                    {countdown && !isLive && (
                      <div className="countdown-badge">{countdown}</div>
                    )}
                    
                    <div className="match-date-row">
                      <span className="match-date">{getDateLabel(match.date)}</span>
                      <span className="match-time">{match.time} {match.timezone}</span>
                    </div>
                    
                    <div className="match-teams">
                      <span className="team home">{match.homeTeam}</span>
                      <span className="vs">vs</span>
                      <span className="team away">{match.awayTeam}</span>
                    </div>
                    
                    {isLive && match.homeScore !== undefined && (
                      <div className="live-score">
                        <span className="score">{match.homeScore}</span>
                        <span className="dash">-</span>
                        <span className="score">{match.awayScore}</span>
                      </div>
                    )}
                    
                    <div className="match-venue">
                      📍 {match.city}, {match.venue}
                    </div>
                    
                    <button 
                      className={`save-btn ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(match.id);
                      }}
                    >
                      {isSaved ? '❤️ Saved' : '🤍 Save'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {savedMatches.length > 0 && (
          <section className="section saved-section">
            <h2 className="section-title">❤️ Your Saved Matches</h2>
            <div className="matches-list">
              {savedMatches.map(match => (
                <div 
                  key={match.id} 
                  className="match-row"
                  onClick={() => setSelectedMatch(match)}
                >
                  <div className="match-row-date">
                    <span className="date">{match.month} {match.day}</span>
                    <span className="time">{match.time}</span>
                  </div>
                  <div className="match-row-teams">
                    <span className="team">{match.homeTeam}</span>
                    <span className="vs">vs</span>
                    <span className="team">{match.awayTeam}</span>
                  </div>
                  <div className="match-row-info">
                    <span className="venue">{match.city}</span>
                    <span className="stage">{match.stage}</span>
                  </div>
                  <button 
                    className="unsave-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(match.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h2 className="section-title">📅 Full Schedule</h2>
          <div className="matches-list">
            {upcomingMatches.map(match => {
              const isSaved = savedMatchIds.includes(match.id);
              return (
                <div 
                  key={match.id} 
                  className="match-row"
                  onClick={() => setSelectedMatch(match)}
                >
                  <div className="match-row-date">
                    <span className="date">{match.month} {match.day}</span>
                    <span className="time">{match.time}</span>
                  </div>
                  <div className="match-row-teams">
                    <span className="team">{match.homeTeam}</span>
                    <span className="vs">vs</span>
                    <span className="team">{match.awayTeam}</span>
                  </div>
                  <div className="match-row-info">
                    <span className="venue">{match.city}</span>
                    <span className="stage">{match.stage}</span>
                  </div>
                  <button 
                    className={`save-icon-btn ${isSaved ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(match.id);
                    }}
                  >
                    {isSaved ? '❤️' : '🤍'}
                  </button>
                </div>
              );
            })}
          </div>
          <a href="#/schedule" className="view-all-link">View All 104 Matches →</a>
        </section>
      </div>

      {selectedMatch && (
        <MatchDetailModal 
          match={selectedMatch}
          isSaved={savedMatchIds.includes(selectedMatch.id)}
          onClose={() => setSelectedMatch(null)}
          onToggleSave={() => toggleSave(selectedMatch.id)}
        />
      )}
    </div>
  );
};

export default TodayPage;
