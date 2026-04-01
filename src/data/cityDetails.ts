export interface CityTransport {
  fromAirport: string;
  fromDowntown: string;
  tips: string;
}

export interface CityDetail {
  id: string;
  city: string;
  cityEn: string;
  country: 'USA' | 'Canada' | 'Mexico';
  stadium: string;
  capacity: number;
  roofType: string;
  gameDates: string[];
  transport: CityTransport;
  whereToStay: string[];
  thingsToDo: string[];
  food: string[];
  beerPrice: string;
}

export const cityDetails: CityDetail[] = [
  {
    id: 'la',
    city: 'Los Angeles',
    cityEn: 'Los Angeles',
    country: 'USA',
    stadium: 'SoFi Stadium',
    capacity: 69650,
    roofType: 'Indoor/outdoor hybrid',
    gameDates: ['Jun 12', 'Jun 15', 'Jun 18', 'Jun 21', 'Jun 25', 'Jun 28', 'Jul 10'],
    transport: {
      fromAirport: 'From LAX: Take airport Metro C or K line to Hawthorne/Lennox Station, then free SoFi Stadium Shuttle. 30-40 min. Or rideshare 30-40 min.',
      fromDowntown: 'From Downtown: Take C Line to Hawthorne/Lennox Station, then Shuttle.',
      tips: 'LA is notorious for traffic. Use public transit and leave early on matchdays.'
    },
    whereToStay: ['Downtown LA', 'Little Tokyo/Arts District'],
    thingsToDo: ['Hollywood Sign', 'Santa Monica Pier', 'Hollywood Walk of Fame', 'Griffith Observatory', 'Getty Center'],
    food: ['Tacos', 'In-N-Out Burger', 'Korean BBQ', 'Poke Bowl'],
    beerPrice: '$6-9 (bar) / $10-12 (stadium)'
  },
  {
    id: 'sf',
    city: 'San Francisco Bay Area',
    cityEn: 'San Francisco Bay Area',
    country: 'USA',
    stadium: "Levi's Stadium",
    capacity: 69391,
    roofType: 'Open-air',
    gameDates: ['Jun 13', 'Jun 16', 'Jun 19', 'Jun 22', 'Jun 25', 'Jul 1'],
    transport: {
      fromAirport: 'From SFO: BART to downtown (30 min), then Caltrain to Mountain View/Sunnyvale, transfer to VTA light rail to Levi Stadium. 1.5-2 hours. From SJC: VTA Orange Line direct to Great America Station, 20-40 min.',
      fromDowntown: 'From SF Downtown: Caltrain to Mountain View, transfer to VTA. 1.5-2 hours. Rideshare 45-70 min.',
      tips: "Levi's Stadium is 50 miles south of SF in Santa Clara. Public transit is reliable but slow. Leave early on matchdays. Uber/Lyft will surge heavily."
    },
    whereToStay: ['SF Downtown (SoMa)', 'Mission District'],
    thingsToDo: ['Golden Gate Bridge', 'Alcatraz Island', 'Cable Cars', "Fisherman's Wharf", 'Golden Gate Park'],
    food: ['Sourdough Bread', 'Dungeness Crab', 'Mission Burrito', 'Dim Sum', 'Irish Coffee'],
    beerPrice: '$10'
  },
  {
    id: 'sea',
    city: 'Seattle',
    cityEn: 'Seattle',
    country: 'USA',
    stadium: 'Lumen Field',
    capacity: 69000,
    roofType: 'Open-air',
    gameDates: ['Jun 15', 'Jun 19', 'Jun 24', 'Jun 26', 'Jul 1', 'Jul 6'],
    transport: {
      fromAirport: 'From SEA: Take Link light rail ($3) to International District/Chinatown Station, walk 10 min to stadium. Same time as rideshare for 5% of cost.',
      fromDowntown: 'Walk 30 min from Pike Place Market, or take light rail/bus.',
      tips: 'Lumen Field is downtown-adjacent in SoDo. Easy access via light rail. Stadium is walkable from downtown.'
    },
    whereToStay: ['Downtown', 'Pioneer Square', 'Belltown'],
    thingsToDo: ['Pike Place Market', 'Space Needle', 'Kerry Park', 'Ballard Locks', 'Ferry to Bainbridge Island'],
    food: ['Pike Place Chowder', 'Salmon', 'Sushi', 'Ramen'],
    beerPrice: '$5-8 (bar) / $12-15 (stadium)'
  },
  {
    id: 'dal',
    city: 'Dallas',
    cityEn: 'Dallas',
    country: 'USA',
    stadium: 'AT&T Stadium',
    capacity: 70122,
    roofType: 'Retractable roof',
    gameDates: ['Jun 14', 'Jun 17', 'Jun 22', 'Jun 25', 'Jun 27', 'Jun 30', 'Jul 3', 'Jul 6', 'Jul 14'],
    transport: {
      fromAirport: 'From DFW: Rideshare 20-25 min to Arlington. Stadium shuttles from major hotels.',
      fromDowntown: 'Rideshare 35 min. Stadium shuttles from Downtown, Victory Park, Fair Park.',
      tips: 'Dallas is car country. No rail to stadium. Rideshare or car essential. Expect serious heat and traffic.'
    },
    whereToStay: ['Downtown Dallas', 'Uptown', 'Deep Ellum'],
    thingsToDo: ['Sixth Floor Museum', 'Dallas Arts District', 'Deep Ellum', 'Reunion Tower', 'Dallas Arboretum'],
    food: ['Texas BBQ', 'Mexican Food', 'Steakhouses'],
    beerPrice: '$6-8 (bar) / $9-12 (stadium)'
  },
  {
    id: 'hou',
    city: 'Houston',
    cityEn: 'Houston',
    country: 'USA',
    stadium: 'NRG Stadium',
    capacity: 72220,
    roofType: 'Retractable roof',
    gameDates: ['Jun 14', 'Jun 17', 'Jun 20', 'Jun 23', 'Jun 26', 'Jun 29', 'Jul 4'],
    transport: {
      fromAirport: 'From IAH: Rideshare 30-45 min. From HOU: Rideshare 20 min.',
      fromDowntown: 'Rideshare 20-30 min.',
      tips: 'Houston humidity is real. Stadium is not central. Rideshare is your best bet. Get there early to beat the heat.'
    },
    whereToStay: ['Downtown Houston', 'Montrose', 'Midtown'],
    thingsToDo: ['NASA Space Center', 'Museum District', 'Buffalo Bayou', 'Discovery Green', 'GRB Convention Center'],
    food: ['Carne Asada', 'Cajun Seafood', 'Texas Steak', 'Vietnamese'],
    beerPrice: '$6-8'
  },
  {
    id: 'kc',
    city: 'Kansas City',
    cityEn: 'Kansas City',
    country: 'USA',
    stadium: 'Arrowhead Stadium',
    capacity: 73080,
    roofType: 'Open-air',
    gameDates: ['Jun 16', 'Jun 20', 'Jun 25', 'Jun 27', 'Jul 3', 'Jul 11'],
    transport: {
      fromAirport: 'From MCI: Rideshare 35-45 min.',
      fromDowntown: 'Rideshare 15-20 min.',
      tips: 'Arrowhead is far out east. Limited transit. Rideshare or car is essential.'
    },
    whereToStay: ['Downtown Kansas City', 'Crossroads District', 'Westport'],
    thingsToDo: ['Country Club Plaza', 'National WWI Museum', 'City Market', 'Jazz Heritage Tour', 'BBQ Tour'],
    food: ['Kansas City BBQ', 'Burnt Ends', 'Steakhouses'],
    beerPrice: '$5-7'
  },
  {
    id: 'atl',
    city: 'Atlanta',
    cityEn: 'Atlanta',
    country: 'USA',
    stadium: 'Mercedes-Benz Stadium',
    capacity: 75000,
    roofType: 'Retractable roof',
    gameDates: ['Jun 15', 'Jun 18', 'Jun 21', 'Jun 24', 'Jun 27', 'Jul 1', 'Jul 7', 'Jul 15'],
    transport: {
      fromAirport: 'From ATL: Take MARTA Red Line to North Springs, 30-40 min. Rideshare 25-35 min.',
      fromDowntown: 'MARTA direct to Mercedes-Benz Stadium station, 15 min.',
      tips: 'Great stadium location downtown. Limited transit elsewhere. Pick neighborhood carefully.'
    },
    whereToStay: ['Downtown', 'Midtown', 'Buckhead'],
    thingsToDo: ['World of Coca-Cola', 'Aquarium', 'Piedmont Park', 'MLK National Historic Site', 'High Museum'],
    food: ['Fried Chicken', 'Southern BBQ', 'Waffle House', 'Mexican Food'],
    beerPrice: '$6-8'
  },
  {
    id: 'bos',
    city: 'Boston',
    cityEn: 'Boston',
    country: 'USA',
    stadium: 'Gillette Stadium',
    capacity: 65878,
    roofType: 'Open-air',
    gameDates: ['Jun 13', 'Jun 16', 'Jun 19', 'Jun 23', 'Jun 26', 'Jun 29', 'Jul 9'],
    transport: {
      fromAirport: 'From BOS: Silver Line to South Station, then Commuter Rail to Foxborough, 1-1.5 hours. Rideshare 45-60 min.',
      fromDowntown: 'Commuter Rail to Foxborough, 45-60 min. Rideshare 45 min.',
      tips: 'Gillette Stadium is in Foxborough, 40 miles from Boston. Plan for commuter rail timing or budget for rideshare.'
    },
    whereToStay: ['Downtown Boston', 'Back Bay', 'Cambridge'],
    thingsToDo: ['Freedom Trail', 'Faneuil Hall', 'Harvard', 'Quincy Market', 'Boston Tea Party Ships'],
    food: ['New England Clam Chowder', 'Lobster Roll', 'Baked Beans', 'Italian North End'],
    beerPrice: '$7-9'
  },
  {
    id: 'mia',
    city: 'Miami',
    cityEn: 'Miami',
    country: 'USA',
    stadium: 'Hard Rock Stadium',
    capacity: 64767,
    roofType: 'Open-air',
    gameDates: ['Jun 15', 'Jun 21', 'Jun 24', 'Jun 27', 'Jul 3', 'Jul 11', 'Jul 18'],
    transport: {
      fromAirport: 'From MIA: Rideshare 30-40 min to Miami Gardens. From FLL: Rideshare 20 min closer.',
      fromDowntown: 'Rideshare 20-30 min.',
      tips: 'Heat and storms are common. Stadium is not downtown. Rideshare required. Get there early and stay hydrated.'
    },
    whereToStay: ['South Beach', 'Brickell', 'Wynwood'],
    thingsToDo: ['South Beach', 'Wynwood Arts District', 'Little Havana', 'Bayside Marketplace', 'Everglades Day Trip'],
    food: ['Cuban Sandwich', 'Stone Crab', 'Latin Cuisine'],
    beerPrice: '$7-10'
  },
  {
    id: 'nyc',
    city: 'New York/New Jersey',
    cityEn: 'New York/New Jersey',
    country: 'USA',
    stadium: 'MetLife Stadium',
    capacity: 82500,
    roofType: 'Open-air',
    gameDates: ['Jun 13', 'Jun 16', 'Jun 22', 'Jun 25', 'Jun 27', 'Jun 30', 'Jul 5', 'Jul 19'],
    transport: {
      fromAirport: 'From JFK: AirTrain to Sutphin, E train to 42nd, A to Penn Station, NJ Transit to MetLife. 1-1.5 hours. From Newark: NJ Transit direct, 30 min.',
      fromDowntown: 'NJ Transit from Penn Station to MetLife Stadium, 20-30 min.',
      tips: 'MetLife is in East Rutherford, NJ. Traffic is brutal on matchdays. Stay where trains are easy. Prices higher here than anywhere else.'
    },
    whereToStay: ['Manhattan Midtown', 'Lower Manhattan', 'New Jersey'],
    thingsToDo: ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Metropolitan Museum'],
    food: ['Joes Pizza', 'Shake Shack', 'Chelsea Market', 'Bagels', 'Korean BBQ'],
    beerPrice: '$8-12'
  },
  {
    id: 'phi',
    city: 'Philadelphia',
    cityEn: 'Philadelphia',
    country: 'USA',
    stadium: 'Lincoln Financial Field',
    capacity: 69280,
    roofType: 'Open-air',
    gameDates: ['Jun 14', 'Jun 19', 'Jun 22', 'Jun 25', 'Jun 27', 'Jul 4'],
    transport: {
      fromAirport: 'From PHL: Airport Line to Center City, 30 min. Rideshare 20 min.',
      fromDowntown: 'Broad Street Line direct to stadium, 15-20 min.',
      tips: 'Good transit setup. Broad Street Line to stadium complex is easy.'
    },
    whereToStay: ['Center City', 'South Philly', 'University City'],
    thingsToDo: ['Liberty Bell', 'Independence Hall', 'Reading Terminal Market', 'Philadelphia Museum of Art', 'Betsy Ross House'],
    food: ['Cheesesteak', 'Scrambled Scrapple', 'Reading Terminal Fare'],
    beerPrice: '$6-8'
  },
  {
    id: 'van',
    city: 'Vancouver',
    cityEn: 'Vancouver',
    country: 'Canada',
    stadium: 'BC Place',
    capacity: 54500,
    roofType: 'Retractable',
    gameDates: ['Jun 13', 'Jun 18', 'Jun 21', 'Jun 24', 'Jun 26', 'Jul 2', 'Jul 7'],
    transport: {
      fromAirport: 'From YVR: Canada Line to Vancouver City Centre, 30 min. Rideshare 30 min.',
      fromDowntown: 'Walk 15 min or take SkyTrain.',
      tips: 'BC Place is downtown-adjacent. SkyTrain is your friend. Canadian taxes are high.'
    },
    whereToStay: ['Downtown Vancouver', 'Gastown', 'Yaletown'],
    thingsToDo: ['Stanley Park', 'Capilano Suspension Bridge', 'Granville Island', 'Gastown', 'Skiing/Hiking'],
    food: ['Pacific Salmon', 'Poutine', 'Japanese', 'Seafood'],
    beerPrice: '$7-9 CAD'
  },
  {
    id: 'tor',
    city: 'Toronto',
    cityEn: 'Toronto',
    country: 'Canada',
    stadium: 'BMO Field',
    capacity: 45736,
    roofType: 'Open-air',
    gameDates: ['Jun 12', 'Jun 17', 'Jun 20', 'Jun 23', 'Jun 26', 'Jul 2'],
    transport: {
      fromAirport: 'From YYZ: UP Express to Union Station, 25 min. Rideshare 30-40 min.',
      fromDowntown: 'Line 1 to St George, transfer to Line 2 to Keele. Or streetcar. Rideshare 15-20 min.',
      tips: 'BMO Field is west of downtown. TTC and streetcars work well.'
    },
    whereToStay: ['Downtown Toronto', 'Queen West', 'Yorkville'],
    thingsToDo: ['CN Tower', 'Ripleys Aquarium', 'Royal Ontario Museum', 'Toronto Islands', 'St. Lawrence Market'],
    food: ['Poutine', 'Indonesian', 'Italian', 'Dim Sum'],
    beerPrice: '$7-9 CAD'
  },
  {
    id: 'gua',
    city: 'Guadalajara',
    cityEn: 'Guadalajara',
    country: 'Mexico',
    stadium: 'Estadio Akron',
    capacity: 49600,
    roofType: 'Open-air',
    gameDates: ['Jun 11', 'Jun 18', 'Jun 23', 'Jun 26'],
    transport: {
      fromAirport: 'From GDL: Rideshare 30-40 min to Zapopan stadium area.',
      fromDowntown: 'Rideshare 25-35 min.',
      tips: 'Estadio Akron is in Zapopan, far from center. Rideshare is default. Heat is manageable but real.'
    },
    whereToStay: ['Zapopan', 'Centro Historico', 'Colonia Americana'],
    thingsToDo: ['Historic Center', 'Guadalajara Cathedral', 'Instituto Cultural Cabanas', 'Tequila Day Trip', 'Hospicio Cabañas'],
    food: ['Birria', 'Tortas Ahogadas', 'Tacos', 'Tequila'],
    beerPrice: '$2-4 USD'
  },
  {
    id: 'mex',
    city: 'Mexico City',
    cityEn: 'Mexico City',
    country: 'Mexico',
    stadium: 'Estadio Azteca',
    capacity: 87523,
    roofType: 'Open-air',
    gameDates: ['Jun 11', 'Jun 17', 'Jun 24', 'Jun 30', 'Jul 5'],
    transport: {
      fromAirport: 'From MEX: Rideshare 40 min to Coyoacan. Metro available.',
      fromDowntown: 'Rideshare 30-40 min depending on traffic.',
      tips: 'Estadio Azteca is in Coyoacan at 7,200ft elevation. Pace yourself. Good transit access and rideshare.'
    },
    whereToStay: ['Roma/Condesa', 'Centro Historico', 'Polanco', 'Coyoacan'],
    thingsToDo: ['Zocalo Main Square', 'Frida Kahlo Museum', 'Chapultepec Castle', 'National Anthropology Museum', 'Teotihuacan Day Trip'],
    food: ['Tacos al Pastor', 'Mole', 'Churros', 'Tequila'],
    beerPrice: '$2-5 USD'
  },
  {
    id: 'mon',
    city: 'Monterrey',
    cityEn: 'Monterrey',
    country: 'Mexico',
    stadium: 'Estadio BBVA',
    capacity: 53400,
    roofType: 'Open-air',
    gameDates: ['Jun 14', 'Jun 20', 'Jun 24', 'Jun 29'],
    transport: {
      fromAirport: 'From MTY: Rideshare 30-40 min to San Agustin stadium area.',
      fromDowntown: 'Rideshare 20-30 min.',
      tips: 'Estadio BBVA is in San Agustin area, modern. Expect serious heat. Rideshare is default.'
    },
    whereToStay: ['San Agustin', 'Centro', 'Valle Oriente'],
    thingsToDo: ['Macroplaza', 'Cerro de la Silla', 'Contemporary Art Museum', 'Chipinque Park', 'Barranca Tour'],
    food: ['Cabrito', 'Carne Asada', 'Machaca', 'Northern Mexico Cuisine'],
    beerPrice: '$2-4 USD'
  }
];

export const getCityDetailById = (id: string): CityDetail | undefined => {
  return cityDetails.find(c => c.id === id);
};

export const getCityDetailsByCountry = (country: 'USA' | 'Canada' | 'Mexico'): CityDetail[] => {
  return cityDetails.filter(c => c.country === country);
};
