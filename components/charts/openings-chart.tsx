"use client"

import { useEffect, useState } from "react"
import { BarChart } from "./bar-chart"

interface OpeningData {
  name: string
  count: number
}

export function OpeningsChart() {
  const [data, setData] = useState<OpeningData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/analytics")
        const result = await response.json()
        setData(result.popular_openings.slice(0, 8))
      } catch (error) {
        console.error("[v0] Error fetching openings data:", error)
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

  return <BarChart data={data} height={300} color="#10b981" />
}
