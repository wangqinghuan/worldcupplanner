/**
 * FIFA World Cup 2026 Data Fetcher Test Script
 * This script tests the connectivity and data structure of a soccer API.
 */

async function testFetchMatches() {
  console.log("--- Starting World Cup 2026 API Test ---");
  
  // We'll use a reliable public endpoint for testing. 
  // In a real scenario, this would be https://api.balldontlie.io/v1/fifa/matches?season=2026
  // For this test, I will simulate the actual response structure to verify our processing logic.
  
  const MOCK_API_URL = "https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026/matches.json";

  try {
    console.log(`Fetching data from: ${MOCK_API_URL}...`);
    
    // Note: Some public football data repos use specific structures.
    // If the URL above is not yet populated for 2026, we check another common open source source.
    const response = await fetch(MOCK_API_URL);
    
    if (!response.ok) {
      console.warn(`Initial fetch failed (Status: ${response.status}). The 2026 repo might be private or empty yet.`);
      console.log("Switching to manual structure validation mode...");
      printSampleStructure();
      return;
    }

    const data = await response.json();
    console.log("Successfully connected! Data received.");
    
    // Processing the first 3 matches
    const samples = data.matches ? data.matches.slice(0, 3) : [];
    
    if (samples.length === 0) {
      console.log("No match data found in the response (Season might be pending).");
    } else {
      console.log("Sample Data Structure:");
      samples.forEach((m, i) => {
        console.log(`[Match ${i+1}] ${m.num}: ${m.team1} vs ${m.team2} at ${m.venue}`);
      });
    }

  } catch (error) {
    console.error("API Connection Error:", error.message);
    console.log("\nProposing Action: Use a dedicated Sports API like API-Football or BALLDONTLIE with a developer key.");
  }
}

function printSampleStructure() {
  console.log("\n--- Ideal Data Structure for 2026 Integration ---");
  const idealMatch = {
    id: 1,
    match_number: 1,
    start_time: "2026-06-11T13:00:00-05:00",
    home_team: { name: "Mexico", id: 101 },
    away_team: { name: "South Africa", id: 202 },
    venue: { name: "Estadio Azteca", city: "Mexico City" },
    status: "scheduled",
    prices: { cat1: 1020, cat2: 750, cat3: 450 } // We will scrape this part
  };
  console.log(JSON.stringify(idealMatch, null, 2));
}

testFetchMatches();
