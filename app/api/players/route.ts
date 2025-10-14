import { NextResponse } from "next/server"
import { MOCK_PLAYERS } from "@/lib/mock-data"
import { cache } from "@/lib/cache"

export async function GET() {
  const cacheKey = "all_players"

  // Check cache first
  const cached = cache.get(cacheKey)
  if (cached) {
    return NextResponse.json(cached)
  }

  const response = {
    players: MOCK_PLAYERS,
    total: MOCK_PLAYERS.length,
  }

  // Cache the response
  cache.set(cacheKey, response)

  return NextResponse.json(response)
}
