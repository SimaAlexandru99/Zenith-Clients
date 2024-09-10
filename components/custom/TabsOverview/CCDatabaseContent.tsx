"use client"

import { Activity, CreditCard, LucideIcon, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"

interface GenderData {
  gender: string
  count: number
}

interface CardData {
  title: string
  value: string | number
  icon: LucideIcon
  description: string
}

export default function CCDatabaseContent() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGenderData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/gender-data?db=CC_database`)
        if (!response.ok) {
          throw new Error("Failed to fetch CC gender data")
        }
        const data: GenderData[] = (await response.json()) as GenderData[]
        setGenderData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGenderData()
  }, [])

  if (error) {
    return <div>An error occurred: {error}</div>
  }

  const masculinCount = genderData.find((item) => item.gender === "Masculin")?.count || 0
  const femininCount = genderData.find((item) => item.gender === "Feminin")?.count || 0

  const cardData: CardData[] = [
    {
      title: "Total Masculine Clients",
      value: isLoading ? "Loading..." : masculinCount,
      icon: Users,
      description: "Male clients in CC database",
    },
    {
      title: "Total Feminine Clients",
      value: isLoading ? "Loading..." : femininCount,
      icon: Users,
      description: "Female clients in CC database",
    },
    {
      title: "CC Sales",
      value: "+8,765",
      icon: CreditCard,
      description: "+12% from last month",
    },
    {
      title: "CC Active Now",
      value: "+321",
      icon: Activity,
      description: "+150 since last hour",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <DataCard key={index} {...card} />
      ))}
    </div>
  )
}

function DataCard({ title, value, icon: Icon, description }: CardData) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
