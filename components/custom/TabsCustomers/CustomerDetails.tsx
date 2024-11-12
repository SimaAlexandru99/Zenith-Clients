import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Separator } from "components/ui/separator"
import { Badge } from "components/ui/badge"
import { Customer, isUTCustomer, isCCCustomer } from "types/customer"

interface CustomerDetailsProps {
  customer: Customer
}

function formatDate(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return format(dateObj, "dd MMM yyyy HH:mm")
  } catch {
    return "Invalid date"
  }
}

function isValidNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value)
}

function hasValidAnswer(answer: any): boolean {
  if (typeof answer === "string") {
    return answer.trim().length > 0
  }
  if (typeof answer === "number") {
    return !isNaN(answer)
  }
  if (answer instanceof Date) {
    return !isNaN(answer.getTime())
  }
  return false
}

function getRatingColor(rating: number): "default" | "destructive" | "secondary" {
  if (rating <= 2) return "destructive"
  if (rating >= 4) return "default"
  return "secondary"
}

interface QuestionAnswerProps {
  question: string
  answer: any
  className?: string
  isRating?: boolean
}

function QuestionAnswer({ question, answer, className, isRating = false }: QuestionAnswerProps) {
  if (!hasValidAnswer(answer)) return null

  return (
    <div className={className}>
      <dt className="text-sm font-medium text-muted-foreground">{question}</dt>
      <dd className="mt-1 text-sm">
        {isRating && isValidNumber(answer) ? (
          <Badge variant={getRatingColor(answer)}>{answer}</Badge>
        ) : answer instanceof Date ? (
          formatDate(answer)
        ) : (
          answer
        )}
      </dd>
    </div>
  )
}

function CustomerDetails({ customer }: CustomerDetailsProps) {
  // Basic information section - common for both types
  function BasicInfo() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Informații de bază
            <Badge variant={customer.Status === "Sondaj complet" ? "default" : "secondary"}>{customer.Status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <QuestionAnswer question="ID Client" answer={customer["ID Client"]} />
            <QuestionAnswer question="Telefon" answer={customer.Telefon} />
            <QuestionAnswer question="Campanie" answer={customer.Campania} />
            <QuestionAnswer question="Talk Time" answer={customer["Talk time"]} />
            <QuestionAnswer question="Ziua apel" answer={customer["Ziua apel"]} />

            {isUTCustomer(customer) && (
              <>
                <QuestionAnswer question="Cod Agenție" answer={customer["Cod agentie"]} />
                <QuestionAnswer question="Medie Agenție" answer={customer["Medie agentie"]?.toFixed(2)} />
              </>
            )}
          </dl>
        </CardContent>
      </Card>
    )
  }

  // Initial questions section
  function InitialQuestions() {
    if (isUTCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Date despre vizită</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                question="Motivul vizitei"
                answer={
                  customer[
                    "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]"
                  ]
                }
              />
              <QuestionAnswer
                question="Ușurința procesului"
                answer={
                  customer[
                    "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?"
                  ]
                }
                isRating
              />
            </dl>
          </CardContent>
        </Card>
      )
    }

    if (isCCCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Date despre apel</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                question="Motivul apelului"
                answer={customer["Q0 Dar care este motivul pentru care ati sunat?"]}
              />
              <QuestionAnswer
                question="Mod de contact"
                answer={
                  customer[
                    "T2.1. Ati apelat unul din numerele de telefon de pe spatele cardului? Sau ati apelat unul din numerele de telefon de pe site-ul bancii? Cum ati procedat?"
                  ]
                }
              />
            </dl>
          </CardContent>
        </Card>
      )
    }
  }

  // Survey ratings section
  function SurveyRatings() {
    if (isUTCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Evaluare servicii în agenție</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                question="Cunoașterea produsului"
                answer={customer["Q3.1. Cunoastea produsului bancar"]}
                isRating
              />
              <QuestionAnswer
                question="Claritatea comunicării"
                answer={customer["Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici"]}
                isRating
              />
              <QuestionAnswer
                question="Disponibilitate"
                answer={customer["Q3.3. A aratat disponibilitate de a va ajuta"]}
                isRating
              />
              <QuestionAnswer
                question="Înțelegerea nevoilor"
                answer={customer["Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate"]}
                isRating
              />
              <QuestionAnswer
                question="Rapiditatea rezolvării"
                answer={customer["Q3.5. V-a rezolvat solicitarea cu rapiditate"]}
                isRating
              />
            </dl>
          </CardContent>
        </Card>
      )
    }

    // CC customer section remains the same
    if (isCCCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Evaluare servicii Call Center</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                question="Satisfacție timp de așteptare"
                answer={
                  customer[
                    "Q1 In ceea ce priveste timpul cat ati asteptat din momentul in care ati sunat la Serviciul Call Center si pana cand v-a raspuns un coleg de-al nostru, cat de multumit ati fost? Va rog sa oferiti o nota pe o scala 1-5 unde 1 inseamna foarte nemultumit, iar 5 foarte multumit"
                  ]
                }
                isRating
              />
              <QuestionAnswer
                question="Navigare meniu"
                answer={
                  customer[
                    "Q2.1 Cat de usor a fost sa gasiti in meniul robotului telefonic optiunea potrivita pentru a vorbi cu un operator?"
                  ]
                }
                isRating
              />
              <QuestionAnswer
                question="Colaborare operator"
                answer={customer["Q2.2 Cat de usor a fost sa colaborati cu operatorul Call Center?"]}
                isRating
              />
              <QuestionAnswer
                question="Calitatea informațiilor"
                answer={
                  customer[
                    "Q3.1.4 V-a oferit informatiile corecte si complete privind solicitarea in legatura cu care ati sunat;"
                  ]
                }
                isRating
              />
              <QuestionAnswer
                question="Profesionalism"
                answer={customer["Q3.6 A folosit un ton politicos/ potrivit"]}
                isRating
              />
            </dl>
          </CardContent>
        </Card>
      )
    }
  }

  // Feedback section
  function Feedback() {
    if (isUTCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Feedback și comentarii</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                className="col-span-full"
                question="Comentarii"
                answer={customer["B8. Camp deschis pentru comentarii"]}
              />
              <QuestionAnswer
                className="col-span-full"
                question="Situații legate de conduită"
                answer={customer["B7. Bifa pentru situatii legate de conduita"]}
              />
            </dl>
          </CardContent>
        </Card>
      )
    }

    if (isCCCustomer(customer)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Feedback și comentarii</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <QuestionAnswer
                className="col-span-full"
                question="Comentarii generale"
                answer={customer["QD Camp liber pentru completari"]}
              />
              <QuestionAnswer
                className="col-span-full"
                question="Motivul alegerii CEC Bank"
                answer={customer["QB Care este motivul pentru care ati ales sa colaborati cu CEC Bank?"]}
              />
              <QuestionAnswer
                className="col-span-full"
                question="Este CEC Bank banca principală?"
                answer={
                  customer[
                    "QA Este CEC Bank banca dumneavoastra principala? Banca la care aveti cele mai multe produse sau la care faceti cele mai multe tranzactii?"
                  ]
                }
              />
            </dl>
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <BasicInfo />
      <InitialQuestions />
      <SurveyRatings />
      <Feedback />
    </div>
  )
}

export default CustomerDetails
