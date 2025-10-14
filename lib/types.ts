// Type definitions for Chess.com Performance Dashboard

export interface ChessMatch {
  match_id: string
  player_white: string
  player_black: string
  result: "white" | "black" | "draw"
  duration: number // in seconds
  moves: number
  timestamp: string
  white_rating: number
  black_rating: number
  time_control: string
  opening: string
}

export interface PlayerStats {
  player_id: string
  username: string
  rating: number
  win_rate: number
  avg_move_time: number
  most_common_openings: string[]
  total_games: number
  wins: number
  losses: number
  draws: number
  rating_history: RatingPoint[]
}

export interface RatingPoint {
  timestamp: string
  rating: number
}

export interface MatchAnalytics {
  total_matches: number
  avg_duration: number
  result_distribution: {
    white: number
    black: number
    draw: number
  }
  popular_openings: { name: string; count: number }[]
  rating_trends: RatingPoint[]
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}
