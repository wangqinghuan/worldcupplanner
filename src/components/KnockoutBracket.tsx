import React from 'react';
import { matches, type Match } from '../data/matches';
import './KnockoutBracket.css';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => (
  <div className={`bracket-match ${match.status === 'completed' ? 'completed' : ''}`}>
    <div className="match-info">
      <span className="match-num">M{match.matchNumber}</span>
      <span className="match-venue">{match.city}</span>
    </div>
    <div className="team-row">
      <span className={`team ${match.homeScore !== undefined && match.awayScore !== undefined && match.homeScore >= match.awayScore ? 'winner' : ''}`}>
        {match.homeTeam}
      </span>
      <span className="score">
        {match.homeScore !== undefined ? match.homeScore : '-'}
      </span>
    </div>
    <div className="team-row">
      <span className={`team ${match.homeScore !== undefined && match.awayScore !== undefined && match.awayScore >= match.homeScore ? 'winner' : ''}`}>
        {match.awayTeam}
      </span>
      <span className="score">
        {match.awayScore !== undefined ? match.awayScore : '-'}
      </span>
    </div>
    <div className="match-date">
      {match.month} {match.day} · {match.time}
    </div>
  </div>
);

const KnockoutBracket: React.FC = () => {
  const roundOf32 = matches.filter(m => m.stage === 'Round of 32');
  const roundOf16 = matches.filter(m => m.stage === 'Round of 16');
  const quarterfinals = matches.filter(m => m.stage === 'Quarter-final');
  const semifinals = matches.filter(m => m.stage === 'Semi-final');
  const thirdPlace = matches.find(m => m.stage === 'Third Place');
  const final = matches.find(m => m.stage === 'Final');

  return (
    <div className="knockout-bracket">
      <div className="bracket-stage">
        <h4 className="stage-title">Round of 32</h4>
        <div className="matches-grid round32-grid">
          {roundOf32.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      <div className="bracket-connector">
        <svg width="40" height="100%" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="40" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </div>

      <div className="bracket-stage">
        <h4 className="stage-title">Round of 16</h4>
        <div className="matches-grid round16-grid">
          {roundOf16.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      <div className="bracket-connector">
        <svg width="40" height="100%" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="40" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </div>

      <div className="bracket-stage">
        <h4 className="stage-title">Quarter-finals</h4>
        <div className="matches-grid qf-grid">
          {quarterfinals.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      <div className="bracket-connector">
        <svg width="40" height="100%" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="40" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      </div>

      <div className="bracket-stage">
        <h4 className="stage-title">Semi-finals</h4>
        <div className="matches-grid sf-grid">
          {semifinals.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      <div className="bracket-stage finals-stage">
        <h4 className="stage-title">Third Place</h4>
        {thirdPlace && <MatchCard match={thirdPlace} />}
        
        <h4 className="stage-title">Final</h4>
        {final && <MatchCard match={final} />}
      </div>
    </div>
  );
};

export default KnockoutBracket;
