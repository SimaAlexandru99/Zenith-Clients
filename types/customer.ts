export interface Customer {
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
  "Q3.6. V-a comunicat informatii complete cu privire la costurile implicate – va rog sa evaluati strict masura in care colegul nostru v-a transmis clar informatiile despre costuri.":
    | number
    | null
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

export interface CustomersTableProps {
  customers: Customer[]
  isLoading: boolean
  error: string | null
  sortConfig: { key: keyof Customer; order: "asc" | "desc" | null } | null
  onSort: (key: keyof Customer) => void
  onDelete: (id: string) => void
  renderSkeletonRows: () => JSX.Element[]
}
