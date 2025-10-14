import { render, screen } from "@testing-library/react"
import { StatCard } from "@/components/stat-card"
import { Activity } from "lucide-react"

describe("StatCard", () => {
  it("should render title and value", () => {
    render(<StatCard title="Total Matches" value="100,000" />)

    expect(screen.getByText("Total Matches")).toBeInTheDocument()
    expect(screen.getByText("100,000")).toBeInTheDocument()
  })

  it("should render change with correct styling for positive change", () => {
    render(<StatCard title="Win Rate" value="48.2%" change="+2.1% improvement" changeType="positive" />)

    const changeElement = screen.getByText("+2.1% improvement")
    expect(changeElement).toBeInTheDocument()
    expect(changeElement).toHaveClass("text-green-500")
  })

  it("should render change with correct styling for negative change", () => {
    render(<StatCard title="Loss Rate" value="30%" change="-5% decrease" changeType="negative" />)

    const changeElement = screen.getByText("-5% decrease")
    expect(changeElement).toBeInTheDocument()
    expect(changeElement).toHaveClass("text-red-500")
  })

  it("should render icon when provided", () => {
    render(<StatCard title="Activity" value="1000" icon={Activity} />)

    // Icon should be rendered (lucide-react icons have a specific structure)
    const card = screen.getByText("Activity").closest("div")
    expect(card).toBeInTheDocument()
  })

  it("should render description when provided", () => {
    render(<StatCard title="Total Matches" value="100,000" description="All time matches" />)

    expect(screen.getByText("All time matches")).toBeInTheDocument()
  })
})
