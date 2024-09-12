import { Metadata } from "next"
import DatabaseTabs from "components/custom/TabsOverview/DatabaseTabs"

export const metadata: Metadata = {
  title: "Panou de control - Optima Solutions Services",
  description: "Panou de control Optima Solutions Services",
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <DatabaseTabs />
    </main>
  )
}
