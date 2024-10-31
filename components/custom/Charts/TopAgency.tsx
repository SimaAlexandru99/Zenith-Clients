import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"

interface AgencyData {
  agency: string
  averageQ5: number
}

interface AgencyPerformanceChartProps {
  data: AgencyData[]
}

export default function TopAgency({ data }: AgencyPerformanceChartProps) {

  const chartConfig = {
    averageQ5: {
      label: "Scor Mediu Q5",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 7 Agenții cu Cea Mai Bună Rezolvare a Solicitărilor</CardTitle>
        <CardDescription>
          Agenții cu cel mai ridicat scor mediu pentru rezolvarea completă a situațiilor clienților
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="agency" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="averageQ5" fill="var(--color-averageQ5)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Eficiență maximă în rezolvarea solicitărilor <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Acest grafic prezintă agențiile cu cele mai mari scoruri medii pentru Q5, indicând o rată ridicată de
          rezolvare completă a situațiilor clienților.
        </div>
      </CardFooter>
    </Card>
  )
}
