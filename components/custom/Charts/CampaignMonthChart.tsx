"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"

interface CampaignMonthData {
  campania: string
  month: number
  count: number
}

interface CampaignMonthAreaChartProps {
  data: CampaignMonthData[]
  dbName: string
}

function generateColor(index: number): string {
  const hue = (index * 137.5) % 360
  return `hsl(${hue}, 70%, 50%)`
}

export function CampaignMonthAreaChart({ data, dbName }: CampaignMonthAreaChartProps) {
  const [timeRange, setTimeRange] = React.useState("12m")

  const processedData = React.useMemo(() => processData(data), [data])

  const chartConfig = React.useMemo(() => {
    const uniqueCampaigns = Array.from(new Set(data.map((item) => item.campania)))
    return uniqueCampaigns.reduce((config, campaign, index) => {
      config[campaign] = {
        label: campaign,
        color: generateColor(index),
      }
      return config
    }, {} as ChartConfig)
  }, [data])

  const filteredData = React.useMemo(() => {
    const now = new Date()
    const monthsToSubtract = timeRange === "6m" ? 6 : timeRange === "3m" ? 3 : 12
    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract, 1)

    return processedData.filter((item) => new Date(item.date) >= cutoffDate)
  }, [processedData, timeRange])

  const formatDate = (date: string, format: "short" | "long") => {
    return new Date(date).toLocaleDateString("ro-RO", {
      month: format,
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Distribuția Campaniilor în Timp</CardTitle>
          <CardDescription>Afișarea distribuției campaniilor pentru {dbName}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Selectează intervalul de timp">
            <SelectValue placeholder="Ultimele 12 luni" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12m" className="rounded-lg">
              Ultimele 12 luni
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Ultimele 6 luni
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Ultimele 3 luni
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              {Object.entries(chartConfig).map(([key, value]) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={value.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={value.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDate(value, "short")}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString("ro-RO")}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.entries(chartConfig).map(([key, value]) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                fill={`url(#fill${key})`}
                stroke={value.color}
                stackId="1"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function processData(data: CampaignMonthData[]) {
  const groupedData = data.reduce(
    (acc, item) => {
      const date = new Date(new Date().getFullYear(), item.month - 1, 1)
      const key = date.toISOString().slice(0, 7)
      if (!acc[key]) {
        acc[key] = { date: key }
      }
      acc[key][item.campania] = (acc[key][item.campania] || 0) + item.count
      return acc
    },
    {} as Record<string, any>
  )

  return Object.values(groupedData).sort((a, b) => a.date.localeCompare(b.date))
}
