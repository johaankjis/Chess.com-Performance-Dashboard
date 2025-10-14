import { generateMockMatch, generateMockMatches, generateMockPlayerStats, generateRatingHistory } from "@/lib/mock-data"

describe("Mock Data Generators", () => {
  describe("generateMockMatch", () => {
    it("should generate a valid chess match", () => {
      const match = generateMockMatch()

      expect(match).toHaveProperty("match_id")
      expect(match).toHaveProperty("player_white")
      expect(match).toHaveProperty("player_black")
      expect(match).toHaveProperty("result")
      expect(match).toHaveProperty("duration")
      expect(match).toHaveProperty("moves")
      expect(match).toHaveProperty("timestamp")
      expect(match).toHaveProperty("white_rating")
      expect(match).toHaveProperty("black_rating")
      expect(match).toHaveProperty("time_control")
      expect(match).toHaveProperty("opening")

      expect(["white", "black", "draw"]).toContain(match.result)
      expect(match.duration).toBeGreaterThanOrEqual(300)
      expect(match.duration).toBeLessThanOrEqual(3600)
      expect(match.moves).toBeGreaterThanOrEqual(20)
      expect(match.moves).toBeLessThanOrEqual(80)
    })

    it("should generate unique match IDs", () => {
      const match1 = generateMockMatch()
      const match2 = generateMockMatch()

      expect(match1.match_id).not.toBe(match2.match_id)
    })
  })

  describe("generateMockMatches", () => {
    it("should generate the correct number of matches", () => {
      const matches = generateMockMatches(50)
      expect(matches).toHaveLength(50)
    })

    it("should generate an array of valid matches", () => {
      const matches = generateMockMatches(10)

      matches.forEach((match) => {
        expect(match).toHaveProperty("match_id")
        expect(match).toHaveProperty("player_white")
        expect(match).toHaveProperty("player_black")
      })
    })
  })

  describe("generateRatingHistory", () => {
    it("should generate the correct number of rating points", () => {
      const history = generateRatingHistory(2000, 12)
      expect(history).toHaveLength(12)
    })

    it("should have timestamps in ascending order", () => {
      const history = generateRatingHistory(2000, 10)

      for (let i = 1; i < history.length; i++) {
        const prevTime = new Date(history[i - 1].timestamp).getTime()
        const currTime = new Date(history[i].timestamp).getTime()
        expect(currTime).toBeGreaterThanOrEqual(prevTime)
      }
    })

    it("should keep ratings within reasonable bounds", () => {
      const history = generateRatingHistory(2000, 20)

      history.forEach((point) => {
        expect(point.rating).toBeGreaterThanOrEqual(1000)
        expect(point.rating).toBeLessThanOrEqual(3000)
      })
    })
  })

  describe("generateMockPlayerStats", () => {
    it("should generate valid player statistics", () => {
      const stats = generateMockPlayerStats("TestPlayer")

      expect(stats.username).toBe("TestPlayer")
      expect(stats).toHaveProperty("player_id")
      expect(stats).toHaveProperty("rating")
      expect(stats).toHaveProperty("win_rate")
      expect(stats).toHaveProperty("avg_move_time")
      expect(stats).toHaveProperty("most_common_openings")
      expect(stats).toHaveProperty("total_games")
      expect(stats).toHaveProperty("wins")
      expect(stats).toHaveProperty("losses")
      expect(stats).toHaveProperty("draws")
      expect(stats).toHaveProperty("rating_history")

      expect(stats.total_games).toBe(stats.wins + stats.losses + stats.draws)
      expect(stats.rating_history).toHaveLength(12)
    })

    it("should calculate win rate correctly", () => {
      const stats = generateMockPlayerStats("TestPlayer")
      const expectedWinRate = (stats.wins / stats.total_games) * 100

      expect(stats.win_rate).toBeCloseTo(expectedWinRate, 2)
    })
  })
})
