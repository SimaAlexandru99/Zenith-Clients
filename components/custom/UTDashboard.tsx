"use client"

import { useEffect, useState } from "react"
import { AgeGenderDistributionChart } from "components/custom/Charts/AgeGenderDistributionChart"
import { CampaignMonthAreaChart } from "components/custom/Charts/CampaignMonthChart"
import { chartConfig, GenderData, GenderPieChart } from "components/custom/Charts/GenderPieChart"
import { JudetBarChart } from "components/custom/Charts/JudetBarChart"
import { MotiveViziteChart } from "components/custom/Charts/ReasonsVisitsChart"
import { VechimeGenDistributionChart } from "components/custom/Charts/VechimeGenDistributionChart"
import { WaitTimeBarChart } from "components/custom/Charts/WaitTimeBarChart"
import { SkeletonChart } from "components/custom/SkeletonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"

interface AgeGenderData {
  ageGroup: string
  Masculin: number
  Feminin: number
}

interface WaitTimeData {
  rating: string | number
  count: number
  codAgentie: number
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

interface JudetData {
  judet: string
  count: number
}

interface MotiveViziteData {
  campania: string
  count: number
  fill: string
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

function isJudetData(data: unknown): data is JudetData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "judet" in item &&
        typeof item.judet === "string" &&
        "count" in item &&
        typeof item.count === "number"
    )
  )
}

function isWaitTimeData(data: unknown): data is WaitTimeData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "rating" in item &&
        (typeof item.rating === "string" || typeof item.rating === "number") &&
        "count" in item &&
        typeof item.count === "number"
    )
  )
}

function isMotiveViziteData(data: unknown): data is MotiveViziteData[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "campania" in item &&
        typeof item.campania === "string" &&
        "count" in item &&
        typeof item.count === "number" &&
        "fill" in item &&
        typeof item.fill === "string"
    )
  )
}

export function UTDashboard() {
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [ageGenderData, setAgeGenderData] = useState<AgeGenderData[]>([])
  const [vechimeGenData, setVechimeGenData] = useState<VechimeGenData[]>([])
  const [campaignMonthData, setCampaignMonthData] = useState<CampaignMonthData[]>([])
  const [judetData, setJudetData] = useState<JudetData[]>([])
  const [waitTimeData, setWaitTimeData] = useState<WaitTimeData[]>([])
  const [motiveViziteData, setMotiveViziteData] = useState<MotiveViziteData[]>([])
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
        fetch("/api/gender-data?db=UT_database"),
        fetch("/api/age-gender-distribution?db=UT_database"),
        fetch("/api/vechime-gen-distribution?db=UT_database"),
        fetch("/api/campaign-month-data?db=UT_database"),
        fetch("/api/judet-data?db=UT_database"),
        fetch("/api/wait-time-data?db=UT_database"),
        fetch("/api/reasons-visits?db=UT_database"),
      ])

      if (!responses.every((response) => response.ok)) {
        throw new Error("Failed to fetch data")
      }

      const [genderData, ageGenderData, vechimeGenData, campaignMonthData, judetData, waitTimeData, motiveViziteData] =
        await Promise.all(responses.map((response) => response.json()))

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
      if (!isJudetData(judetData)) {
        throw new Error("Invalid JUDET data received from API")
      }
      if (!isWaitTimeData(waitTimeData)) {
        throw new Error("Invalid wait time data received from API")
      }
      if (!isMotiveViziteData(motiveViziteData)) {
        throw new Error("Invalid motive vizite data received from API")
      }

      const updatedGenderData = genderData.map((item) => ({
        ...item,
        fill: item.gender === "Masculin" ? chartConfig.Masculin.color : chartConfig.Feminin.color,
      }))

      setGenderData(updatedGenderData)
      setAgeGenderData(ageGenderData)
      setVechimeGenData(vechimeGenData)
      setCampaignMonthData(campaignMonthData)
      setJudetData(judetData)
      setWaitTimeData(waitTimeData)
      setMotiveViziteData(motiveViziteData)
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
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <GenderPieChart data={genderData} isLoading={false} dbName="UT Database" />
            <AgeGenderDistributionChart data={ageGenderData} dbName="UT Database" />
          </>
        )}
      </div>
      {/* Row for VechimeGenDistributionChart and MotiveViziteChart */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <VechimeGenDistributionChart data={vechimeGenData} dbName="UT Database" />
            <MotiveViziteChart data={motiveViziteData} dbName="UT Database" />
          </>
        )}
      </div>
      {/* Single row for CampaignMonthAreaChart */}
      <div className="grid w-full grid-cols-1">
        {isLoading ? (
          <SkeletonChart single />
        ) : (
          <CampaignMonthAreaChart data={campaignMonthData} dbName="UT Database" />
        )}
      </div>
      {/* Row for JudetBarChart and WaitTimeBarChart */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonChart single />
            <SkeletonChart single />
          </>
        ) : (
          <>
            <JudetBarChart data={judetData} isLoading={isLoading} dbName="UT Database" />
            <WaitTimeBarChart data={waitTimeData} isLoading={isLoading} dbName="UT Database" />
          </>
        )}
      </div>
    </div>
  )
}
