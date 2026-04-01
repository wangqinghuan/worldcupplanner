import { matches } from '../data/matches';

export interface PresetRoute {
  id: string;
  name: string;
  description: string;
  cities: string[];
  matchCount: number;
  suitableFor: string;
  highlights: string[];
  image: string;
}

const getMatchCount = (cities: string[]): number => {
  const cityMatchSet = new Set<number>();
  cities.forEach(city => {
    matches.filter(m => m.city === city).forEach(m => cityMatchSet.add(m.id));
  });
  return cityMatchSet.size;
};

export const presetRoutes: PresetRoute[] = [
  {
    id: 'east-coast',
    name: 'East Coast Classic',
    description: 'Experience the most transit-friendly corridor with three world-class cities connected by efficient train routes.',
    cities: ['New York/New Jersey', 'Philadelphia', 'Boston'],
    matchCount: 0,
    suitableFor: 'First-time visitors, time-constrained fans',
    highlights: ['Easy train connections', 'Historic cities', 'Dense match schedule'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'west-coast',
    name: 'West Coast Vibes',
    description: 'Explore the beautiful Pacific coast from LA to San Francisco with stunning scenery and excellent football.',
    cities: ['Los Angeles', 'San Francisco Bay Area', 'Seattle'],
    matchCount: 0,
    suitableFor: 'Scenery lovers, longer trips',
    highlights: ['Pacific coast views', 'Tech hub culture', 'Great weather'],
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mexico',
    name: 'Mexico Experience',
    description: 'Immerse yourself in Mexican football culture across three passionate cities with lower costs.',
    cities: ['Mexico City', 'Monterrey', 'Guadalajara'],
    matchCount: 0,
    suitableFor: 'Cultural enthusiasts, budget-conscious fans',
    highlights: ['Authentic Mexican culture', 'Lower costs', 'Incredible football atmosphere'],
    image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'texas',
    name: 'Texas Triangle',
    description: 'Experience authentic American hospitality in three Texas powerhouses with short distances between cities.',
    cities: ['Dallas', 'Houston', 'Kansas City'],
    matchCount: 0,
    suitableFor: 'American football fans, road trip enthusiasts',
    highlights: ['Short drives', 'Southern hospitality', 'BBQ culture'],
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'southeast',
    name: 'Southeast Heat',
    description: 'Follow the tournament through the warm Southeast with passionate fan bases and diverse cities.',
    cities: ['Atlanta', 'Miami', 'Philadelphia'],
    matchCount: 0,
    suitableFor: 'Warm weather lovers, diverse experiences',
    highlights: ['Warm climate', 'Diverse culture', 'Beach access'],
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'canada',
    name: 'Northern Adventure',
    description: 'Discover Canadian hospitality in two stunning cities with unique international experiences.',
    cities: ['Toronto', 'Vancouver'],
    matchCount: 0,
    suitableFor: 'International travelers, scenic adventures',
    highlights: ['Beautiful nature', 'Multicultural cities', 'Lower crowds'],
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80'
  }
];

presetRoutes.forEach(route => {
  route.matchCount = getMatchCount(route.cities);
});

export const getRouteById = (id: string): PresetRoute | undefined => {
  return presetRoutes.find(r => r.id === id);
};
