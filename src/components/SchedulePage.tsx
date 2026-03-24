import React, { useMemo } from 'react';
import { matches, type Match } from '../data/matches';
import MatchCard from './MatchCard';
import './SchedulePage.css';

const openGoogleCalendar = (title: string, date: Date, description: string) => {
  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(date)}/${formatDate(new Date(date.getTime() + 60 * 60 * 1000))}&details=${encodeURIComponent(description)}`;
  window.open(url, '_blank');
};

const SchedulePage: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const kickoffDate = new Date('2026-06-11');
  const ticketDate = new Date('2026-04-01');
  const knockoutDate = new Date('2026-06-28');
  const finalDate = new Date('2026-07-19');
  
  const daysToKickoff = Math.ceil((kickoffDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysToTicket = Math.ceil((ticketDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysToKnockout = Math.ceil((knockoutDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysToFinal = Math.ceil((finalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const groupMatchesByDate = (matchesList: Match[]) => {
    const groups: Record<string, Match[]> = {};
    matchesList.forEach(match => {
      if (!groups[match.date]) {
        groups[match.date] = [];
      }
      groups[match.date].push(match);
    });
    return Object.entries(groups).sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());
  };

  const groupMatches = groupMatchesByDate(matches.filter(m => !m.stage.includes('Round') && !m.stage.includes('Quarter') && !m.stage.includes('Semi') && !m.stage.includes('Final') && !m.stage.includes('Third')));
  const knockoutMatches = groupMatchesByDate(matches.filter(m => m.stage.includes('Round') || m.stage.includes('Quarter') || m.stage.includes('Semi') || m.stage.includes('Final') || m.stage.includes('Third')));

  return (
    <div className="schedule-page">
      <header className="schedule-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>🏆 FIFA World Cup 2026</h1>
          <p className="hero-subtitle">USA · Canada · Mexico · 48 Teams · 104 Matches</p>
          
          <div className="countdown-ticket-row">
            <span className="ticket-label">⚠️ Last-Minute Tickets</span>
            <span className="ticket-number">{daysToTicket > 0 ? daysToTicket : 0}</span>
            <span className="ticket-unit">days</span>
            <button className="remind-btn" onClick={() => openGoogleCalendar('FIFA World Cup 2026 - Last-Minute Sales', ticketDate, 'FIFA Last-Minute Sales Phase - Final chance to purchase official tickets! First-come, first-served.\n\nWebsite: https://www.fifa.com/tickets')}>🔔 Set Reminder</button>
          </div>
          
          <div className="countdown-cards">
            <div className="countdown-card">
              <div className="card-label">To Kick-off</div>
              <div className="card-number">{daysToKickoff}</div>
              <div className="card-unit">days</div>
            </div>
            <div className="countdown-card">
              <div className="card-label">To Knockout</div>
              <div className="card-number">{daysToKnockout}</div>
              <div className="card-unit">days</div>
            </div>
            <div className="countdown-card">
              <div className="card-label">To Final</div>
              <div className="card-number">{daysToFinal}</div>
              <div className="card-unit">days</div>
            </div>
          </div>
        </div>
      </header>

      <div className="schedule-content">
        <section className="match-section">
          <h2>📅 Group Stage</h2>
          <p className="section-desc">June 11 - June 27</p>
          
          {groupMatches.map(([date, dateMatches]) => (
            <div key={date} className="date-group">
              <div className="date-header">
                <span className="date-day">{dateMatches[0].weekday}</span>
                <span className="date-full">{dateMatches[0].month} {dateMatches[0].day}</span>
              </div>
              
              <div className="matches-grid">
                {dateMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="match-section">
          <h2>🏆 Knockout Stage</h2>
          <p className="section-desc">June 28 - July 19</p>
          
          {knockoutMatches.map(([date, dateMatches]) => (
            <div key={date} className="date-group">
              <div className="date-header">
                <span className="date-day">{dateMatches[0].weekday}</span>
                <span className="date-full">{dateMatches[0].month} {dateMatches[0].day}</span>
              </div>
              
              <div className="matches-grid">
                {dateMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SchedulePage;