"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import CCCustomersContent from "./CCCustomersContent"
import UTCustomersContent from "./UTCustomersContent"

export default function CustomersTabs() {
  const [, setSelectedDb] = useState<string>("UT_database")

  return (
    <Tabs defaultValue="UT_database" onValueChange={setSelectedDb}>
      <TabsList className="grid w-[400px] grid-cols-2 space-x-4">
        <TabsTrigger value="UT_database">UT Database</TabsTrigger>
        <TabsTrigger value="CC_database">CC Database</TabsTrigger>
      </TabsList>

      <TabsContent value="UT_database">
        <UTCustomersContent />
      </TabsContent>

      <TabsContent value="CC_database">
        <CCCustomersContent />
      </TabsContent>
    </Tabs>
  )
}
