// Mock data generators for Chess.com API simulation

import type { ChessMatch, PlayerStats, RatingPoint } from "./types"

const OPENINGS = [
  "Sicilian Defense",
  "French Defense",
  "Caro-Kann Defense",
  "Queen's Gambit",
  "King's Indian Defense",
  "Ruy Lopez",
  "Italian Game",
  "English Opening",
  "Nimzo-Indian Defense",
  "Slav Defense",
]

const USERNAMES = [
  "GrandMaster2024",
  "ChessNinja",
  "PawnStorm",
  "KnightRider",
  "QueenSacrifice",
  "RookEndgame",
  "BishopPair",
  "CheckmateKing",
  "TacticalGenius",
  "PositionalPlayer",
]

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateMatchId(): string {
  return `match_${Date.now()}_${randomInt(1000, 9999)}`
}

export function generateMockMatch(): ChessMatch {
  const whiteRating = randomInt(1200, 2800)
  const blackRating = randomInt(1200, 2800)
  const results: Array<"white" | "black" | "draw"> = ["white", "black", "draw"]

  return {
    match_id: generateMatchId(),
    player_white: randomElement(USERNAMES),
    player_black: randomElement(USERNAMES),
    result: randomElement(results),
    duration: randomInt(300, 3600),
    moves: randomInt(20, 80),
    timestamp: new Date(Date.now() - randomInt(0, 30 * 24 * 60 * 60 * 1000)).toISOString(),
    white_rating: whiteRating,
    black_rating: blackRating,
    time_control: randomElement(["blitz", "rapid", "classical"]),
    opening: randomElement(OPENINGS),
  }
}

export function generateMockMatches(count: number): ChessMatch[] {
  return Array.from({ length: count }, () => generateMockMatch())
}

export function generateRatingHistory(baseRating: number, points: number): RatingPoint[] {
  const history: RatingPoint[] = []
  let currentRating = baseRating

  for (let i = points - 1; i >= 0; i--) {
    const daysAgo = i * 7 // Weekly data points
    const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()

    // Random walk for rating
    currentRating += randomInt(-50, 50)
    currentRating = Math.max(1000, Math.min(3000, currentRating))

    history.push({ timestamp, rating: currentRating })
  }

  return history.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export function generateMockPlayerStats(username: string): PlayerStats {
  const totalGames = randomInt(100, 1000)
  const wins = randomInt(Math.floor(totalGames * 0.3), Math.floor(totalGames * 0.6))
  const losses = randomInt(Math.floor(totalGames * 0.2), Math.floor(totalGames * 0.5))
  const draws = totalGames - wins - losses

  return {
    player_id: `player_${username.toLowerCase()}`,
    username,
    rating: randomInt(1500, 2500),
    win_rate: (wins / totalGames) * 100,
    avg_move_time: randomInt(5, 30),
    most_common_openings: [randomElement(OPENINGS), randomElement(OPENINGS), randomElement(OPENINGS)],
    total_games: totalGames,
    wins,
    losses,
    draws,
    rating_history: generateRatingHistory(randomInt(1500, 2500), 12),
  }
}

// Generate initial dataset
export const MOCK_MATCHES = generateMockMatches(100000)
export const MOCK_PLAYERS = USERNAMES.map((username) => generateMockPlayerStats(username))
