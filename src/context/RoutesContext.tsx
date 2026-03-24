import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RouteRecommendation } from '../data/routeRecommendations';
import type { Team } from '../data/teams';

export interface SelectedTeamData {
  team: Team;
  matchCount: number;
  cities: string[];
  totalDistance: number;
  isStrong: boolean;
}

interface RoutesContextType {
  selectedRouteId: string | null;
  selectedTeamId: string | null;
  setSelectedRoute: (route: RouteRecommendation | null) => void;
  setSelectedTeam: (team: SelectedTeamData | null) => void;
}

const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

export const RoutesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(() => {
    return localStorage.getItem('wc26_selected_route');
  });
  
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(() => {
    return localStorage.getItem('wc26_selected_team');
  });

  useEffect(() => {
    if (selectedRouteId) {
      localStorage.setItem('wc26_selected_route', selectedRouteId);
    } else {
      localStorage.removeItem('wc26_selected_route');
    }
  }, [selectedRouteId]);

  useEffect(() => {
    if (selectedTeamId) {
      localStorage.setItem('wc26_selected_team', selectedTeamId);
    } else {
      localStorage.removeItem('wc26_selected_team');
    }
  }, [selectedTeamId]);

  const setSelectedRoute = (route: RouteRecommendation | null) => {
    setSelectedRouteId(route?.id || null);
  };

  const setSelectedTeam = (team: SelectedTeamData | null) => {
    setSelectedTeamId(team?.team.id || null);
  };

  return (
    <RoutesContext.Provider value={{ 
      selectedRouteId, 
      selectedTeamId,
      setSelectedRoute,
      setSelectedTeam
    }}>
      {children}
    </RoutesContext.Provider>
  );
};

export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (context === undefined) {
    throw new Error('useRoutes must be used within a RoutesProvider');
  }
  return context;
};
