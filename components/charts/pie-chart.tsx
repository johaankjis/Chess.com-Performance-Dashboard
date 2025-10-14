"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface PieChartData {
  label: string
  value: number
}

interface PieChartProps {
  data: PieChartData[]
  width?: number
  height?: number
  colors?: string[]
}

export function PieChart({
  data,
  width = 400,
  height = 400,
  colors = ["#3b82f6", "#f59e0b", "#10b981"],
}: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const radius = Math.min(width, height) / 2 - 40

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    // Color scale
    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.label))
      .range(colors)

    // Pie generator
    const pie = d3
      .pie<PieChartData>()
      .value((d) => d.value)
      .sort(null)

    // Arc generator
    const arc = d3.arc<d3.PieArcDatum<PieChartData>>().innerRadius(0).outerRadius(radius)

    const arcHover = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(0)
      .outerRadius(radius + 10)

    // Draw slices
    const slices = svg.selectAll("path").data(pie(data)).enter().append("path")

    slices
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2)
      .style("opacity", 0.8)
      .on("mouseenter", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arcHover).style("opacity", 1)
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).transition().duration(200).attr("d", arc).style("opacity", 0.8)
      })

    // Add labels
    const labelArc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6)

    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ededed")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .text((d) => {
        const percentage = ((d.data.value / d3.sum(data, (d) => d.value)) * 100).toFixed(1)
        return `${percentage}%`
      })

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius + 20},${i * 25 - (data.length * 25) / 2})`)

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => color(d.label))
      .attr("rx", 3)

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("fill", "#ededed")
      .attr("font-size", "12px")
      .text((d) => `${d.label}: ${d.value.toLocaleString()}`)
  }, [data, width, height, colors])

  return <svg ref={svgRef} className="w-full" />
}
