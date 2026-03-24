import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Match } from '../data/matches';
import type { Itinerary } from '../utils/geminiRouteGenerator';

export interface SavedPlan {
  id: string;
  name: string;
  cities: string[];
  arrivalDate: string;
  departureDate: string;
  itinerary: Itinerary;
  createdAt: number;
}

interface PendingRouteData {
  routeName: string;
  cities: string[];
  arrivalDate: string;
  departureDate: string;
}

interface ItineraryContextType {
  selectedMatches: Match[];
  addMatch: (match: Match) => void;
  removeMatch: (matchId: number) => void;
  isMatchSelected: (matchId: number) => boolean;
  reorderMatches: (fromIndex: number, toIndex: number) => void;
  clearAll: () => void;
  plans: SavedPlan[];
  currentPlanId: string | null;
  addPlan: (plan: Omit<SavedPlan, 'id' | 'createdAt'>) => string;
  deletePlan: (id: string) => void;
  setCurrentPlan: (id: string) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  pendingRouteData: PendingRouteData | null;
  setPendingRouteData: (data: PendingRouteData | null) => void;
  pendingTeamData: { teamName: string; cities: string[]; arrivalDate: string; departureDate: string } | null;
  setPendingTeamData: (data: { teamName: string; cities: string[]; arrivalDate: string; departureDate: string } | null) => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMatches, setSelectedMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('wc26_itinerary');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved itinerary', e);
        return [];
      }
    }
    return [];
  });

  const [plans, setPlans] = useState<SavedPlan[]>(() => {
    const saved = localStorage.getItem('wc26_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved plans', e);
        return [];
      }
    }
    return [];
  });

  const [currentPlanId, setCurrentPlanIdState] = useState<string | null>(() => {
    return localStorage.getItem('wc26_current_plan');
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingRouteData, setPendingRouteData] = useState<PendingRouteData | null>(null);
  const [pendingTeamData, setPendingTeamData] = useState<{teamName: string; cities: string[]; arrivalDate: string; departureDate: string} | null>(null);

  useEffect(() => {
    localStorage.setItem('wc26_itinerary', JSON.stringify(selectedMatches));
  }, [selectedMatches]);

  useEffect(() => {
    localStorage.setItem('wc26_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    if (currentPlanId) {
      localStorage.setItem('wc26_current_plan', currentPlanId);
    } else {
      localStorage.removeItem('wc26_current_plan');
    }
  }, [currentPlanId]);

  const addMatch = (match: Match) => {
    setSelectedMatches(prev => {
      if (!prev.some(m => m.id === match.id)) {
        return [...prev, match];
      }
      return prev;
    });
  };

  const removeMatch = (matchId: number) => {
    setSelectedMatches(selectedMatches.filter(m => m.id !== matchId));
  };

  const isMatchSelected = (matchId: number) => {
    return selectedMatches.some(m => m.id === matchId);
  };

  const reorderMatches = (fromIndex: number, toIndex: number) => {
    const result = [...selectedMatches];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    setSelectedMatches(result);
  };

  const clearAll = () => {
    setSelectedMatches([]);
    setPlans([]);
    setCurrentPlanIdState(null);
    setPendingRouteData(null);
    setPendingTeamData(null);
    setIsGenerating(false);
    localStorage.removeItem('wc26_itinerary');
    localStorage.removeItem('wc26_plans');
    localStorage.removeItem('wc26_current_plan');
  };

  const addPlan = (plan: Omit<SavedPlan, 'id' | 'createdAt'>): string => {
    const id = `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newPlan: SavedPlan = {
      ...plan,
      id,
      createdAt: Date.now(),
    };
    setPlans(prev => [...prev, newPlan]);
    setCurrentPlanIdState(id);
    return id;
  };

  const deletePlan = (id: string) => {
    setPlans(prev => {
      const newPlans = prev.filter(p => p.id !== id);
      if (currentPlanId === id && newPlans.length > 0) {
        setCurrentPlanIdState(newPlans[newPlans.length - 1].id);
      } else if (currentPlanId === id) {
        setCurrentPlanIdState(null);
      }
      return newPlans;
    });
  };

  const setCurrentPlan = (id: string) => {
    setCurrentPlanIdState(id);
  };

  return (
    <ItineraryContext.Provider value={{ 
      selectedMatches, 
      addMatch, 
      removeMatch, 
      isMatchSelected, 
      reorderMatches, 
      clearAll,
      plans,
      currentPlanId,
      addPlan,
      deletePlan,
      setCurrentPlan,
      isGenerating,
      setIsGenerating,
      pendingRouteData,
      setPendingRouteData,
      pendingTeamData,
      setPendingTeamData
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
