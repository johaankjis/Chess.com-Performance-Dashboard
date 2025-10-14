import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { Activity, TrendingUp, Users, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RatingChart } from "@/components/charts/rating-chart"
import { ResultsChart } from "@/components/charts/results-chart"
import { MatchTable } from "@/components/match-table"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Overview" description="Real-time chess performance analytics" />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Matches"
              value="100,000+"
              change="+12.5% from last month"
              changeType="positive"
              icon={Activity}
            />
            <StatCard title="Active Players" value="10" change="+2 new this week" changeType="positive" icon={Users} />
            <StatCard
              title="Avg Match Duration"
              value="18m 42s"
              change="-5% faster"
              changeType="positive"
              icon={Clock}
            />
            <StatCard
              title="Win Rate"
              value="48.2%"
              change="+2.1% improvement"
              changeType="positive"
              icon={TrendingUp}
            />
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Match Results</CardTitle>
                <CardDescription>Distribution of game outcomes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResultsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rating Trends</CardTitle>
                <CardDescription>Player rating progression</CardDescription>
              </CardHeader>
              <CardContent>
                <RatingChart />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Latest game results and statistics</CardDescription>
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
