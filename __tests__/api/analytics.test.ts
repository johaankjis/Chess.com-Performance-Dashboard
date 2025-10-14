import { GET } from "@/app/api/analytics/route"

describe("/api/analytics", () => {
  it("should return analytics data", async () => {
    const request = new Request("http://localhost:3000/api/analytics")
    const response = await GET(request)
    const data = await response.json()

    expect(data).toHaveProperty("total_matches")
    expect(data).toHaveProperty("avg_duration")
    expect(data).toHaveProperty("result_distribution")
    expect(data).toHaveProperty("popular_openings")
    expect(data).toHaveProperty("rating_trends")
  })

  it("should have valid result distribution", async () => {
    const request = new Request("http://localhost:3000/api/analytics")
    const response = await GET(request)
    const data = await response.json()

    expect(data.result_distribution).toHaveProperty("white")
    expect(data.result_distribution).toHaveProperty("black")
    expect(data.result_distribution).toHaveProperty("draw")

    const total = data.result_distribution.white + data.result_distribution.black + data.result_distribution.draw
    expect(total).toBe(data.total_matches)
  })

  it("should return popular openings sorted by count", async () => {
    const request = new Request("http://localhost:3000/api/analytics")
    const response = await GET(request)
    const data = await response.json()

    expect(Array.isArray(data.popular_openings)).toBe(true)
    expect(data.popular_openings.length).toBeGreaterThan(0)

    // Check if sorted in descending order
    for (let i = 1; i < data.popular_openings.length; i++) {
      expect(data.popular_openings[i - 1].count).toBeGreaterThanOrEqual(data.popular_openings[i].count)
    }
  })

  it("should return rating trends data", async () => {
    const request = new Request("http://localhost:3000/api/analytics")
    const response = await GET(request)
    const data = await response.json()

    expect(Array.isArray(data.rating_trends)).toBe(true)
    expect(data.rating_trends.length).toBeGreaterThan(0)

    data.rating_trends.forEach((point: any) => {
      expect(point).toHaveProperty("timestamp")
      expect(point).toHaveProperty("rating")
    })
  })
})
