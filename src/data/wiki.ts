export interface WorldCupWinner {
  year: number;
  host: string;
  winner: string;
  runnerUp: string;
  score: string;
}

export interface WorldCupStat {
  category: string;
  value: string;
  description: string;
}

export interface FunFact {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FamousMoment {
  year: number;
  title: string;
  description: string;
}

export const worldCupWinners: WorldCupWinner[] = [
  { year: 1930, host: 'Uruguay', winner: 'Uruguay', runnerUp: 'Argentina', score: '4-2' },
  { year: 1934, host: 'Italy', winner: 'Italy', runnerUp: 'Czechoslovakia', score: '2-1 (AET)' },
  { year: 1938, host: 'France', winner: 'Italy', runnerUp: 'Hungary', score: '4-2' },
  { year: 1950, host: 'Brazil', winner: 'Uruguay', runnerUp: 'Brazil', score: '2-1' },
  { year: 1954, host: 'Switzerland', winner: 'West Germany', runnerUp: 'Hungary', score: '3-2' },
  { year: 1958, host: 'Sweden', winner: 'Brazil', runnerUp: 'Sweden', score: '5-2' },
  { year: 1962, host: 'Chile', winner: 'Brazil', runnerUp: 'Czechoslovakia', score: '3-1' },
  { year: 1966, host: 'England', winner: 'England', runnerUp: 'West Germany', score: '4-2 (AET)' },
  { year: 1970, host: 'Mexico', winner: 'Brazil', runnerUp: 'Italy', score: '4-1' },
  { year: 1974, host: 'West Germany', winner: 'West Germany', runnerUp: 'Netherlands', score: '2-1' },
  { year: 1978, host: 'Argentina', winner: 'Argentina', runnerUp: 'Netherlands', score: '3-1 (AET)' },
  { year: 1982, host: 'Spain', winner: 'Italy', runnerUp: 'West Germany', score: '3-1' },
  { year: 1986, host: 'Mexico', winner: 'Argentina', runnerUp: 'West Germany', score: '3-2' },
  { year: 1990, host: 'Italy', winner: 'West Germany', runnerUp: 'Argentina', score: '1-0' },
  { year: 1994, host: 'USA', winner: 'Brazil', runnerUp: 'Italy', score: '0-0 (4-2 Pen)' },
  { year: 1998, host: 'France', winner: 'France', runnerUp: 'Brazil', score: '3-0' },
  { year: 2002, host: 'Japan/Korea', winner: 'Brazil', runnerUp: 'Germany', score: '2-0' },
  { year: 2006, host: 'Germany', winner: 'Italy', runnerUp: 'France', score: '1-1 (5-3 Pen)' },
  { year: 2010, host: 'South Africa', winner: 'Spain', runnerUp: 'Netherlands', score: '1-0 (AET)' },
  { year: 2014, host: 'Brazil', winner: 'Germany', runnerUp: 'Argentina', score: '1-0' },
  { year: 2018, host: 'Russia', winner: 'France', runnerUp: 'Croatia', score: '4-2' },
  { year: 2022, host: 'Qatar', winner: 'Argentina', runnerUp: 'France', score: '3-3 (4-2 Pen)' },
];

export const worldCupRecords: WorldCupStat[] = [
  { category: 'Most Titles', value: 'Brazil (5)', description: '1958, 1962, 1970, 1994, 2002' },
  { category: 'Most Finals', value: 'Germany (8)', description: '1954, 1966, 1974, 1982, 1986, 1990, 2002, 2014' },
  { category: 'Most Semi-Finals', value: 'Germany (14)', description: 'A record for most semi-final appearances' },
  { category: 'Top Scorer', value: 'Miroslav Klose (16 goals)', description: 'Germany, 2002-2014' },
  { category: 'Most Appearances', value: 'Lionel Messi (26 games)', description: 'Argentina, 2006-2022' },
  { category: 'Most Goals in Tournament', value: 'Just Fontaine (13 goals)', description: 'France, 1958 - still unbroken!' },
  { category: 'Youngest Player', value: 'Pelé (17 years, 8 months)', description: 'Brazil, 1958' },
  { category: 'Oldest Player', value: 'Roger Milla (42 years)', description: 'Cameroon, 1994' },
  { category: 'Youngest Scorer', value: 'Pelé (17 years, 8 months)', description: 'Brazil, 1958' },
  { category: 'Oldest Scorer', value: 'Roger Milla (38 years)', description: 'Cameroon, 1994' },
  { category: 'Highest Attendance', value: '173,850', description: 'Brazil vs Uruguay, Maracanã 1950' },
  { category: 'Most Goals in a Match', value: '10 goals', description: 'Austria 7-5 Switzerland, 1954' },
  { category: 'Longest Winning Streak', value: '11 games', description: 'Brazil, 2002-2010' },
  { category: 'Most Goals in a Final', value: '5 goals (Hungary 1954)', description: 'Hungary lost 3-2 to West Germany' },
  { category: 'Fastest Goal', value: '11 seconds', description: 'Hakan Şükür (Turkey), 2002 vs South Korea' },
  { category: 'Most Clean Sheets', value: 'Oliver Kahn (5)', description: 'Germany, 2002' },
];

export const famousMoments: FamousMoment[] = [
  { year: 1950, title: 'Maracanazo', description: 'Uruguay defeats Brazil in the final game, shocking 200,000 fans at Maracanã Stadium. One of the biggest upsets in football history.' },
  { year: 1958, title: 'Pelé Emerges', description: '17-year-old Pelé becomes the youngest player to score in a World Cup, helping Brazil win their first title.' },
  { year: 1966, title: 'England\'s Homecoming', description: 'England wins their only World Cup, with Geoff Hurst\'s controversial goal and the trophy stolen before the final!' },
  { year: 1970, title: 'The Greatest Team', description: 'Brazil wins their third title with the most beautiful team ever - Pelé, Jairzinho, and Rivellino. The legendary yellow jersey is born.' },
  { year: 1982, title: 'Rossi\'s Hat-trick', description: 'Paolo Rossi scores a hat-trick against Brazil in the group stage, launching Italy to eventual victory.' },
  { year: 1986, title: 'Hand of God', description: 'Maradona scores two of the most famous goals ever - the "Hand of God" and the "Goal of the Century" - against England.' },
  { year: 1994, title: 'Roberto Baggio Misses', description: 'Brazil wins on penalties after Roberto Baggio shoots over the bar - one of football\'s most iconic moments.' },
  { year: 1998, title: 'Zidane\'s Double', description: 'Zinedine Zidane scores twice in the final as France wins their first World Cup on home soil.' },
  { year: 2002, title: 'Ronaldo\'s Return', description: 'Ronaldo scores 8 goals to win the Golden Boot, completing an incredible comeback after his 1998 collapse.' },
  { year: 2006, title: 'Zidane\'s Headbutt', description: 'Zinedine Zidane is sent off for headbutting Marco Materazzi in the final. France loses to Italy.' },
  { year: 2010, title: 'Spain\'s Tiki-Taka', description: 'Spain wins their first World Cup with dominant possession football, Iniesta scoring the winner in extra time.' },
  { year: 2014, title: 'Germany 7-1 Brazil', description: 'Germany destroys Brazil 7-1 in the semi-finals in Belo Horizonte. The biggest World Cup defeat in history.' },
  { year: 2018, title: 'VAR Debut', description: 'The Video Assistant Referee (VAR) makes its World Cup debut, changing many match outcomes.' },
  { year: 2022, title: 'Messi\'s Glory', description: 'Lionel Messi finally wins the World Cup in his fifth attempt, defeating France in the greatest final ever.' },
];

export const tournamentStats = [
  { label: 'Total Tournaments', value: '22', note: '1930-2022' },
  { label: 'Total Matches', value: '900+', note: 'All time' },
  { label: 'Total Goals', value: '2,500+', note: 'Average 2.7 per game' },
  { label: 'Most Common Score', value: '1-0', note: 'Over 200 times' },
  { label: 'Teams Participated', value: '80+', note: 'Different nations' },
  { label: 'Total Attendance', value: '50M+', note: 'All time' },
];

export const topScorers = [
  { rank: 1, player: 'Miroslav Klose', country: 'Germany', goals: 16, years: '2002-2014' },
  { rank: 2, player: 'Ronaldo', country: 'Brazil', goals: 15, years: '1998-2006' },
  { rank: 3, player: 'Gerd Müller', country: 'West Germany', goals: 14, years: '1970-1974' },
  { rank: 4, player: 'Just Fontaine', country: 'France', goals: 13, years: '1958' },
  { rank: 5, player: 'Lionel Messi', country: 'Argentina', goals: 13, years: '2006-2022' },
  { rank: 6, player: 'Kylian Mbappé', country: 'France', goals: 12, years: '2018-2022' },
  { rank: 7, player: 'Pelé', country: 'Brazil', goals: 12, years: '1958-1970' },
  { rank: 8, player: 'Jürgen Klinsmann', country: 'Germany', goals: 11, years: '1990-1998' },
  { rank: 9, player: 'Helmut Rahn', country: 'West Germany', goals: 10, years: '1954-1958' },
  { rank: 10, player: 'Gabriel Batistuta', country: 'Argentina', goals: 10, years: '1994-2002' },
  { rank: 11, player: 'Grzegorz Lato', country: 'Poland', goals: 10, years: '1974-1982' },
  { rank: 12, player: 'Tim Cahill', country: 'Australia', goals: 10, years: '2006-2022' },
];

export const hostCountries = [
  { year: 2026, host: 'USA/Canada/Mexico', teams: 48, matches: 104 },
  { year: 2022, host: 'Qatar', teams: 32, matches: 64 },
  { year: 2018, host: 'Russia', teams: 32, matches: 64 },
  { year: 2014, host: 'Brazil', teams: 32, matches: 64 },
  { year: 2010, host: 'South Africa', teams: 32, matches: 64 },
  { year: 2006, host: 'Germany', teams: 32, matches: 64 },
  { year: 2002, host: 'Japan/South Korea', teams: 32, matches: 64 },
  { year: 1998, host: 'France', teams: 32, matches: 64 },
  { year: 1994, host: 'USA', teams: 24, matches: 52 },
  { year: 1990, host: 'Italy', teams: 24, matches: 52 },
  { year: 1986, host: 'Mexico', teams: 24, matches: 52 },
  { year: 1982, host: 'Spain', teams: 24, matches: 52 },
  { year: 1978, host: 'Argentina', teams: 16, matches: 38 },
  { year: 1974, host: 'West Germany', teams: 16, matches: 38 },
  { year: 1970, host: 'Mexico', teams: 16, matches: 32 },
  { year: 1966, host: 'England', teams: 16, matches: 32 },
  { year: 1962, host: 'Chile', teams: 16, matches: 32 },
  { year: 1958, host: 'Sweden', teams: 16, matches: 35 },
  { year: 1954, host: 'Switzerland', teams: 16, matches: 26 },
  { year: 1950, host: 'Brazil', teams: 13, matches: 22 },
  { year: 1938, host: 'France', teams: 15, matches: 18 },
  { year: 1934, host: 'Italy', teams: 16, matches: 17 },
  { year: 1930, host: 'Uruguay', teams: 13, matches: 18 },
];

export const funFacts: FunFact[] = [
  { 
    id: 1, 
    title: 'Trophy Stolen by a Dog!', 
    description: 'In 1966, just months before the World Cup in England, the Jules Rimet trophy was stolen from a display. It was later found by a dog called Pickles during a walk with its owner.',
    icon: '🐕'
  },
  { 
    id: 2, 
    title: 'Bigger Than the Super Bowl', 
    description: 'About 715 million people watched the 2006 World Cup final - that\'s more than 4x the Super Bowl audience! The World Cup is the most-watched sporting event on Earth.',
    icon: '📺'
  },
  { 
    id: 3, 
    title: 'No Shoes, No World Cup', 
    description: 'India qualified for the 1950 World Cup but withdrew because FIFA required players to wear shoes - India traditionally played barefoot!',
    icon: '🦶'
  },
  { 
    id: 4, 
    title: 'The 31-0 Game', 
    description: 'Australia beat American Samoa 31-0 in 2001 - the biggest margin of victory in international football history!',
    icon: '⚽'
  },
  { 
    id: 5, 
    title: 'Fastest Goal Ever', 
    description: 'Turkey\'s Hakan Şükür scored just 11 seconds into the match against South Korea in 2002 - the fastest goal in World Cup history!',
    icon: '⚡'
  },
  { 
    id: 6, 
    title: 'Only 8 Countries Have Won', 
    description: 'Despite over 200 countries participating in qualifiers, only 8 nations have ever won the World Cup: Brazil, Germany, Italy, Argentina, France, Uruguay, England, and Spain.',
    icon: '🏅'
  },
  { 
    id: 7, 
    title: 'World Cup Missed Two Tournaments', 
    description: 'No World Cup was held in 1942 or 1946 due to World War II. The tournament resumed in 1950.',
    icon: '✌️'
  },
  { 
    id: 8, 
    title: 'The One-Minute Champion', 
    description: 'Argentine Marcelo Trobbiani played only ONE MINUTE in the 1986 World Cup final as a substitute - but he\'s still a World Cup winner!',
    icon: '⏱️'
  },
  { 
    id: 9, 
    title: 'Scored 13 Goals in One Tournament', 
    description: 'Just Fontaine (France, 1958) scored 13 goals in a single World Cup - a record that will never be broken as teams now play fewer matches.',
    icon: '🎯'
  },
  { 
    id: 10, 
    title: 'Oldest & Youngest Winners', 
    description: 'Dino Zoff (Italy, 1982) was 40 years old when he won - the oldest champion. Pelé was just 17 when he won in 1958 - the youngest!',
    icon: '👴👶'
  },
  { 
    id: 11, 
    title: 'Two Trophies Stolen', 
    description: 'The original Jules Rimet trophy was stolen TWICE - once in 1966 (found by Pickles) and again in 1983 in Brazil (never found, probably melted down).',
    icon: '🏆'
  },
  { 
    id: 12, 
    title: 'First Indoor Match', 
    description: 'The first ever indoor World Cup match was played in the Pontiac Silverdome during the 1994 USA World Cup.',
    icon: '🏟️'
  },
  { 
    id: 13, 
    title: 'The 10-1 Disaster', 
    description: 'El Salvador holds the record for the heaviest World Cup defeat - 10-1 to Hungary in 1982. They also lost 6-1 to Hungary and 5-0 to Belgium in the same tournament!',
    icon: '😱'
  },
  { 
    id: 14, 
    title: 'Only 7 Minutes for Hat-trick', 
    description: 'Hungary\'s László Kiss scored the fastest hat-trick ever - just 7 minutes and 42 seconds against El Salvador in 1982.',
    icon: '🧤'
  },
  { 
    id: 15, 
    title: 'Red Card After 56 Seconds', 
    description: 'Uruguay\'s José Batista received the fastest red card in World Cup history - just 56 seconds into the match against Scotland in 1986!',
    icon: '🟥'
  },
  { 
    id: 16, 
    title: 'Brazil: The Only Constant', 
    description: 'Brazil is the ONLY country to have played in EVERY World Cup since 1930 - 22 tournaments in a row!',
    icon: '🇧🇷'
  },
  { 
    id: 17, 
    title: '1994: Diana Ross Missed Penalty', 
    description: 'At the 1994 opening ceremony in Chicago, singer Diana Ross took a penalty kick - and missed!',
    icon: '🎤'
  },
  { 
    id: 18, 
    title: 'Goalkeeper Scored!', 
    description: 'Colombia\'s René Higuita (the famous scorpion keeper) is one of the few goalkeepers to score at a World Cup.',
    icon: '🕷️'
  },
  { 
    id: 19, 
    title: 'Most Goals in One Match', 
    description: 'Oleg Salenko (Russia, 1994) scored 5 goals in ONE match against Cameroon - the only goalkeeper to share the Golden Boot!',
    icon: '🖐️'
  },
  { 
    id: 20, 
    title: 'The 28 Red Cards Tournament', 
    description: 'The 2006 World Cup in Germany had 28 red cards - the most ever in a single tournament!',
    icon: '🟥'
  },
  { 
    id: 21, 
    title: 'Ronaldo: Five Different World Cups', 
    description: 'Cristiano Ronaldo became the first player to score at FIVE different World Cups (2006, 2010, 2014, 2018, 2022).',
    icon: '⭐'
  },
  { 
    id: 22, 
    title: 'Attendance Record: 199,854!', 
    description: 'The 1950 final at Maracanã had an incredible 199,854 spectators - the largest crowd in World Cup history!',
    icon: '👥'
  },
  { 
    id: 23, 
    title: 'Qatar Built a Demountable Stadium!', 
    description: 'For the 2022 World Cup, Qatar built Stadium 974 - the first fully demountable World Cup stadium, made from shipping containers.',
    icon: '📦'
  },
  { 
    id: 24, 
    title: 'First Goalkeeper to Score', 
    description: 'In 1962, Colombia\'s keeper Ricardo Abello scored against the USSR - but it was disallowed! The first official goalkeeper goal came later.',
    icon: '🧤'
  },
  { 
    id: 25, 
    title: '3 Countries, 2 Continents in 2026', 
    description: 'The 2026 World Cup will be the FIRST hosted by 3 countries, spanning 2 continents (North America). 48 teams will play 104 matches!',
    icon: '🌎'
  },
];
