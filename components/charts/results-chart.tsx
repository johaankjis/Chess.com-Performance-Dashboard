"use client"

import { useEffect, useState } from "react"
import { PieChart } from "./pie-chart"

interface ResultData {
  label: string
  value: number
}

export function ResultsChart() {
  const [data, setData] = useState<ResultData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/analytics")
        const result = await response.json()
        const distribution = result.result_distribution

        setData([
          { label: "White Wins", value: distribution.white },
          { label: "Black Wins", value: distribution.black },
          { label: "Draws", value: distribution.draw },
        ])
      } catch (error) {
        console.error("[v0] Error fetching results data:", error)
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

  return <PieChart data={data} height={300} colors={["#3b82f6", "#f59e0b", "#10b981"]} />
}
