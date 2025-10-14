import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayerTable } from "@/components/player-table"

export default function PlayersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Players" description="Player statistics and rankings" />

        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Player Leaderboard</CardTitle>
              <CardDescription>Top players by rating and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PlayerTable />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
