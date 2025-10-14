"use client"

import { useEffect, useState } from "react"
import { LineChart } from "./line-chart"
import type { RatingPoint } from "@/lib/types"

export function RatingChart() {
  const [data, setData] = useState<RatingPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/analytics")
        const result = await response.json()
        setData(result.rating_trends)
      } catch (error) {
        console.error("[v0] Error fetching rating trends:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return <LineChart data={data} height={300} color="#3b82f6" />
}
