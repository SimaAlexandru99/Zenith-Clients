import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/ui/button" // Presupunând că ai un component Button
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"

// Functie pentru a genera metadatele paginii
export const generateMetadata = (): Metadata => {
  return {
    title: "Analytics - Optima Solutions Services",
    description: "Accesează dashboard-urile pentru controlul clienților și urmărirea utilizatorilor.",
  }
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Card pentru cc-dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>CC Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Acesta este dashboard-ul de control unde poți accesa analize și rapoarte legate de controlul clienților.
            </p>
            <Link href="/analitice/cc-dashboard">
              <Button className="mt-4">Accesează CC Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Card pentru ut-dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>UT Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Acesta este dashboard-ul pentru urmărirea utilizatorilor, unde poți accesa analize detaliate și monitoriza
              comportamentul utilizatorilor.
            </p>
            <Link href="/analitice/ut-dashboard">
              <Button className="mt-4">Accesează UT Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
