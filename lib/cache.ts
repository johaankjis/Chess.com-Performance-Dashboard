// Simple in-memory cache implementation

import type { CacheEntry } from "./types"

class Cache {
  private store: Map<string, CacheEntry<any>> = new Map()

  set<T>(key: string, data: T, ttl = 300000): void {
    // Default TTL: 5 minutes
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)

    if (!entry) {
      return null
    }

    // Check if cache entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key)
      return null
    }

    return entry.data as T
  }

  has(key: string): boolean {
    const entry = this.store.get(key)

    if (!entry) {
      return false
    }

    // Check if cache entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key)
      return false
    }

    return true
  }

  clear(): void {
    this.store.clear()
  }

  delete(key: string): void {
    this.store.delete(key)
  }

  size(): number {
    return this.store.size
  }
}

export const cache = new Cache()
