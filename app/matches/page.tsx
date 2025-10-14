import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MatchTable } from "@/components/match-table"

export default function MatchesPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Matches" description="Browse and analyze match history" />

        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Match History</CardTitle>
              <CardDescription>Complete record of all games</CardDescription>
            </CardHeader>
            <CardContent>
              <MatchTable />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
