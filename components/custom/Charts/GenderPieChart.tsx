// components/custom/Charts/GenderPieChart.tsx
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"
import { Skeleton } from "components/ui/skeleton"

export interface GenderData {
  gender: string
  count: number
  fill: string
}

export const chartConfig = {
  count: {
    label: "Număr",
    color: "hsl(0, 0%, 50%)", // Default color for count
  },
  Masculin: {
    label: "Masculin",
    color: "hsl(210, 100%, 50%)", // Albastru pentru băieți
  },
  Feminin: {
    label: "Feminin",
    color: "hsl(350, 100%, 80%)", // Roz pentru fete
  },
  Clienti: {
    label: "Clienti",
    color: "hsl(45, 100%, 50%)", // Galben pentru clienti fără gen specificat
  },
} satisfies ChartConfig

interface GenderPieChartProps {
  data: GenderData[]
  isLoading: boolean
  dbName: string
}

export function GenderPieChart({ data, isLoading, dbName }: GenderPieChartProps) {
  const totalCalls = React.useMemo(() => {
    return data.reduce((acc: number, curr: GenderData) => acc + curr.count, 0)
  }, [data])

  const coloredData = React.useMemo(() => {
    return data.map((item) => ({
      ...item,
      fill: chartConfig[item.gender as keyof typeof chartConfig]?.color || chartConfig.Clienti.color,
    }))
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl font-semibold">Distribuția pe Gen</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Bazat pe toate apelurile</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          {isLoading ? (
            <div className="flex size-full items-center justify-center">
              <Skeleton className="size-[200px] rounded-full" />
            </div>
          ) : (
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={coloredData}
                dataKey="count"
                nameKey="gender"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={4}
                stroke="hsl(var(--background))"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                            {totalCalls.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-xs">
                            Total Apeluri
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-2">
        <div className="flex w-full justify-center gap-4">
          {coloredData.map((item) => (
            <div key={item.gender} className="flex items-center gap-2">
              <div className="size-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-sm font-medium">{item.gender}</span>
              <span className="text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-4 w-8" />
                ) : (
                  `${item.count.toLocaleString()} (${((item.count / totalCalls) * 100).toFixed(1)}%)`
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-muted-foreground">Afișarea distribuției pe gen pentru {dbName}</div>
      </CardFooter>
    </Card>
  )
}
