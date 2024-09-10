// components/MotiveViziteChart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"

interface MotiveViziteData {
  campania: string
  count: number
  fill: string
}

interface MotiveViziteChartProps {
  data: MotiveViziteData[]
  dbName: string
}

function generateColor(index: number): string {
  const hue = (index * 137.5) % 360
  return `hsl(${hue}, 70%, 50%)`
}

export function MotiveViziteChart({ data, dbName }: MotiveViziteChartProps) {
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 5)

  const chartConfig = sortedData.reduce((config, item, index) => {
    config[item.campania] = {
      label: item.campania,
      color: generateColor(index),
    }
    return config
  }, {} as ChartConfig)

  chartConfig.count = { label: "Număr vizite" }

  const totalVisits = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Motivele Vizitelor în Agenție</CardTitle>
        <CardDescription>{dbName}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={sortedData} layout="vertical" barCategoryGap={8}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis dataKey="campania" type="category" tickLine={false} axisLine={false} width={150} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="var(--chart-1)"
              radius={[0, 4, 4, 0]}
              label={{ position: "right", fill: "var(--foreground)", fontSize: 12 }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Total vizite: {totalVisits.toLocaleString()}</div>
        <div className="leading-none text-muted-foreground">Afișarea top 5 motive pentru vizitele în agenție</div>
      </CardFooter>
    </Card>
  )
}
