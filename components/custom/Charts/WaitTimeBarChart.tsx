import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { TrendingUp } from "lucide-react"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Button } from "components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/chart"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Skeleton } from "components/ui/skeleton"

interface WaitTimeData {
  rating: string | number
  count: number
  codAgentie: number
}

interface WaitTimeBarChartProps {
  data: WaitTimeData[]
  isLoading: boolean
  dbName: string
}

const chartConfig = {
  count: {
    label: "Număr",
  },
} satisfies ChartConfig

// Memoizing the entire component
export const WaitTimeBarChart = React.memo(function WaitTimeBarChart({
  data,
  isLoading,
  dbName,
}: WaitTimeBarChartProps) {
  const [selectedCodAgentie, setSelectedCodAgentie] = React.useState<number | "all">("all")
  const [open, setOpen] = React.useState(false)

  // Memoize the function to format ratings
  const formatRating = React.useCallback((rating: string | number) => {
    if (typeof rating === "number" || (typeof rating === "string" && !isNaN(Number(rating)))) {
      return `Nota ${rating}`
    }
    return rating
  }, [])

  // Memoizing the chart data to avoid recalculations
  const chartData = React.useMemo(() => {
    const aggregatedData =
      selectedCodAgentie === "all"
        ? data.reduce(
            (acc, item) => {
              const existing = acc.find((d) => d.rating === item.rating)
              if (existing) {
                existing.count += item.count
              } else {
                acc.push({ rating: item.rating, count: item.count })
              }
              return acc
            },
            [] as { rating: string | number; count: number }[]
          )
        : data.filter((item) => item.codAgentie === selectedCodAgentie)

    const colorMapping: { [key: string]: string } = {
      "1": "#D32F2F", // Deep Red for rating 1
      "2": "#F57C00", // Orange for rating 2
      "3": "#FFEB3B", // Yellow for rating 3
      "4": "#8BC34A", // Light Green for rating 4
      "5": "#388E3C", // Green for rating 5
      default: "hsl(0, 0%, 80%)", // Grey for other values
    }

    return aggregatedData.map((item) => ({
      rating: item.rating,
      count: item.count,
      fill: colorMapping[item.rating.toString()] || colorMapping["default"],
    }))
  }, [data, selectedCodAgentie])

  // Memoize the sorting of chart data
  const sortedData = React.useMemo(() => {
    return [...chartData].sort((a, b) => {
      if (typeof a.rating === "number" && typeof b.rating === "number") {
        return a.rating - b.rating
      }
      if (typeof a.rating === "string" && typeof b.rating === "string") {
        return a.rating.localeCompare(b.rating)
      }
      return 0 // Maintain original order for mixed types
    })
  }, [chartData])

  // Memoize the unique codAgentie values to avoid recalculation
  const uniqueCodAgentie = React.useMemo(
    () => Array.from(new Set(data.map((item) => item.codAgentie))),
    [data]
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Timp de Așteptare în Agenție</CardTitle>
            <CardDescription>{dbName}</CardDescription>
          </div>

          {/* Custom Combobox */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedCodAgentie === "all"
                  ? "Toate agențiile"
                  : `Agenția ${selectedCodAgentie}`}
                <CaretSortIcon className="ml-2 opacity-50 size-4 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search agenție..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Nicio agenție găsită.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="all"
                      onSelect={() => {
                        setSelectedCodAgentie("all")
                        setOpen(false)
                      }}
                    >
                      Toate agențiile
                      <CheckIcon
                        className={selectedCodAgentie === "all" ? "ml-auto size-4 opacity-100" : "ml-auto size-4 opacity-0"}
                      />
                    </CommandItem>
                    {uniqueCodAgentie.map((cod) => (
                      <CommandItem
                        key={cod}
                        value={cod.toString()}
                        onSelect={() => {
                          setSelectedCodAgentie(cod)
                          setOpen(false)
                        }}
                      >
                        Agenția {cod}
                        <CheckIcon
                          className={selectedCodAgentie === cod ? "ml-auto size-4 opacity-100" : "ml-auto size-4 opacity-0"}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center size-full">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="rating"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={formatRating}
                />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" radius={8}>
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Distribuția timpului de așteptare <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Afișarea distribuției notelor privind timpul de așteptare.
        </div>
      </CardFooter>
    </Card>
  )
})
