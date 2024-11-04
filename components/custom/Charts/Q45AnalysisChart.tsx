import React, { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer } from "components/ui/chart"

interface Q45Data {
  campania: string
  averageQ4_5: number | null
  totalResponses: number
}

interface Q45AnalysisChartProps {
  q45Data: Q45Data[]
}

const chartConfig = {
  averageQ4_5: {
    label: "Medie Q4.5",
    color: "hsl(var(--chart-2))",
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

export default function Q45AnalysisChart({ q45Data }: Q45AnalysisChartProps) {
  const chartData = useMemo(() => {
    return q45Data
      .map((item, index) => ({
        campania: item.campania,
        averageQ4_5: item.averageQ4_5, // Keep null if no data
        totalResponses: item.totalResponses,
        color: item.averageQ4_5 !== null ? colorPalette[index % colorPalette.length] : "#E0E0E0", // Grey for N/A
      }))
      .sort((a, b) => {
        if (b.averageQ4_5 === null) return -1
        if (a.averageQ4_5 === null) return 1
        return b.averageQ4_5 - a.averageQ4_5
      })
  }, [q45Data])

  const maxAverage = useMemo(() => {
    const validAverages = chartData
      .filter(item => item.averageQ4_5 !== null)
      .map(item => item.averageQ4_5 as number)
    return validAverages.length > 0 ? Math.ceil(Math.max(...validAverages)) : 10 // Default max if no data
  }, [chartData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analiza produs dupa Q4.5</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} aria-label="Bar chart showing average Q4.5 analysis by campaign">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 20, right: 40, top: 20, bottom: 20 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="campania"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "#4B5563", fontSize: 12 }}
              />
              <XAxis type="number" domain={[0, maxAverage]} hide />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0]?.payload
                    return (
                      <div className="p-2 border rounded shadow-lg bg-background">
                        <div className="flex items-center">
                          <span
                            style={{ backgroundColor: data.color }}
                            className="inline-block w-2 h-2 mr-2 rounded-full"
                          ></span>
                          <strong>{data.campania}</strong>
                        </div>
                        <p>Medie Q4.5: {data.averageQ4_5 !== null ? data.averageQ4_5.toFixed(2) : "N/A"}</p>
                        <p>Răspunsuri totale: {data.totalResponses}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="averageQ4_5" radius={4}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="averageQ4_5"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number | null) => (value !== null ? value.toFixed(2) : "N/A")}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Analiza produs dupa Q4.5</div>
        <div className="leading-none text-muted-foreground">
          Acest grafic prezintă analiza produsului pentru fiecare campanie specificată în Q4.5.
        </div>
      </CardFooter>
    </Card>
  )
}