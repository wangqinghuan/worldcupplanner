import React, { useMemo, useState, useEffect } from 'react';
import { matches, type Match } from '../data/matches';
import MatchCard from './MatchCard';
import { venues } from '../data/venues';
import { teams } from '../data/teams';
import './SchedulePage.css';

const SchedulePage: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const kickoffDate = useMemo(() => new Date('2026-06-11T20:00:00'), []);
  
  const [timeLeft, setTimeLeft] = useState<{days: number; hours: number; minutes: number; seconds: number}>(() => {
    const diff = kickoffDate.getTime() - today.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = kickoffDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [kickoffDate]);
  
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const uniqueStages = useMemo(() => [...new Set(matches.map(m => m.stage))].sort(), []);
  const uniqueTeams = useMemo(() => teams.map(t => t.name).sort(), []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const countryMatch = selectedCountry === 'all' || m.country === selectedCountry;
      const cityMatch = selectedCity === 'all' || m.venueId === selectedCity;
      const stageMatch = selectedStage === 'all' || m.stage === selectedStage;
      const teamMatch = selectedTeam === 'all' || m.homeTeam === selectedTeam || m.awayTeam === selectedTeam;
      const search = searchQuery.toLowerCase();
      const searchMatch = searchQuery === '' || 
        m.homeTeam.toLowerCase().includes(search) || 
        m.awayTeam.toLowerCase().includes(search) || 
        m.city.toLowerCase().includes(search);
      return countryMatch && cityMatch && stageMatch && teamMatch && searchMatch;
    });
  }, [selectedCountry, selectedCity, selectedStage, selectedTeam, searchQuery]);

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

  const isFiltered = selectedCountry !== 'all' || selectedCity !== 'all' || selectedStage !== 'all' || selectedTeam !== 'all' || searchQuery !== '';
  
  const matchesToShow = isFiltered ? filteredMatches : matches;
  const groupMatches = groupMatchesByDate(matchesToShow.filter(m => !m.stage.includes('Round') && !m.stage.includes('Quarter') && !m.stage.includes('Semi') && !m.stage.includes('Final') && !m.stage.includes('Third')));
  const knockoutMatches = groupMatchesByDate(matchesToShow.filter(m => m.stage.includes('Round') || m.stage.includes('Quarter') || m.stage.includes('Semi') || m.stage.includes('Final') || m.stage.includes('Third')));

  return (
    <div className="schedule-page">
      <header className="schedule-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>🏆 FIFA World Cup 2026</h1>
          <p className="hero-subtitle">USA · Canada · Mexico · 48 Teams · 104 Matches</p>
          
          <div className="hero-countdown">
            <div className="countdown-label">Opening Ceremony</div>
            <div className="countdown-date">June 11, 2026</div>
            <div className="countdown-timer">
              <div className="countdown-block">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-unit">Days</span>
              </div>
              <div className="countdown-block">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-unit">Hours</span>
              </div>
              <div className="countdown-block">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-unit">Minutes</span>
              </div>
              <div className="countdown-block">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-unit">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="schedule-content">
        <div className="filter-row">
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Canada">Canada</option>
          </select>
          
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="all">All Cities</option>
            {venues.sort((a,b) => a.city.localeCompare(b.city)).map(v => (
              <option key={v.id} value={v.id}>{v.city}</option>
            ))}
          </select>
          
          <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
            <option value="all">All Stages</option>
            {uniqueStages.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="all">All Teams</option>
            {uniqueTeams.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          
          <input 
            type="text" 
            placeholder="Search teams..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredMatches.length === 0 ? (
          <p className="no-match">No matches found</p>
        ) : isFiltered ? (
          <div className="filtered-results">
            <p className="results-count">Showing {filteredMatches.length} matches</p>
            <div className="matches-grid">
              {filteredMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;