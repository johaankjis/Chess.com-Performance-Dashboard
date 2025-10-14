"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DataPoint {
  timestamp: string
  rating: number
}

interface LineChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  color?: string
}

export function LineChart({ data, width = 600, height = 300, color = "#3b82f6" }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 30, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Parse dates
    const parseDate = d3.isoParse
    const parsedData = data.map((d) => ({
      date: parseDate(d.timestamp)!,
      value: d.rating,
    }))

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
      .range([0, innerWidth])

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(parsedData, (d) => d.value)! - 50, d3.max(parsedData, (d) => d.value)! + 50])
      .range([innerHeight, 0])

    // Line generator
    const line = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    // Add gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale(d3.max(parsedData, (d) => d.value)!))
      .attr("x2", 0)
      .attr("y2", yScale(d3.min(parsedData, (d) => d.value)!))

    gradient.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 0.8)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.2)

    // Add area under line
    const area = d3
      .area<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.value))
      .curve(d3.curveMonotoneX)

    svg.append("path").datum(parsedData).attr("fill", "url(#line-gradient)").attr("opacity", 0.3).attr("d", area)

    // Add line
    svg
      .append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add dots
    svg
      .selectAll("circle")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 3)
      .attr("fill", color)
      .attr("opacity", 0.6)

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(6)
    const yAxis = d3.axisLeft(yScale).ticks(6)

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("color", "#737373")
      .selectAll("text")
      .attr("fill", "#737373")

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

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("opacity", 0.1)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6)
          .tickSize(-innerHeight)
          .tickFormat(() => ""),
      )
  }, [data, width, height, color])

  return <svg ref={svgRef} className="w-full" />
}
