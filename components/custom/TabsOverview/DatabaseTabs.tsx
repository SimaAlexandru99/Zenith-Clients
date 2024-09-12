"use client"

import { ArrowRight, ChartPie } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { Separator } from "components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import CCDatabaseContent from "./CCDatabaseContent"
import UTDatabaseContent from "./UTDatabaseContent"

export default function DatabaseTabs() {
  const [selectedDb, setSelectedDb] = useState<string>("UT_database")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/" className="group inline-flex items-center px-0.5 text-sm font-medium">
          <ChartPie className="size-4" />
          <Separator className="w-px h-4 mx-2 shrink-0 bg-border" />
          <span className="underline-offset-4 group-hover:underline">
            Află mai multe despre clienții tăi {selectedDb === "UT_database" ? "UT" : "CC"}
          </span>
          <ArrowRight className="ml-1 size-4" />
        </Link>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Dashboard {selectedDb === "UT_database" ? "UT" : "CC"}
        </h1>
        <p className="max-w-2xl text-lg font-light text-foreground">
          Statistici despre clienții {selectedDb === "UT_database" ? "UT" : "CC"} și informații care te pot ajuta să-ți
          înțelegi mai bine clienții
        </p>
      </div>

      <Tabs defaultValue="UT_database" onValueChange={setSelectedDb}>
        <TabsList className="grid w-[400px] grid-cols-2 space-x-4">
          <TabsTrigger value="UT_database" aria-label="Select UT Database">Baza de date UT</TabsTrigger>
          <TabsTrigger value="CC_database" aria-label="Select CC Database">Baza de date CC</TabsTrigger>
        </TabsList>

        <TabsContent value="UT_database">
          <UTDatabaseContent />
        </TabsContent>

        <TabsContent value="CC_database">
          <CCDatabaseContent />
        </TabsContent>
      </Tabs>

      <div className="p-4 mt-8 rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">
          În cadrul acestei prezentări veți regăsi o analiză cu privire la satisfacția clienților CEC Bank, analiza
          desfășurată în perioada anului 2024 în colaborare cu Optima Solutions Services, în care am analizat
          următoarele aspecte:
          <ul className="mt-2 list-disc list-inside">
            <li>studierea și colectarea motivelor pentru care clienții aleg această bancă</li>
            <li>gradul de rezolvare a problemelor pentru care clienții au ales serviciile CEC Bank</li>
            <li>evaluarea interacțiunii pe care clientul a avut-o în cadrul unităților CEC Bank</li>
            <li>aspecte de îmbunătățit în relația cu clienții</li>
          </ul>
        </p>
      </div>
    </div>
  )
}
