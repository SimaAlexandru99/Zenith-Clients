import { Metadata } from "next"
import CustomersTabs from "components/custom/TabsCustomers/CustomersTabs"

export const metadata: Metadata = {
  title: "Clientii - Optima Solutions Services",
  description: "Clientii Optima Solutions Services",
}

export default function Customers() {
  return (
    <CustomersTabs />
  )
}
