import { TrendingDown } from "lucide-react"
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

export default function BottomAgency({ data }: AgencyPerformanceChartProps) {
  console.log("BottomAgency received data:", data)

  const chartConfig = {
    averageQ5: {
      label: "Scor Mediu Q5",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>7 Agenții cu Potențial de Îmbunătățire în Rezolvarea Solicitărilor</CardTitle>
        <CardDescription>
          Agenții cu cel mai scăzut scor mediu pentru rezolvarea completă a situațiilor clienților
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="agency" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="averageQ5" fill="var(--color-averageQ5)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => value.toFixed(2)} // Format to 2 decimals
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Oportunități de îmbunătățire a rezolvării solicitărilor <TrendingDown className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Acest grafic evidențiază agențiile cu cele mai mici scoruri medii pentru Q5, indicând zonele unde rezolvarea
          completă a situațiilor clienților poate fi îmbunătățită.
        </div>
      </CardFooter>
    </Card>
  )
}
