import { Metadata } from "next"
import CustomersTabs from "components/custom/TabsCustomers/CustomersTabs"

export const metadata: Metadata = {
  title: "Customers- Optima Solutions Services",
  description: "Customers page",
}

export default function Customers() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <CustomersTabs />
    </main>
  )
}
