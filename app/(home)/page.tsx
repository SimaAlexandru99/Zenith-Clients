import { Metadata } from "next"
import DatabaseTabs from "components/custom/TabsOverview/DatabaseTabs"

export const metadata: Metadata = {
  title: "Panou de control - Optima Solutions Services",
  description: "Panou de control Optima Solutions Services",
}

export default function Home() {
  return (
    <DatabaseTabs />
  )
}
