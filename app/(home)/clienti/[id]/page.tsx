// app/(home)/clienti/[id]/page.tsx

import { env } from "env.mjs" // Asigură-te că env.mjs exportă corect variabilele
import { Metadata } from "next"
import { notFound } from "next/navigation"

import CustomerDetails from "components/custom/TabsCustomers/CustomerDetails" // Importă componenta CustomerDetails
import { Customer } from "types/customer" // Importă interfața Customer corect

interface CustomerPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CustomerPageProps): Promise<Metadata> {
  const customer = await fetchCustomer(params.id)
  return {
    title: customer ? `Client ${customer["ID Client"]} - Optima Solutions Services` : "Client Necunoscut",
    description: customer ? `Detalii pentru clientul ${customer["ID Client"]}` : "Detalii despre client indisponibile",
  }
}

async function fetchCustomer(id: string): Promise<Customer | null> {
  try {
    const apiUrl = env.NEXT_PUBLIC_API_URL || ""
    const databases = ["UT_database", "CC_database"]

    for (const db of databases) {
      const url = apiUrl ? `${apiUrl}/api/clienti/${id}?db=${db}` : `/api/clienti/${id}?db=${db}`
      const res = await fetch(url, {
        cache: "no-store",
      })

      if (res.ok) {
        return (await res.json()) as Customer
      }

      console.warn(`Client not found in ${db}: ${res.status} ${res.statusText}`)
    }

    return null
  } catch (error) {
    console.error("Error fetching customer:", error)
    return null
  }
}

export default async function CustomerPage({ params }: CustomerPageProps): Promise<JSX.Element> {
  const customer = await fetchCustomer(params.id)

  if (!customer) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8">
      {/* Breadcrumbs au fost eliminate */}

      {/* Detalii Client */}
      <CustomerDetails customer={customer} />
    </div>
  )
}
