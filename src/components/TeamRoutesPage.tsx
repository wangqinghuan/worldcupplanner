import React from 'react';
import { teamsRouteTree, type TeamRoute } from '../data/teamsRouteTree';
import './TeamRoutesPage.css';

interface TeamRoutesPageProps {
  onSelectTeam: (teamId: string) => void;
  onBack: () => void;
}

const TeamRoutesPage: React.FC<TeamRoutesPageProps> = ({ onSelectTeam, onBack }) => {
  return (
    <div className="team-routes-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        
        <header className="page-header">
          <h1>Find by Team</h1>
          <p>Select a team to see their possible routes through the tournament</p>
        </header>

        <div className="teams-grid">
          {teamsRouteTree.map((team: TeamRoute) => (
            <div 
              key={team.teamId}
              className="team-card"
              onClick={() => onSelectTeam(team.teamId)}
            >
              <div className="team-flag">
                {getTeamEmoji(team.teamId)}
              </div>
              <h3>{team.teamName}</h3>
              <div className="team-route-preview">
                <span className="route-label">Group Stage:</span>
                <span className="cities">
                  {team.groupStage.city1.split('/')[0]}, {team.groupStage.city2.split('/')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function getTeamEmoji(teamId: string): string {
  const emojis: Record<string, string> = {
    argentina: '🇦🇷',
    brazil: '🇧🇷',
    france: '🇫🇷',
    england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    germany: '🇩🇪',
    spain: '🇪🇸',
    portugal: '🇵🇹',
    usa: '🇺🇸',
    mexico: '🇲🇽',
    canada: '🇨🇦'
  };
  return emojis[teamId] || '⚽';
}

export default TeamRoutesPage;
