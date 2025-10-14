"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface BarChartData {
  name: string
  count: number
}

interface BarChartProps {
  data: BarChartData[]
  width?: number
  height?: number
  color?: string
}

export function BarChart({ data, width = 600, height = 300, color = "#3b82f6" }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 80, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.2)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)!])
      .range([innerHeight, 0])

    // Add bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name)!)
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.count))
      .attr("fill", color)
      .attr("rx", 4)
      .attr("opacity", 0.8)
      .on("mouseenter", function () {
        d3.select(this).attr("opacity", 1)
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 0.8)
      })

    // Add value labels on bars
    svg
      .selectAll("text.value")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (d) => xScale(d.name)! + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.count) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#ededed")
      .attr("font-size", "12px")
      .text((d) => d.count.toLocaleString())

    // Add axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale).ticks(6)

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("color", "#737373")
      .selectAll("text")
      .attr("fill", "#737373")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")

    svg.append("g").call(yAxis).attr("color", "#737373").selectAll("text").attr("fill", "#737373")

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6)
          .tickSize(-innerWidth)
          .tickFormat(() => ""),
      )
  }, [data, width, height, color])

  return <svg ref={svgRef} className="w-full" />
}
