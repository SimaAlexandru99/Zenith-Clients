// /components/CCDatabaseContent.tsx

"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Skeleton } from "components/ui/skeleton"
import { useToast } from "hooks/use-toast"

interface SurveyData {
  completeSurveys: number
  incompleteSurveys: number
}

interface CardData {
  title: string
  value: string | number
  icon: React.ComponentType<any>
  description: string
}

export default function CCDatabaseContent() {
  const [surveyData, setSurveyData] = useState<SurveyData>({ completeSurveys: 0, incompleteSurveys: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const surveyResponse = await fetch(`/api/survey-status?db=CC_database`)

      if (!surveyResponse.ok) {
        throw new Error("Failed to fetch survey data")
      }

      const fetchedSurveyData: SurveyData = (await surveyResponse.json()) as SurveyData

      console.log("Fetched Survey Data:", fetchedSurveyData)

      setSurveyData(fetchedSurveyData)

      toast({
        title: "Data loaded successfully",
        description: "The latest survey data has been fetched from the server.",
        variant: "default",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      toast({
        title: "Error loading data",
        description: errorMessage,
        variant: "destructive",
      })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchData()
    // Optionally, set up polling similar to UTDatabaseContent
    const POLLING_INTERVAL = 300000 // 5 minutes
    const intervalId = setInterval(() => {
      fetchData()
    }, POLLING_INTERVAL)
    return () => clearInterval(intervalId)
  }, [fetchData])

  if (error) {
    return <div className="text-red-500">A apărut o eroare: {error}</div>
  }

  const cardData: CardData[] = [
    {
      title: "Sondaj Complet",
      value: isLoading ? "Loading..." : surveyData.completeSurveys,
      icon: CheckCircle,
      description: "Număr de sondaje completate",
    },
    {
      title: "Sondaj Incomplet",
      value: isLoading ? "Loading..." : surveyData.incompleteSurveys,
      icon: XCircle,
      description: "Număr de sondaje incomplete",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {cardData.map((card, index) => (
          <DataCard key={index} {...card} isLoading={isLoading} />
        ))}
      </div>
    </div>
  )
}

interface DataCardProps extends CardData {
  isLoading: boolean
}

function DataCard({ title, value, icon: Icon, description, isLoading }: DataCardProps) {
  return (
    <Card className="rounded-lg shadow-lg transition-transform hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="mb-2 h-6 w-16 animate-pulse" /> : value}
        </div>
        <p className="text-xs text-muted-foreground">
          {isLoading ? <Skeleton className="h-4 w-full animate-pulse" /> : description}
        </p>
      </CardContent>
    </Card>
  )
}
