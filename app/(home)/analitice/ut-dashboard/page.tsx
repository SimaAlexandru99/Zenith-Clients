import { Metadata } from "next"
import { UTDashboard } from "components/custom/UTDashboard"

export const metadata: Metadata = {
  title: "UT Dashboard",
  description: "Statistici despre clienții UT și informații care te pot ajuta să-ți întelegi mai bine clienții",
}

export default function UTDashboardPage() {
  return (
    <main className="flex-1">
      <div className="container relative">
        <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
          {/* Breadcrumbs */}
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            UT Dashboard
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            Statistici despre clienții UT și informații care te pot ajuta să-ți întelegi mai bine clienții
          </p>
          <div className="flex w-full items-center justify-start gap-2 py-2">
            <UTDashboard />
          </div>
        </section>
      </div>
    </main>
  )
}
