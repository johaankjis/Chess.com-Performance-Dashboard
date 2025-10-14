import { NextResponse } from "next/server"
import { MOCK_MATCHES } from "@/lib/mock-data"
import { cache } from "@/lib/cache"
import type { ChessMatch } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  const offset = Number.parseInt(searchParams.get("offset") || "0")
  const player = searchParams.get("player")

  const cacheKey = `matches_${limit}_${offset}_${player || "all"}`

  // Check cache first
  const cached = cache.get<{ matches: ChessMatch[]; total: number }>(cacheKey)
  if (cached) {
    return NextResponse.json(cached)
  }

  // Filter matches if player specified
  let filteredMatches = MOCK_MATCHES
  if (player) {
    filteredMatches = MOCK_MATCHES.filter((m) => m.player_white === player || m.player_black === player)
  }

  // Sort by timestamp (most recent first)
  const sortedMatches = [...filteredMatches].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  // Paginate
  const paginatedMatches = sortedMatches.slice(offset, offset + limit)

  const response = {
    matches: paginatedMatches,
    total: filteredMatches.length,
    limit,
    offset,
  }

  // Cache the response
  cache.set(cacheKey, response)

  return NextResponse.json(response)
}
