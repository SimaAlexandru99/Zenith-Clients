import React from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer } from "components/ui/chart"

interface Q44Data {
  campania: string
  averageQ44: number | null
  totalResponses: number
}

interface Q44AnalysisChartProps {
  q44Data: Q44Data[]
}

const chartConfig = {
  averageQ44: {
    label: "Average Q4.4",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

const colorPalette = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#8AC926",
  "#1982C4",
  "#6A4C93",
  "#F15BB5",
]

export default function Q44AnalysisChart({ q44Data }: Q44AnalysisChartProps) {
  const chartData = q44Data
    .map((item, index) => ({
      campania: item.campania,
      averageQ44: item.averageQ44 ?? 0,
      totalResponses: item.totalResponses,
      color: colorPalette[index % colorPalette.length], // Assign color from palette
    }))
    .sort((a, b) => b.averageQ44 - a.averageQ44)

  const maxAverage = Math.max(...chartData.map((item) => item.averageQ44))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analiza produs dupa Q4.4</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 40, top: 20, bottom: 20 }}
            width={800}
            height={400}
          >
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="campania" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis type="number" domain={[0, Math.ceil(maxAverage)]} hide />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  const data = payload[0]?.payload
                  const lineStyle = { backgroundColor: data.color, width: "8px", height: "8px", borderRadius: "50%" }
                  return (
                    <div className="rounded border bg-background p-2 text-foreground shadow">
                      <div className="flex items-center">
                        <span style={lineStyle} className="mr-2"></span>
                        <strong>{data.campania}</strong>
                      </div>
                      <p>Medie: {data.averageQ44.toFixed(2)}</p>
                      <p>Răspunsuri totale: {data.totalResponses}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="averageQ44" radius={4}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="campania"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="averageQ44"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => value.toFixed(2)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Analiza produs dupa Q4.4</div>
        <div className="leading-none text-muted-foreground">
          Acest grafic prezintă analiza produsului pentru fiecare campanie.
        </div>
      </CardFooter>
    </Card>
  )
}
