import React from 'react';
import { teams, type Group, type Team } from '../data/teams';
import { matches } from '../data/matches';
import './StandingsTable.css';

interface StandingsTableProps {
  group: Group;
}

interface TeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ group }) => {
  const groupMatches = matches.filter(m => m.stage === `Group ${group}`);
  const groupTeams = teams.filter(t => t.group === group);

  const standings: TeamStanding[] = groupTeams.map(team => ({
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDiff: 0,
    points: 0,
  }));

  groupMatches.forEach(match => {
    if (match.status === 'completed') {
      const homeStanding = standings.find(s => s.team.name === match.homeTeam);
      const awayStanding = standings.find(s => s.team.name === match.awayTeam);

      if (homeStanding && awayStanding) {
        homeStanding.played++;
        awayStanding.played++;

        const homeGoals = match.homeScore || 0;
        const awayGoals = match.awayScore || 0;

        homeStanding.goalsFor += homeGoals;
        homeStanding.goalsAgainst += awayGoals;
        awayStanding.goalsFor += awayGoals;
        awayStanding.goalsAgainst += homeGoals;

        if (homeGoals > awayGoals) {
          homeStanding.won++;
          homeStanding.points += 3;
          awayStanding.lost++;
        } else if (awayGoals > homeGoals) {
          awayStanding.won++;
          awayStanding.points += 3;
          homeStanding.lost++;
        } else {
          homeStanding.drawn++;
          awayStanding.drawn++;
          homeStanding.points++;
          awayStanding.points++;
        }
      }
    }
  });

  standings.forEach(s => {
    s.goalDiff = s.goalsFor - s.goalsAgainst;
  });

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return 0;
  });

  return (
    <div className="standings-table-container">
      <h3 className="group-title">Group {group}</h3>
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr key={standing.team.id} className={index < 2 ? 'qualify' : ''}>
              <td className="rank">{index + 1}</td>
              <td className="team-cell">
                <span className="flag">{standing.team.flag}</span>
                <span className="team-name">{standing.team.name}</span>
              </td>
              <td>{standing.played}</td>
              <td>{standing.won}</td>
              <td>{standing.drawn}</td>
              <td>{standing.lost}</td>
              <td>{standing.goalsFor}</td>
              <td>{standing.goalsAgainst}</td>
              <td className={standing.goalDiff > 0 ? 'positive' : standing.goalDiff < 0 ? 'negative' : ''}>
                {standing.goalDiff > 0 ? `+${standing.goalDiff}` : standing.goalDiff}
              </td>
              <td className="points">{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
