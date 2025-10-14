import { NextResponse } from "next/server"
import { MOCK_PLAYERS } from "@/lib/mock-data"
import { cache } from "@/lib/cache"

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const cacheKey = `player_${username}`

  // Check cache first
  const cached = cache.get(cacheKey)
  if (cached) {
    return NextResponse.json(cached)
  }

  const player = MOCK_PLAYERS.find((p) => p.username === username)

  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 })
  }

  // Cache the response
  cache.set(cacheKey, player)

  return NextResponse.json(player)
}
