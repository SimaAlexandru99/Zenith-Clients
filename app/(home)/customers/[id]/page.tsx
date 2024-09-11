import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { env } from "env.mjs"


interface Customer {
  _id: string
  "ID Client": number
  Telefon: number
  "Cod agentie": number
  Status: string
  Campania: string
  "Medie agentie": number
  "Talk time": string
  "Ziua apel": number
  "T1. Buna ziua. Numele meu este ……………… si va sun din partea CEC Bank. As putea vorbi cu dl./ dna...........?": string
  "T2.1. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati putea raspunde la cateva intrebari referitoare la vizita pe care ati efectuat-o luni/ .../ .../ vineri in data....... in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?": string
  "T2.2. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea va rugam sa ne raspundeti la cateva intrebari referitoare la vizita pe care ati efectuat-o recent in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?": string
  "T3. Aveti cateva minute pentru a continua aceasta discutie?": string
  "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]": string
  "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?": number
  "Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?": number
  "Q3.1. Cunoastea produsului bancar": number
  "Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici": number
  "Q3.3. A aratat disponibilitate de a va ajuta": number
  "Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate": number
  "Q3.5. V-a rezolvat solicitarea cu rapiditate": number
  "Q3.6. V-a comunicat informatii complete cu privire la costurile implicate – va rog sa evaluati strict masura in care colegul nostru v-a transmis clar informatiile despre costuri.": number | null
  "B3. Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?": string
  "Q4.1. Timpul petrecut in interactiunea cu colega/ colegul nostru": number
  "Q4.2. Costurile practicate de banca": number | null
  "Q4.3. Numarul de documente solicitate de banca": number | null
  "Q4.4. Numarul de formulare pe care le-ati completat/semnat": number
  "Q4.5. Claritatea informatiei din formularele pe care le-ati completat/semnat": number
  "B4. Am observat ca ati acordat si nota/ note de 1/ 2 - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?": string
  "Q5. Considerati ca ati primit solutia de care aveati nevoie in urma vizitei in unitate? Va rog sa acordati o nota pe o scala de la 1 la 5 unde 1 inseamna ca nu s-a rezolvat nimic, iar 5 inseamna ca situatia s-a rezolvat complet": number
  "Q6. Gandindu-va la experienta cu CEC Bank in general, cat de probabil este sa recomandati CEC Bank familiei sau prietenilor? Pe o scala de la 0 la 10, unde 0 inseamna cu siguranta nu voi recomanda, iar 10 inseamna cu siguranta voi recomanda": number
  "B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?": string
  "B7. Bifa pentru situatii legate de conduita": string
  "B8. Camp deschis pentru comentarii": string
  Month: number
  Campaign: string
}

interface CustomerPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CustomerPageProps): Promise<Metadata> {
  const customer = await fetchCustomer(params.id)
  return {
    title: customer ? `Customer ${customer["ID Client"]} - Optima Solutions Services` : "Customer Not Found",
    description: customer ? `Details for customer ${customer["ID Client"]}` : "Customer details not available",
  }
}

async function fetchCustomer(id: string): Promise<Customer | null> {
  try {
    const apiUrl = env.NEXT_PUBLIC_API_URL || `${window.location.origin}`
    const res = await fetch(`${apiUrl}/api/customers/${id}?db=UT_database`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      console.error(`Error fetching customer: ${res.status} ${res.statusText}`)
      return null
    }
    return await res.json() as Customer
  } catch (error) {
    console.error('Error fetching customer:', error)
    return null
  }
}

function CustomerDetails({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {/* Basic Information */}
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">ID Client</dt>
              <dd className="mt-1 text-sm">{customer["ID Client"]}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Telefon</dt>
              <dd className="mt-1 text-sm">{customer.Telefon}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Cod agentie</dt>
              <dd className="mt-1 text-sm">{customer["Cod agentie"]}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm">{customer.Status}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Campania</dt>
              <dd className="mt-1 text-sm">{customer.Campania}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Medie agentie</dt>
              <dd className="mt-1 text-sm">{customer["Medie agentie"]}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Talk time</dt>
              <dd className="mt-1 text-sm">{customer["Talk time"]}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Ziua apel</dt>
              <dd className="mt-1 text-sm">{customer["Ziua apel"]}</dd>
            </div>

            {/* T1 - T4 Questions */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                T1. Buna ziua. Numele meu este…
              </dt>
              <dd className="mt-1 text-sm">
                {customer[
                  "T1. Buna ziua. Numele meu este ……………… si va sun din partea CEC Bank. As putea vorbi cu dl./ dna...........?"
                ]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                T2.1. Nu va retin foarte mult...
              </dt>
              <dd className="mt-1 text-sm">
                {customer[
                  "T2.1. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati putea raspunde la cateva intrebari referitoare la vizita pe care ati efectuat-o luni/ .../ .../ vineri in data....... in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
                ]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                T2.2. Ne dorim sa imbunatatim calitatea serviciilor...
              </dt>
              <dd className="mt-1 text-sm">
                {customer[
                  "T2.2. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea va rugam sa ne raspundeti la cateva intrebari referitoare la vizita pe care ati efectuat-o recent in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
                ]}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                T3. Aveti cateva minute pentru a continua aceasta discutie?
              </dt>
              <dd className="mt-1 text-sm">{customer["T3. Aveti cateva minute pentru a continua aceasta discutie?"]}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a…
              </dt>
              <dd className="mt-1 text-sm">
                {customer[
                  "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]"
                ]}
              </dd>
            </div>

            {/* Survey Questions */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Q1. Cat de usor a fost sa …………….. ? [nota pe o scala de la 1 la 5]
              </dt>
              <dd className="mt-1 text-sm">{customer["Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?"]}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Q2. Cat de multumit ati fost de timpul de asteptare in agentie?
              </dt>
              <dd className="mt-1 text-sm">{customer["Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?"]}</dd>
            </div>

            {/* Open-ended Feedback and Comments */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">B3. Feedback privind nota de 1/2</dt>
              <dd className="mt-1 text-sm">{customer["B3. Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?"]}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">B6. Sugestii pentru imbunatatiri</dt>
              <dd className="mt-1 text-sm">{customer["B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?"]}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">B8. Comentarii</dt>
              <dd className="mt-1 text-sm">{customer["B8. Camp deschis pentru comentarii"]}</dd>
            </div>

            {/* Campaign Information */}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Month</dt>
              <dd className="mt-1 text-sm">{customer.Month}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Campaign</dt>
              <dd className="mt-1 text-sm">{customer.Campaign}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}


export default async function CustomerPage({ params }: CustomerPageProps) {
  const customer = await fetchCustomer(params.id)

  if (!customer) {
    notFound()
  }

  return (
    <div className="p-4 md:p-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Acasa</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customers">Clientii</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Clientul {customer["ID Client"]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Customer Details */}
      <CustomerDetails customer={customer} />
    </div>
  )
}