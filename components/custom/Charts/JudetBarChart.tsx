"use client"

import { TrendingUp } from "lucide-react"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"
import { Skeleton } from "components/ui/skeleton"

interface JudetData {
  judet: string
  count: number
}

interface JudetBarChartProps {
  data: JudetData[]
  isLoading: boolean
  dbName: string
}

const chartConfig = {
  count: {
    label: "Număr",
    color: "hsl(210, 100%, 50%)", // Culoare albastră
  },
} satisfies ChartConfig

export function JudetBarChart({ data, isLoading, dbName }: JudetBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuția pe Județe</CardTitle>
        <CardDescription>{dbName}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="judet" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" fill="hsl(210, 100%, 50%)" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendința în creștere luna aceasta <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">Afișarea distribuției datelor pe județe.</div>
      </CardFooter>
    </Card>
  )
}
