import { GET } from "@/app/api/matches/route"
import { MOCK_MATCHES } from "@/lib/mock-data"

describe("/api/matches", () => {
  it("should return paginated matches", async () => {
    const request = new Request("http://localhost:3000/api/matches?limit=10&offset=0")
    const response = await GET(request)
    const data = await response.json()

    expect(data).toHaveProperty("matches")
    expect(data).toHaveProperty("total")
    expect(data).toHaveProperty("limit")
    expect(data).toHaveProperty("offset")
    expect(data.matches).toHaveLength(10)
    expect(data.limit).toBe(10)
    expect(data.offset).toBe(0)
  })

  it("should filter matches by player", async () => {
    const playerName = MOCK_MATCHES[0].player_white
    const request = new Request(`http://localhost:3000/api/matches?player=${playerName}`)
    const response = await GET(request)
    const data = await response.json()

    expect(data.matches.length).toBeGreaterThan(0)
    data.matches.forEach((match: any) => {
      expect([match.player_white, match.player_black]).toContain(playerName)
    })
  })

  it("should handle pagination correctly", async () => {
    const request = new Request("http://localhost:3000/api/matches?limit=5&offset=5")
    const response = await GET(request)
    const data = await response.json()

    expect(data.matches).toHaveLength(5)
    expect(data.offset).toBe(5)
  })

  it("should return matches sorted by timestamp", async () => {
    const request = new Request("http://localhost:3000/api/matches?limit=20")
    const response = await GET(request)
    const data = await response.json()

    for (let i = 1; i < data.matches.length; i++) {
      const prevTime = new Date(data.matches[i - 1].timestamp).getTime()
      const currTime = new Date(data.matches[i].timestamp).getTime()
      expect(prevTime).toBeGreaterThanOrEqual(currTime)
    }
  })
})
