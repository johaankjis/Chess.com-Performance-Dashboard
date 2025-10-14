import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OpeningsChart } from "@/components/charts/openings-chart"
import { RatingChart } from "@/components/charts/rating-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Analytics" description="Deep dive into performance metrics" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Opening Performance</CardTitle>
                <CardDescription>Most popular chess openings by frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <OpeningsChart />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Progression</CardTitle>
                  <CardDescription>Average rating over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <RatingChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Management</CardTitle>
                  <CardDescription>Average move time distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                    Additional visualization coming soon
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
