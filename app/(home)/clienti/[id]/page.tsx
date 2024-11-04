// app/(home)/clienti/[id]/page.tsx

import { Metadata } from "next"
import { notFound } from "next/navigation"

import { env } from "env.mjs" // Asigură-te că env.mjs exportă corect variabilele
import { Customer } from "types/customer" // Importă interfața Customer corect
import CustomerDetails from "components/custom/TabsCustomers/CustomerDetails" // Importă componenta CustomerDetails

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
    const apiUrl = env.NEXT_PUBLIC_API_URL || ''
    // Dacă NEXT_PUBLIC_API_URL este definit, folosește-l; altfel, folosește URL-ul relativ
    const url = apiUrl ? `${apiUrl}/api/clienti/${id}?db=UT_database` : `/api/clienti/${id}?db=UT_database`
    const res = await fetch(url, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`Eroare la obținerea clientului: ${res.status} ${res.statusText}`)
      return null
    }
    return (await res.json()) as Customer
  } catch (error) {
    console.error("Eroare la obținerea clientului:", error)
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
