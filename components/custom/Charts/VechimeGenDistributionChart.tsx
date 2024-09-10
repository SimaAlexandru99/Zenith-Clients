"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"

interface VechimeGenData {
  vechimeGroup: string
  Masculin: number
  Feminin: number
}

interface VechimeGenDistributionChartProps {
  data: VechimeGenData[]
  dbName: string
}

const chartConfig = {
  Masculin: {
    label: "Bărbați",
    color: "hsl(210, 100%, 50%)", // Blue for men
  },
  Feminin: {
    label: "Femei",
    color: "hsl(350, 100%, 80%)", // Pink for women
  },
} satisfies ChartConfig

export function VechimeGenDistributionChart({ data, dbName }: VechimeGenDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuția Vechimii pe Gen</CardTitle>
        <CardDescription>
          {dbName}: Analiza distribuției apelurilor pe baza vechimii relației, împărțită pe gen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="vechimeGroup" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line dataKey="Masculin" type="monotone" stroke="var(--color-Masculin)" strokeWidth={2} dot={false} />
              <Line dataKey="Feminin" type="monotone" stroke="var(--color-Feminin)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {`Comparativ cu luna trecută`} <TrendingUp className="size-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {`Vizualizați distribuția apelurilor în funcție de vechimea relației și genul apelantului.`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
