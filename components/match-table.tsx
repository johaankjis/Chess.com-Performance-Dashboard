"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { ChessMatch } from "@/lib/types"

export function MatchTable() {
  const [matches, setMatches] = useState<ChessMatch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch("/api/matches?limit=10")
        const result = await response.json()
        setMatches(result.matches)
      } catch (error) {
        console.error("[v0] Error fetching matches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>White</TableHead>
          <TableHead>Black</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Opening</TableHead>
          <TableHead>Moves</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow key={match.match_id}>
            <TableCell className="font-medium">
              {match.player_white}
              <span className="ml-2 text-xs text-muted-foreground">({match.white_rating})</span>
            </TableCell>
            <TableCell className="font-medium">
              {match.player_black}
              <span className="ml-2 text-xs text-muted-foreground">({match.black_rating})</span>
            </TableCell>
            <TableCell>
              <Badge
                variant={match.result === "white" ? "default" : match.result === "black" ? "secondary" : "outline"}
              >
                {match.result === "white" ? "1-0" : match.result === "black" ? "0-1" : "½-½"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">{match.opening}</TableCell>
            <TableCell>{match.moves}</TableCell>
            <TableCell>
              {Math.floor(match.duration / 60)}m {match.duration % 60}s
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
