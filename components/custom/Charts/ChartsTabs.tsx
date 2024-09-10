"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Skeleton } from "components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { AgeGenderDistributionChart } from "./AgeGenderDistributionChart"
import { CampaignMonthAreaChart } from "./CampaignMonthChart"
import { chartConfig, GenderData, GenderPieChart } from "./GenderPieChart"
import { JudetBarChart } from "./JudetBarChart"
import { MotiveViziteChart } from "./ReasonsVisitsChart"
import { VechimeGenDistributionChart } from "./VechimeGenDistributionChart"
import { WaitTimeBarChart } from "./WaitTimeBarChart"

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

type Database = "UT_database" | "CC_database"

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

export function ChartsTabs() {
  const [selectedDb, setSelectedDb] = useState<Database>("UT_database")
  const [genderData, setGenderData] = useState<GenderData[]>([])
  const [ageGenderData, setAgeGenderData] = useState<AgeGenderData[]>([])
  const [vechimeGenData, setVechimeGenData] = useState<VechimeGenData[]>([])
  const [campaignMonthData, setCampaignMonthData] = useState<CampaignMonthData[]>([])
  const [judetData, setJudetData] = useState<JudetData[]>([])
  const [waitTimeData, setWaitTimeData] = useState<WaitTimeData[]>([])
  const [motiveViziteData, setMotiveViziteData] = useState<MotiveViziteData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (db: Database) => {
    setIsLoading(true)
    setError(null)
    try {
      const responses = await Promise.all([
        fetch(`/api/gender-data?db=${db}`),
        fetch(`/api/age-gender-distribution?db=${db}`),
        fetch(`/api/vechime-gen-distribution?db=${db}`),
        fetch(`/api/campaign-month-data?db=${db}`),
        fetch(`/api/judet-data?db=${db}`),
        fetch(`/api/wait-time-data?db=${db}`),
        fetch(`/api/reasons-visits?db=${db}`),
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

  useEffect(() => {
    fetchData(selectedDb)
  }, [selectedDb])

  const handleTabChange = (value: string) => {
    setSelectedDb(value as Database)
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
    <Tabs defaultValue="UT_database" className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="UT_database">UT Database</TabsTrigger>
        <TabsTrigger value="CC_database">CC Database</TabsTrigger>
      </TabsList>
      <TabsContent value="UT_database">
        <ChartContent
          isLoading={isLoading}
          genderData={genderData}
          ageGenderData={ageGenderData}
          vechimeGenData={vechimeGenData}
          campaignMonthData={campaignMonthData}
          judetData={judetData}
          waitTimeData={waitTimeData}
          motiveViziteData={motiveViziteData}
          dbName="UT Database"
        />
      </TabsContent>
      <TabsContent value="CC_database">
        <ChartContent
          isLoading={isLoading}
          genderData={genderData}
          ageGenderData={ageGenderData}
          vechimeGenData={vechimeGenData}
          campaignMonthData={campaignMonthData}
          judetData={judetData}
          waitTimeData={waitTimeData}
          motiveViziteData={motiveViziteData}
          dbName="CC Database"
        />
      </TabsContent>
    </Tabs>
  )
}

interface ChartContentProps {
  isLoading: boolean
  genderData: GenderData[]
  ageGenderData: AgeGenderData[]
  vechimeGenData: VechimeGenData[]
  campaignMonthData: CampaignMonthData[]
  judetData: JudetData[]
  waitTimeData: WaitTimeData[]
  motiveViziteData: MotiveViziteData[]
  dbName: string
}

function ChartContent({
  isLoading,
  genderData,
  ageGenderData,
  vechimeGenData,
  campaignMonthData,
  judetData,
  waitTimeData,
  motiveViziteData,
  dbName,
}: ChartContentProps) {
  return (
    <div className="grid gap-4">
      {/* Row for GenderPieChart and AgeGenderDistributionChart */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <GenderPieChart data={genderData} isLoading={false} dbName={dbName} />
            <AgeGenderDistributionChart data={ageGenderData} dbName={dbName} />
          </>
        )}
      </div>
      {/* Row for VechimeGenDistributionChart and MotiveViziteChart */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <VechimeGenDistributionChart data={vechimeGenData} dbName={dbName} />
            <MotiveViziteChart data={motiveViziteData} dbName={dbName} />
          </>
        )}
      </div>
      {/* Row for remaining charts */}
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <>
            <SkeletonChart single />
            <SkeletonChart single />
            <SkeletonChart single />
          </>
        ) : (
          <>
            <CampaignMonthAreaChart data={campaignMonthData} dbName={dbName} />
            <JudetBarChart data={judetData} isLoading={isLoading} dbName={dbName} />
            <WaitTimeBarChart data={waitTimeData} isLoading={isLoading} dbName={dbName} />
          </>
        )}
      </div>
    </div>
  )
}

function SkeletonChart({ single = false }: { single?: boolean }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="mb-2 h-6 w-48" />
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div
          className={`mx-auto flex aspect-square max-h-[250px] items-center justify-center ${
            single ? "size-[250px]" : "size-[200px]"
          }`}
        >
          <Skeleton className={`rounded-full ${single ? "size-[250px]" : "size-[200px]"}`} />
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <div className="mt-4 flex w-full justify-center gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
        <Skeleton className="mx-auto mt-4 h-3 w-56" />
      </div>
    </Card>
  )
}
