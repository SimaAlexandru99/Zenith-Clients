import { CheckCircle, LucideIcon, Users, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import AgencyPerformanceChart from "components/custom/Charts/AgencyPerformanceChart" // Import the new chart component
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"

interface GenderData {
  gender: string
  count: number
}

interface AgencyData {
  _id: string // This is the agency code
  averageQ5: number
  count: number
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
  const [agencyData, setAgencyData] = useState<AgencyData[]>([])
  const [surveyData, setSurveyData] = useState<SurveyData>({ completeSurveys: 0, incompleteSurveys: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [genderResponse, surveyResponse, agencyResponse] = await Promise.all([
          fetch(`/api/gender-data?db=UT_database`),
          fetch(`/api/survey-status?db=UT_database`),
          fetch(`/api/agency-performance?db=UT_database`),
        ])

        if (!genderResponse.ok || !surveyResponse.ok || !agencyResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        const fetchedGenderData: GenderData[] = await genderResponse.json() as GenderData[]
        const fetchedSurveyData: SurveyData = await surveyResponse.json() as SurveyData
        const fetchedAgencyData: AgencyData[] = await agencyResponse.json() as AgencyData[]

        setGenderData(fetchedGenderData)
        setSurveyData(fetchedSurveyData)
        setAgencyData(fetchedAgencyData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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
      title: "Total Clienți Femini",
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

  // Sort the agency data by average Q5 score and take the top 7
  const sortedAgencyData = [...agencyData].sort((a, b) => b.averageQ5 - a.averageQ5).slice(0, 7)

  // Chart data for the bar chart

  const agencyChartData = sortedAgencyData.map((agency) => ({
    agency: agency._id, // Use the integer ID directly
    averageQ5: agency.averageQ5,
  }))

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <DataCard key={index} {...card} />
        ))}
      </div>

      {/* Render the chart component */}
      <AgencyPerformanceChart data={agencyChartData} />
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
