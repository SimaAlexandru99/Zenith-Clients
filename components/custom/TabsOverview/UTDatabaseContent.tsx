"use client"

import { CheckCircle, LucideIcon, Users, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"

interface GenderData {
  gender: string
  count: number
}

interface AgencyData {
  _id: string
  averageRating: number
}

interface SurveyData {
  completeSurveys: number
  incompleteSurveys: number
}

interface CardData {
  title: string
  value: string | number
  icon: LucideIcon
  description: string
}

export default function UTDatabaseContent() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [topAgencyData, setTopAgencyData] = useState<AgencyData[]>([])
  const [bottomAgencyData, setBottomAgencyData] = useState<AgencyData[]>([])
  const [surveyData, setSurveyData] = useState<SurveyData>({ completeSurveys: 0, incompleteSurveys: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [genderResponse, surveyResponse] = await Promise.all([
          fetch(`/api/gender-data?db=UT_database`),
          fetch(`/api/survey-status?db=UT_database`)
        ])

        if (!genderResponse.ok || !surveyResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const genderData: GenderData[] = await genderResponse.json() as GenderData[]
        console.log("Gender data:", genderData);

        const surveyData: SurveyData = await (surveyResponse.json() as Promise<SurveyData>)
        console.log("Survey data:", surveyData);

        setGenderData(genderData)
        setTopAgencyData(topAgencyData)
        setBottomAgencyData(bottomAgencyData)
        setSurveyData(surveyData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [bottomAgencyData, topAgencyData])

  if (error) {
    return <div>An error occurred: {error}</div>
  }

  const masculinCount = genderData.find((item) => item.gender === "Masculin")?.count || 0
  const femininCount = genderData.find((item) => item.gender === "Feminin")?.count || 0

  const cardData: CardData[] = [
    {
      title: "Total Clienți Masculini",
      value: isLoading ? "Loading..." : masculinCount,
      icon: Users,
      description: "Clienți bărbați în baza de date UT",
    },
    {
      title: "Total Clienți Femininini",
      value: isLoading ? "Loading..." : femininCount,
      icon: Users,
      description: "Clienți femei în baza de date UT",
    },
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
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <DataCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

function DataCard({ title, value, icon: Icon, description }: CardData) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}