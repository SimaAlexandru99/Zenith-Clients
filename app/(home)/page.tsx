import { Metadata } from "next"
import DatabaseTabs from "components/custom/TabsOverview/DatabaseTabs"

export const metadata: Metadata = {
  title: "Overview- Optima Solutions Services",
  description: "View and analyze data from the CEC database.",
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <DatabaseTabs />
    </main>
  )
}
