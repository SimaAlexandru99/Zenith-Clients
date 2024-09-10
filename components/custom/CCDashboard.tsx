"use client"

import { useEffect, useState } from "react"
import { SkeletonChart } from "components/custom/SkeletonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { AgeGenderDistributionChart } from "./Charts/AgeGenderDistributionChart"
import { CampaignMonthAreaChart } from "./Charts/CampaignMonthChart"
import { chartConfig, GenderData, GenderPieChart } from "./Charts/GenderPieChart"
import { VechimeGenDistributionChart } from "./Charts/VechimeGenDistributionChart"

interface AgeGenderData {
  ageGroup: string
  Masculin: number
  Feminin: number
}

interface VechimeGenData {
  vechimeGroup: string
  Masculin: number
  Feminin: number
}

interface CampaignMonthData {
  campania: string
  month: number
  count: number
}

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

function isAgeGenderData(data: unknown): data is AgeGenderData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "ageGroup" in item &&
        typeof item.ageGroup === "string" &&
        "Masculin" in item &&
        typeof item.Masculin === "number" &&
        "Feminin" in item &&
        typeof item.Feminin === "number"
    )
  )
}

function isVechimeGenData(data: unknown): data is VechimeGenData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "vechimeGroup" in item &&
        typeof item.vechimeGroup === "string" &&
        "Masculin" in item &&
        typeof item.Masculin === "number" &&
        "Feminin" in item &&
        typeof item.Feminin === "number"
    )
  )
}

function isCampaignMonthData(data: unknown): data is CampaignMonthData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "campania" in item &&
        typeof item.campania === "string" &&
        "month" in item &&
        typeof item.month === "number" &&
        "count" in item &&
        typeof item.count === "number"
    )
  )
}

export function CCDashboard() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [ageGenderData, setAgeGenderData] = useState<AgeGenderData[]>([])
  const [vechimeGenData, setVechimeGenData] = useState<VechimeGenData[]>([])
  const [campaignMonthData, setCampaignMonthData] = useState<CampaignMonthData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const responses = await Promise.all([
        fetch("/api/gender-data?db=CC_database"),
        fetch("/api/age-gender-distribution?db=CC_database"),
        fetch("/api/vechime-gen-distribution?db=CC_database"),
        fetch("/api/campaign-month-data?db=CC_database"),
      ])

      if (!responses.every((response) => response.ok)) {
        throw new Error("Failed to fetch data")
      }

      const [genderData, ageGenderData, vechimeGenData, campaignMonthData] = await Promise.all(
        responses.map((response) => response.json())
      )

      if (!isGenderData(genderData)) {
        throw new Error("Invalid gender data received from API")
      }
      if (!isAgeGenderData(ageGenderData)) {
        throw new Error("Invalid age-gender data received from API")
      }
      if (!isVechimeGenData(vechimeGenData)) {
        throw new Error("Invalid vechime-gen data received from API")
      }
      if (!isCampaignMonthData(campaignMonthData)) {
        throw new Error("Invalid campaign-month data received from API")
      }

      const updatedGenderData = genderData.map((item) => ({
        ...item,
        fill: item.gender === "Masculin" ? chartConfig.Masculin.color : chartConfig.Feminin.color,
      }))

      setGenderData(updatedGenderData)
      setAgeGenderData(ageGenderData)
      setVechimeGenData(vechimeGenData)
      setCampaignMonthData(campaignMonthData)
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
      {/* Row for GenderPieChart and AgeGenderDistributionChart */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {" "}
        {/* Ensure full width */}
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <GenderPieChart data={genderData} isLoading={false} dbName="CC Database" />
            <AgeGenderDistributionChart data={ageGenderData} dbName="CC Database" />
          </>
        )}
      </div>
      {/* Row for VechimeGenDistributionChart and CampaignMonthAreaChart */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <VechimeGenDistributionChart data={vechimeGenData} dbName="CC Database" />
            <CampaignMonthAreaChart data={campaignMonthData} dbName="CC Database" />
          </>
        )}
      </div>
    </div>
  )
}
