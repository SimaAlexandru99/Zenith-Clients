"use client";

import { ArrowRight, ChartPie } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import CCDatabaseContent from "./CCDatabaseContent";
import UTDatabaseContent from "./UTDatabaseContent";

export default function DatabaseTabs() {
  const [selectedDb, setSelectedDb] = useState<string>("UT_database");

  return (
    <div className="p-6 space-y-8 md:p-8 lg:p-12">
      {/* Top section with navigation and heading */}
      <div className="space-y-4">
        {/* Navigation link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium transition group text-muted-foreground hover:text-foreground"
          aria-label="Go back to homepage"
        >
          <ChartPie className="size-4" />
          <Separator className="w-px h-4 mx-2 shrink-0 bg-border" />
          <span className="underline-offset-4 group-hover:underline">
            Află mai multe despre clienții tăi{" "}
            {selectedDb === "UT_database" ? "UT" : "CC"}
          </span>
          <ArrowRight className="ml-1 size-4" />
        </Link>

        {/* Title and subtitle */}
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Dashboard {selectedDb === "UT_database" ? "UT" : "CC"}
        </h1>
        <p className="max-w-2xl text-lg font-light text-muted-foreground">
          Statistici despre clienții{" "}
          {selectedDb === "UT_database" ? "UT" : "CC"} și informații care te
          pot ajuta să-ți înțelegi mai bine clienții.
        </p>
      </div>

      {/* Tabs for switching between databases */}
      <Tabs defaultValue="UT_database" onValueChange={setSelectedDb}>
        <TabsList className="h-10 mb-4">
          <TabsTrigger
            value="UT_database"
            aria-label="Select UT Database"
            
          >
            Baza de date UT
          </TabsTrigger>
          <TabsTrigger
            value="CC_database"
            aria-label="Select CC Database"
            
          >
            Baza de date CC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="UT_database">
          <UTDatabaseContent />
        </TabsContent>

        <TabsContent value="CC_database">
          <CCDatabaseContent />
        </TabsContent>
      </Tabs>

      {/* Presentation section */}
      <div className="p-4 mt-8 rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">
          În cadrul acestei prezentări veți regăsi o analiză cu privire la
          satisfacția clienților CEC Bank, analiza desfășurată în perioada
          anului 2024 în colaborare cu Optima Solutions Services, în care am
          analizat următoarele aspecte:
        </p>
        <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
          <li>Studierea și colectarea motivelor pentru care clienții aleg această bancă.</li>
          <li>
            Gradul de rezolvare a problemelor pentru care clienții au ales
            serviciile CEC Bank.
          </li>
          <li>
            Evaluarea interacțiunii pe care clientul a avut-o în cadrul unităților CEC Bank.
          </li>
          <li>
            Aspecte de îmbunătățit în relația cu clienții.
          </li>
        </ul>
      </div>
    </div>
  );
}
