import { NextResponse } from "next/server"
import { MOCK_MATCHES } from "@/lib/mock-data"
import { cache } from "@/lib/cache"
import type { MatchAnalytics } from "@/lib/types"

export async function GET() {
  const cacheKey = "analytics_overview"

  // Check cache first
  const cached = cache.get<MatchAnalytics>(cacheKey)
  if (cached) {
    return NextResponse.json(cached)
  }

  // Calculate analytics
  const totalMatches = MOCK_MATCHES.length
  const avgDuration = MOCK_MATCHES.reduce((sum, m) => sum + m.duration, 0) / totalMatches

  // Result distribution
  const resultCounts = MOCK_MATCHES.reduce(
    (acc, match) => {
      acc[match.result]++
      return acc
    },
    { white: 0, black: 0, draw: 0 },
  )

  // Popular openings
  const openingCounts = MOCK_MATCHES.reduce(
    (acc, match) => {
      acc[match.opening] = (acc[match.opening] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const popularOpenings = Object.entries(openingCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Rating trends (aggregate from recent matches)
  const recentMatches = [...MOCK_MATCHES]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-50)

  const ratingTrends = recentMatches.map((m) => ({
    timestamp: m.timestamp,
    rating: (m.white_rating + m.black_rating) / 2,
  }))

  const analytics: MatchAnalytics = {
    total_matches: totalMatches,
    avg_duration: Math.round(avgDuration),
    result_distribution: resultCounts,
    popular_openings: popularOpenings,
    rating_trends: ratingTrends,
  }

  // Cache the response
  cache.set(cacheKey, analytics, 600000) // 10 minutes TTL

  return NextResponse.json(analytics)
}
