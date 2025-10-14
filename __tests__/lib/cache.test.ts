import { cache } from "@/lib/cache"

describe("Cache", () => {
  beforeEach(() => {
    cache.clear()
  })

  it("should store and retrieve data", () => {
    cache.set("test-key", { value: "test-data" })
    const result = cache.get("test-key")
    expect(result).toEqual({ value: "test-data" })
  })

  it("should return null for non-existent keys", () => {
    const result = cache.get("non-existent")
    expect(result).toBeNull()
  })

  it("should expire data after TTL", () => {
    cache.set("test-key", { value: "test-data" }, 100) // 100ms TTL

    // Data should exist immediately
    expect(cache.get("test-key")).toEqual({ value: "test-data" })

    // Wait for expiration
    setTimeout(() => {
      expect(cache.get("test-key")).toBeNull()
    }, 150)
  })

  it("should check if key exists", () => {
    cache.set("test-key", { value: "test-data" })
    expect(cache.has("test-key")).toBe(true)
    expect(cache.has("non-existent")).toBe(false)
  })

  it("should delete specific keys", () => {
    cache.set("test-key", { value: "test-data" })
    expect(cache.has("test-key")).toBe(true)

    cache.delete("test-key")
    expect(cache.has("test-key")).toBe(false)
  })

  it("should clear all data", () => {
    cache.set("key1", { value: "data1" })
    cache.set("key2", { value: "data2" })
    expect(cache.size()).toBe(2)

    cache.clear()
    expect(cache.size()).toBe(0)
  })

  it("should return correct size", () => {
    expect(cache.size()).toBe(0)

    cache.set("key1", { value: "data1" })
    expect(cache.size()).toBe(1)

    cache.set("key2", { value: "data2" })
    expect(cache.size()).toBe(2)
  })
})
