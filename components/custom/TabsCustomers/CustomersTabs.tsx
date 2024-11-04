// components/CustomersTabs.tsx

"use client"

import { ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { Separator } from "components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import CCCustomersContent from "./CCCustomersContent"
import UTCustomersContent from "./UTCustomersContent"

const CustomersTabs = (): JSX.Element => {
  const [selectedDb, setSelectedDb] = useState<string>("UT_database")

  return (
    <div className="space-y-8 p-6 md:p-8 lg:p-12">
      {/* Top section with navigation and heading */}
      <div className="space-y-4">
        {/* Navigation link */}
        <Link
          href="/clienti"
          className="group inline-flex items-center text-sm font-medium text-muted-foreground transition hover:text-foreground"
          aria-label="Go back to customers overview"
        >
          <Users className="size-4" />
          <Separator className="mx-2 h-4 w-px shrink-0 bg-border" />
          <span className="underline-offset-4 group-hover:underline">
            Află mai multe despre clienții {selectedDb === "UT_database" ? "UT" : "CC"}
          </span>
          <ArrowRight className="ml-1 size-4" />
        </Link>

        {/* Title and subtitle */}
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Clienți {selectedDb === "UT_database" ? "UT" : "CC"}
        </h1>
        <p className="max-w-2xl text-lg font-light text-muted-foreground">
          Date despre clienții {selectedDb === "UT_database" ? "UT" : "CC"} și perspective utile pentru înțelegerea
          nevoilor lor.
        </p>
      </div>

      {/* Tabs for switching between customer databases */}
      <Tabs defaultValue="UT_database" onValueChange={setSelectedDb}>
        <TabsList className="mb-4 h-10">
          <TabsTrigger value="UT_database" aria-label="Select UT Customer Database">
            Baza de date UT
          </TabsTrigger>
          <TabsTrigger value="CC_database" aria-label="Select CC Customer Database">
            Baza de date CC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="UT_database">
          <UTCustomersContent />
        </TabsContent>

        <TabsContent value="CC_database">
          <CCCustomersContent />
        </TabsContent>
      </Tabs>

      {/* Presentation section */}
      <div className="mt-8 rounded-lg bg-muted p-4">
        <p className="text-sm text-muted-foreground">
          Această secțiune prezintă detalii despre clienții Optima Solutions Services. Explorează datele pentru a
          înțelege mai bine interacțiunile și cerințele acestora.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Analiză demografică a clienților și comportamente de consum.</li>
          <li>Feedback-ul și evaluările primite din partea clienților.</li>
          <li>Identificarea oportunităților de îmbunătățire a serviciilor.</li>
          <li>Indicatori de satisfacție și loialitate.</li>
        </ul>
      </div>
    </div>
  )
}

export default CustomersTabs
