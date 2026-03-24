import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Match } from "../data/matches";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY not set - AI itinerary will not work");
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface DayPlan {
  day: number;
  date: string;
  city: string;
  activities: string[];
  matches: string[];
  transport?: string;
}

export interface Itinerary {
  days: DayPlan[];
}

export async function generateItinerary(
  route: { name: string; cities: string[] },
  startDate: string,
  endDate: string,
  preferences: string,
  matches: Match[]
): Promise<Itinerary> {
  if (!genAI) {
    throw new Error("Gemini API key not configured. Set VITE_GEMINI_API_KEY in your .env file.");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

  const matchesByCity = route.cities.map((city) => {
    const cityMatches = matches.filter((m) => m.city === city);
    return { city, matches: cityMatches.map((m) => `${m.homeTeam} vs ${m.awayTeam} on ${m.date}`) };
  });

  const isTeamRoute = route.name !== 'South-Central Powerhouse' && 
                      route.name !== 'Northeast Corridor' && 
                      route.name !== 'Mexico Fiesta' && 
                      route.name !== 'California Dream' && 
                      route.name !== 'Pacific Northwest' && 
                      route.name !== 'Southeast Sun';
  
  const prompt = `
You are a World Cup 2026 travel expert. Create a realistic day-by-day itinerary.

${isTeamRoute ? `IMPORTANT: You are planning a trip to follow ${route.name}. You MUST include ALL ${route.name} matches listed below in the matches array for the appropriate day.` : 'Route cities: ' + route.cities.join(", ")}
Travel dates: ${startDate} to ${endDate}
${!isTeamRoute ? `Preferences: ${preferences}` : ''}

${isTeamRoute ? 'IMPORTANT MATCHES TO INCLUDE:' : 'Matches by city:'}
${matchesByCity.map((c) => `${c.city}: ${c.matches.join("; ")}`).join(" | ")}

Output EXACT JSON - no markdown, no other text. Format:
{"days":[{"day":1,"date":"2026-06-13","city":"New York","activities":["activity with link: [Name](URL)","activity without link"],"matches":["match info"],"transport":null}]}

Rules:
- MUST stay in each city for consecutive days
- NEVER return to a city once you've left it
- Only visit each city once
- ${isTeamRoute ? 'MUST include all ' + route.name + ' matches listed above' : 'Prioritize watching matches with strong teams when possible'}
- Minimize total travel distance to save time and money
- transport: null if same city, string if moving to new city
- activities: 2-3 strings
- matches: array of match strings or empty (MUST include ${route.name} matches if available on that day)
- IMPORTANT: When recommending tourist attractions, include a Google search link format: "[Attraction Name](https://www.google.com/search?q=Attraction+Name+city)"
- Only output valid JSON, start with { and end with }
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error("Failed to parse itinerary response");
}