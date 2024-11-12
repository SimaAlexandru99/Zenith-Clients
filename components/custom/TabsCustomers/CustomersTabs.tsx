// components/CustomersTabs.tsx
"use client"

import { ArrowRight, HeadphonesIcon, UserCheck, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "components/ui/card"
import { Separator } from "components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import CCCustomersContent from "./CCCustomersContent"
import UTCustomersContent from "./UTCustomersContent"

type DatabaseType = "UT_database" | "CC_database"

const databaseInfo = {
  UT_database: {
    title: "Clienți Unități Teritoriale",
    shortTitle: "UT",
    description:
      "Date despre clienții care au vizitat agențiile CEC Bank și feedback-ul lor despre serviciile oferite.",
    icon: UserCheck,
    metrics: [
      "Evaluarea experienței în agenție",
      "Timpul de așteptare și servire",
      "Calitatea interacțiunii cu personalul",
      "Evaluarea proceselor și documentației",
    ],
  },
  CC_database: {
    title: "Clienți Call Center",
    shortTitle: "CC",
    description:
      "Date despre clienții care au interacționat cu Call Center-ul și experiența lor cu serviciile telefonice.",
    icon: HeadphonesIcon,
    metrics: [
      "Evaluarea experienței telefonice",
      "Timpul de așteptare în IVR",
      "Calitatea suportului oferit",
      "Rezolvarea solicitărilor",
    ],
  },
}

function CustomersTabs() {
  const [selectedDb, setSelectedDb] = useState<DatabaseType>("UT_database")
  const currentDb = databaseInfo[selectedDb]

  return (
    <div className="p-6 space-y-8 md:p-8 lg:p-12">
      {/* Top section with navigation and heading */}
      <div className="space-y-4">
        {/* Navigation link */}
        <Link
          href="/clienti"
          className="inline-flex items-center text-sm font-medium transition group text-muted-foreground hover:text-foreground"
          aria-label="Go back to customers overview"
        >
          <Users className="size-4" />
          <Separator className="w-px h-4 mx-2 shrink-0 bg-border" />
          <span className="underline-offset-4 group-hover:underline">
            Află mai multe despre clienții {currentDb.shortTitle}
          </span>
          <ArrowRight className="ml-1 size-4" />
        </Link>

        {/* Title and subtitle */}
        <div className="flex items-center gap-2">
          <currentDb.icon className="size-8 text-primary" />
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            {currentDb.title}
          </h1>
        </div>
        <p className="max-w-2xl text-lg font-light text-muted-foreground">{currentDb.description}</p>
      </div>

      {/* Database selection tabs */}
      <Tabs defaultValue="UT_database" onValueChange={(value) => setSelectedDb(value as DatabaseType)}>
        <TabsList className="h-10 mb-4">
          <TabsTrigger value="UT_database" className="flex items-center gap-2" aria-label="Select UT Customer Database">
            <UserCheck className="size-4" />
            Baza de date UT
          </TabsTrigger>
          <TabsTrigger value="CC_database" className="flex items-center gap-2" aria-label="Select CC Customer Database">
            <HeadphonesIcon className="size-4" />
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

      {/* Context Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Metrics Card */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold">Metrici principale</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {currentDb.metrics.map((metric, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  {metric}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold">Obiective analiză</h3>
            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
              <li>Analiză demografică și comportamente client</li>
              <li>Evaluarea satisfacției și feedback-ului</li>
              <li>Identificarea oportunităților de îmbunătățire</li>
              <li>Monitorizarea indicatorilor de loialitate</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomersTabs
