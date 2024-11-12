"use client"

import { useEffect, useState } from "react"
import { SkeletonChart } from "components/custom/SkeletonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { chartConfig, GenderData, GenderPieChart } from "./Charts/GenderPieChart"

function isGenderData(data: unknown): data is GenderData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "gender" in item &&
        typeof item.gender === "string" &&
        "count" in item &&
        typeof item.count === "number"
    )
  )
}

export function CCDashboard() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/gender-data?db=CC_database")

      if (!response.ok) {
        throw new Error("Failed to fetch gender data")
      }

      const data = await response.json()

      if (!isGenderData(data)) {
        throw new Error("Invalid gender data received from API")
      }

      const updatedGenderData = data.map((item) => ({
        ...item,
        fill: item.gender === "Masculin" ? chartConfig.Masculin.color : chartConfig.Feminin.color,
      }))

      setGenderData(updatedGenderData)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eroare</CardTitle>
          <CardDescription>Nu s-au putut încărca datele pentru grafice</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid w-full gap-4">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? <SkeletonChart /> : <GenderPieChart data={genderData} isLoading={false} dbName="CC Database" />}
      </div>
    </div>
  )
}
