// components/custom/Charts/AgeGenderDistributionChart.tsx
"use client"

import { TrendingUp } from "lucide-react"
import React from "react"
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"

const chartConfig = {
  Masculin: {
    label: "Masculin",
    color: "hsl(210, 100%, 50%)",
  },
  Feminin: {
    label: "Feminin",
    color: "hsl(350, 100%, 80%)",
  },
} satisfies ChartConfig

interface AgeGenderData {
  ageGroup: string
  Masculin: number
  Feminin: number
}

interface AgeGenderDistributionChartProps {
  data: AgeGenderData[]
  dbName: string
}

export function AgeGenderDistributionChart({ data, dbName }: AgeGenderDistributionChartProps) {
  return (
    <Card>
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl font-semibold">Distribuția pe Vârstă-Gen</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Distribuția apelurilor pe grupe de vârstă și gen
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <PolarAngleAxis dataKey="ageGroup" />
            <PolarGrid />
            <Radar
              name="Masculin"
              dataKey="Masculin"
              stroke={chartConfig.Masculin.color}
              fill={chartConfig.Masculin.color}
              fillOpacity={0.3}
            />
            <Radar
              name="Feminin"
              dataKey="Feminin"
              stroke={chartConfig.Feminin.color}
              fill={chartConfig.Feminin.color}
              fillOpacity={0.3}
            />
            <Legend />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          Distribuția pe vârste și gen <TrendingUp className="size-4" />
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Bazat pe toate apelurile înregistrate în {dbName}
        </div>
      </CardFooter>
    </Card>
  )
}
