"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { PlayerStats } from "@/lib/types"

export function PlayerTable() {
  const [players, setPlayers] = useState<PlayerStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/players")
        const result = await response.json()
        // Sort by rating descending
        const sortedPlayers = result.players.sort((a: PlayerStats, b: PlayerStats) => b.rating - a.rating)
        setPlayers(sortedPlayers)
      } catch (error) {
        console.error("[v0] Error fetching players:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Games</TableHead>
          <TableHead>Win Rate</TableHead>
          <TableHead>W/L/D</TableHead>
          <TableHead>Avg Move Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => (
          <TableRow key={player.player_id}>
            <TableCell className="font-bold">#{index + 1}</TableCell>
            <TableCell className="font-medium">{player.username}</TableCell>
            <TableCell>
              <Badge variant="outline" className="font-mono">
                {player.rating}
              </Badge>
            </TableCell>
            <TableCell>{player.total_games.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  player.win_rate >= 50
                    ? "font-semibold text-green-500"
                    : player.win_rate >= 40
                      ? "font-semibold text-yellow-500"
                      : "font-semibold text-red-500"
                }
              >
                {player.win_rate.toFixed(1)}%
              </span>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {player.wins}/{player.losses}/{player.draws}
            </TableCell>
            <TableCell>{player.avg_move_time}s</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
