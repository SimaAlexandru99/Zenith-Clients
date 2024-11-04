// components/CustomerDetails.tsx

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Customer } from "types/customer"

interface CustomerDetailsProps {
  customer: Customer
}

function hasValidAnswer(answer: string | number | null | undefined): boolean {
  if (typeof answer === "string") {
    return answer.trim().length > 0
  }
  if (typeof answer === "number") {
    return true // 0 este un răspuns valid pentru ratinguri
  }
  return false
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {/* Informații de bază */}
      <Card>
        <CardHeader>
          <CardTitle>Informații de bază</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {hasValidAnswer(customer["ID Client"]) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">ID Client</dt>
                <dd className="mt-1 text-sm">{customer["ID Client"]}</dd>
              </div>
            )}
            {hasValidAnswer(customer.Telefon) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                <dd className="mt-1 text-sm">{customer.Telefon}</dd>
              </div>
            )}
            {hasValidAnswer(customer["Cod agentie"]) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Cod Agenție</dt>
                <dd className="mt-1 text-sm">{customer["Cod agentie"]}</dd>
              </div>
            )}
            {hasValidAnswer(customer.Status) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm">{customer.Status}</dd>
              </div>
            )}
            {hasValidAnswer(customer.Campania) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Campanie</dt>
                <dd className="mt-1 text-sm">{customer.Campania}</dd>
              </div>
            )}
            {hasValidAnswer(customer["Medie agentie"]) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Medie Agenție</dt>
                <dd className="mt-1 text-sm">{customer["Medie agentie"]}</dd>
              </div>
            )}
            {hasValidAnswer(customer["Talk time"]) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Talk Time</dt>
                <dd className="mt-1 text-sm">{customer["Talk time"]}</dd>
              </div>
            )}
            {hasValidAnswer(customer["Ziua apel"]) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Ziua Apel</dt>
                <dd className="mt-1 text-sm">{customer["Ziua apel"]}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Informații despre Campanie */}
      <Card>
        <CardHeader>
          <CardTitle>Informații despre Campanie</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {hasValidAnswer(customer.Month) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Lună</dt>
                <dd className="mt-1 text-sm">{customer.Month}</dd>
              </div>
            )}
            {hasValidAnswer(customer.Campaign) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Campanie</dt>
                <dd className="mt-1 text-sm">{customer.Campaign}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Întrebări T1 - T4 */}
      <Card>
        <CardHeader>
          <CardTitle>Întrebări T1 - T4</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {hasValidAnswer(
              customer[
                "T1. Buna ziua. Numele meu este ……………… si va sun din partea CEC Bank. As putea vorbi cu dl./ dna...........?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  T1. Buna ziua. Numele meu este ……………… și vă sun din partea CEC Bank. Aș putea vorbi cu
                  dl./dna...........?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "T1. Buna ziua. Numele meu este ……………… si va sun din partea CEC Bank. As putea vorbi cu dl./ dna...........?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "T2.1. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati putea raspunde la cateva intrebari referitoare la vizita pe care ati efectuat-o luni/ .../ .../ vineri in data....... in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  T2.1. Nu vă rețin foarte mult. Ne dorim să îmbunătățim calitatea serviciilor pe care vi le oferim și
                  de aceea ne-ar ajuta/am aprecia dacă ne-ați putea răspunde la câteva întrebări referitoare la vizita
                  pe care ați efectuat-o luni/ .../ .../ vineri în data....... în Agenția CEC Bank din….. [orașul,
                  strada]. Dumneavoastră personal ați făcut această vizită?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "T2.1. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati putea raspunde la cateva intrebari referitoare la vizita pe care ati efectuat-o luni/ .../ .../ vineri in data....... in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "T2.2. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea va rugam sa ne raspundeti la cateva intrebari referitoare la vizita pe care ati efectuat-o recent in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  T2.2. Ne dorim să îmbunătățim calitatea serviciilor pe care vi le oferim și de aceea vă rugăm să ne
                  răspundeți la câteva întrebări referitoare la vizita pe care ați efectuat-o recent în Agenția CEC Bank
                  din….. [orașul, strada]. Dumneavoastră personal ați făcut această vizită?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "T2.2. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea va rugam sa ne raspundeti la cateva intrebari referitoare la vizita pe care ati efectuat-o recent in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(customer["T3. Aveti cateva minute pentru a continua aceasta discutie?"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  T3. Aveți câteva minute pentru a continua această discuție?
                </dt>
                <dd className="mt-1 text-sm">
                  {customer["T3. Aveti cateva minute pentru a continua aceasta discutie?"]}
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  T4. Motivul pentru care ați fost în unitatea CEC Bank a fost acela de a ………………. ? [citește descrierea
                  din baza de date]
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]"
                    ]
                  }
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Întrebări de Sondaj */}
      <Card>
        <CardHeader>
          <CardTitle>Întrebări de Sondaj</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {hasValidAnswer(
              customer[
                "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Q1. Voi citi câteva întrebări și variante de răspuns, cu rugămintea de a alege răspunsul care vi se
                  potrivește cel mai bine. Cât de ușor a fost să …………….. ? [citește descrierea din baza de date] Ați
                  putea să oferiți o notă pe o scală de la 1 la 5, unde 1 înseamnă foarte greu, iar 5 foarte ușor?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Q2. În ceea ce privește timpul de așteptare în agenție, până când ați fost preluat de reprezentantul
                  băncii, cât de mulțumit ați fost? Ați putea să oferiți o notă pe o scală 1-5, unde 1 reprezintă foarte
                  nemulțumit, iar 5 foarte mulțumit?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?"
                    ]
                  }
                </dd>
              </div>
            )}

            {/* Întrebări Q3 */}
            {hasValidAnswer(customer["Q3.1. Cunoastea produsului bancar"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Q3.1. Cunoștea produsul bancar</dt>
                <dd className="mt-1 text-sm">{customer["Q3.1. Cunoastea produsului bancar"]}</dd>
              </div>
            )}
            {hasValidAnswer(
              customer["Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici"]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Q3.2. A folosit un limbaj accesibil și nu a abuzat de termeni bancari sau tehnici
                </dt>
                <dd className="mt-1 text-sm">
                  {customer["Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici"]}
                </dd>
              </div>
            )}
            {hasValidAnswer(customer["Q3.3. A aratat disponibilitate de a va ajuta"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Q3.3. A arătat disponibilitate de a vă ajuta</dt>
                <dd className="mt-1 text-sm">{customer["Q3.3. A aratat disponibilitate de a va ajuta"]}</dd>
              </div>
            )}
            {hasValidAnswer(
              customer["Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate"]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Q3.4. A identificat tot ceea ce aveți nevoie, adresându-vă întrebări adecvate
                </dt>
                <dd className="mt-1 text-sm">
                  {customer["Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate"]}
                </dd>
              </div>
            )}
            {hasValidAnswer(customer["Q3.5. V-a rezolvat solicitarea cu rapiditate"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Q3.5. V-a rezolvat solicitarea cu rapiditate</dt>
                <dd className="mt-1 text-sm">{customer["Q3.5. V-a rezolvat solicitarea cu rapiditate"]}</dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "Q3.6. V-a comunicat informatii complete cu privire la costurile implicate – va rog sa evaluati strict masura in care colegul nostru v-a transmis clar informatiile despre costuri."
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Q3.6. V-a comunicat informații complete cu privire la costurile implicate – vă rog să evaluați strict
                  măsura în care colegul nostru v-a transmis clar informațiile despre costuri.
                </dt>
                <dd className="mt-1 text-sm">
                  {customer[
                    "Q3.6. V-a comunicat informatii complete cu privire la costurile implicate – va rog sa evaluati strict masura in care colegul nostru v-a transmis clar informatiile despre costuri."
                  ] ?? "N/A"}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {hasValidAnswer(
              customer[
                "B3. Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  B3. Referitor la nota/ notele de 1/2 pe care le-ați acordat - ne pare rău să auzim că sunteți
                  nemulțumit. Ne puteți oferi mai multe detalii? Ce anume v-a nemulțumit? Ce ați îmbunătăți?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "B3. Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer[
                "B4. Am observat ca ati acordat si nota/ note de 1/ 2 - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?"
              ]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  B4. Am observat că ați acordat și nota/notele de 1/2 - ne pare rău să auzim că sunteți nemulțumit. Ne
                  puteți oferi mai multe detalii? Ce anume v-a nemulțumit? Ce ați îmbunătăți?
                </dt>
                <dd className="mt-1 text-sm">
                  {
                    customer[
                      "B4. Am observat ca ati acordat si nota/ note de 1/ 2 - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?"
                    ]
                  }
                </dd>
              </div>
            )}
            {hasValidAnswer(
              customer["B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?"]
            ) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  B6. Ce putem să îmbunătățim pentru a vă oferi experiențe mai bune în viitor?
                </dt>
                <dd className="mt-1 text-sm">
                  {customer["B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?"]}
                </dd>
              </div>
            )}
            {hasValidAnswer(customer["B7. Bifa pentru situatii legate de conduita"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">B7. Bifa pentru situații legate de conduită</dt>
                <dd className="mt-1 text-sm">{customer["B7. Bifa pentru situatii legate de conduita"]}</dd>
              </div>
            )}
            {hasValidAnswer(customer["B8. Camp deschis pentru comentarii"]) && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">B8. Comentarii</dt>
                <dd className="mt-1 text-sm">{customer["B8. Camp deschis pentru comentarii"]}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerDetails
