import { Metadata } from "next"
import CustomersTabs from "components/custom/TabsCustomers/CustomersTabs"

export const metadata: Metadata = {
  title: "Clientii - Optima Solutions Services",
  description: "Clientii Optima Solutions Services",
}

export default function Customers() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <CustomersTabs />
    </main>
  )
}
