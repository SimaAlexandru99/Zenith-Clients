import { CheckCircle, Users, XCircle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import BottomAgency from "components/custom/Charts/BottomAgency"
import TopAgency from "components/custom/Charts/TopAgency"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Skeleton } from "components/ui/skeleton"
import { useToast } from "hooks/use-toast"
import Q43AnalysisChart from "../Charts/Q43AnalysisChart"
import Q44AnalysisChart from "../Charts/Q44AnalysisChart"

interface GenderData {
  gender: string
  count: number
}

interface AgencyData {
  _id: string
  averageQ5: number
  count: number
}

interface SurveyData {
  completeSurveys: number
  incompleteSurveys: number
}

interface Q4_3Data {
  campania: string
  averageQ4_3: number | null
  specialCases: (string | null)[]
  totalResponses: number
}

interface Q4_4Data {
  campania: string
  averageQ4_4: number | null
  specialCases: (string | null)[]
  totalResponses: number
}

interface CardData {
  title: string
  value: string | number
  icon: React.ComponentType<any>
  description: string
}

const POLLING_INTERVAL = 300000 // 5 minutes in milliseconds

export default function UTDatabaseContent() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [agencyData, setAgencyData] = useState<AgencyData[]>([])
  const [surveyData, setSurveyData] = useState<SurveyData>({ completeSurveys: 0, incompleteSurveys: 0 })
  const [q4_3Data, setQ4_3Data] = useState<Q4_3Data[]>([])
  const [q4_4Data, setQ4_4Data] = useState<Q4_4Data[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [genderResponse, surveyResponse, agencyResponse, q4_3Response, q4_4Response] = await Promise.all([
        fetch(`/api/gender-data?db=UT_database`),
        fetch(`/api/survey-status?db=UT_database`),
        fetch(`/api/agency-performance?db=UT_database`),
        fetch(`/api/q4_3-analysis?db=UT_database`),
        fetch(`/api/q4_4-analysis?db=UT_database`),
      ])

      if (!genderResponse.ok || !surveyResponse.ok || !agencyResponse.ok || !q4_3Response.ok || !q4_4Response.ok) {
        throw new Error("Failed to fetch data")
      }

      const fetchedGenderData: GenderData[] = (await genderResponse.json()) as GenderData[]
      const fetchedSurveyData: SurveyData = (await surveyResponse.json()) as SurveyData
      const fetchedAgencyData: AgencyData[] = (await agencyResponse.json()) as AgencyData[]
      const fetchedQ4_3Data: Q4_3Data[] = (await q4_3Response.json()) as Q4_3Data[]
      const fetchedQ4_4Data: Q4_4Data[] = (await q4_4Response.json()) as Q4_4Data[]

      setGenderData(fetchedGenderData)
      setSurveyData(fetchedSurveyData)
      setAgencyData(fetchedAgencyData)
      setQ4_3Data(fetchedQ4_3Data)
      setQ4_4Data(fetchedQ4_4Data)

      toast({
        title: "Data loaded successfully",
        description: "The latest data has been fetched from the server.",
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
    const intervalId = setInterval(() => {
      fetchData()
    }, POLLING_INTERVAL)
    return () => clearInterval(intervalId)
  }, [fetchData])

  if (error) {
    return <div>An error occurred: {error}</div>
  }

  const masculinCount = genderData.find((item) => item.gender === "Masculin")?.count || 0
  const femininCount = genderData.find((item) => item.gender === "Feminin")?.count || 0

  const cardData: CardData[] = [
    {
      title: "Total Clienți Masculini",
      value: masculinCount,
      icon: Users,
      description: "Clienți bărbați în baza de date UT",
    },
    {
      title: "Total Clienți Femini",
      value: femininCount,
      icon: Users,
      description: "Clienți femei în baza de date UT",
    },
    {
      title: "Sondaj Complet",
      value: surveyData.completeSurveys,
      icon: CheckCircle,
      description: "Număr de sondaje completate",
    },
    {
      title: "Sondaj Incomplet",
      value: surveyData.incompleteSurveys,
      icon: XCircle,
      description: "Număr de sondaje incomplete",
    },
  ]

  const validAgencyData = agencyData.filter((agency) => agency.averageQ5 !== null)

  const topAgencyData = [...validAgencyData]
    .sort((a, b) => b.averageQ5 - a.averageQ5)
    .slice(0, 7)
    .map((agency) => ({
      agency: agency._id.toString(),
      averageQ5: agency.averageQ5,
    }))

  const bottomAgencyData = [...validAgencyData]
    .sort((a, b) => a.averageQ5 - b.averageQ5)
    .slice(0, 7)
    .map((agency) => ({
      agency: agency._id.toString(),
      averageQ5: agency.averageQ5,
    }))

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <DataCard key={index} {...card} isLoading={isLoading} />
        ))}
      </div>

      {topAgencyData.length > 0 && <TopAgency data={topAgencyData} />}
      {bottomAgencyData.length > 0 && <BottomAgency data={bottomAgencyData} />}

      {/* Q4.3 and Q4.4 Charts Side by Side */}
      <div className="grid gap-8 lg:grid-cols-2">
        {q4_3Data.length > 0 && (
          <Q43AnalysisChart
            q43Data={q4_3Data.map(({ campania, averageQ4_3, totalResponses }) => ({
              campania,
              averageQ43: averageQ4_3,
              totalResponses,
            }))}
          />
        )}
        {q4_4Data.length > 0 && (
          <Q44AnalysisChart
            q44Data={q4_4Data.map(({ campania, averageQ4_4, totalResponses }) => ({
              campania,
              averageQ44: averageQ4_4,
              totalResponses,
            }))}
          />
        )}
      </div>
    </div>
  )
}

function DataCard({ title, value, icon: Icon, description, isLoading }: CardData & { isLoading: boolean }) {
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
