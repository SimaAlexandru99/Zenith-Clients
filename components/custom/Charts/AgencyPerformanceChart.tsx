import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"

interface AgencyData {
  agency: string // This is the agency code
  averageQ5: number
}

interface AgencyPerformanceChartProps {
  data: AgencyData[]
}

export default function AgencyPerformanceChart({ data }: AgencyPerformanceChartProps) {
  const chartConfig = {
    averageQ5: {
      label: "Scor Mediu Q5",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performanța celor 7 Agenții din Top</CardTitle>
        <CardDescription>Scorul Mediu Q5 pentru cele 7 agenții de top</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="agency" // `agency` is now treated as a string
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="averageQ5" fill="var(--color-averageQ5)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Performanța în creștere <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">Afișează scorul mediu Q5 pentru cele 7 agenții de top.</div>
      </CardFooter>
    </Card>
  )
}
