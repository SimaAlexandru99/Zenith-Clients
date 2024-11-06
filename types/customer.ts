// types/customer.ts

// Base interface with common fields between UT and CC databases
export interface BaseCustomer {
  _id: string
  "ID Client": number
  Telefon: number
  Status: string
  Campania: string
  "Talk time": string
  "Ziua apel": number
  Month: number
  Campaign: string
}

// Interface for Unit Teritoriale (UT) database
export interface UTCustomer extends BaseCustomer {
  "Cod agentie": number
  "Medie agentie": number

  // Initial questions (T series)
  "T1. Buna ziua. Numele meu este ……………… si va sun din partea CEC Bank. As putea vorbi cu dl./ dna...........?": string
  "T2.1. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati putea raspunde la cateva intrebari referitoare la vizita pe care ati efectuat-o luni/ .../ .../ vineri in data....... in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?": string
  "T2.2. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea va rugam sa ne raspundeti la cateva intrebari referitoare la vizita pe care ati efectuat-o recent in Agentia CEC Bank din….. [orasul, strada] Dumneavoastra personal ati facut aceasta vizita?": string
  "T3. Aveti cateva minute pentru a continua aceasta discutie?": string
  "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]": string

  // Main questions (Q series)
  "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?": number
  "Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?": number

  // Service quality assessment (Q3 series)
  "Q3.1. Cunoastea produsului bancar": number
  "Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici": number
  "Q3.3. A aratat disponibilitate de a va ajuta": number
  "Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate": number
  "Q3.5. V-a rezolvat solicitarea cu rapiditate": number
  "Q3.6. V-a comunicat informatii complete cu privire la costurile implicate – va rog sa evaluati strict masura in care colegul nostru v-a transmis clar informatiile despre costuri.":
    | number
    | null

  // Experience assessment (Q4 series)
  "Q4.1. Timpul petrecut in interactiunea cu colega/ colegul nostru": number
  "Q4.2. Costurile practicate de banca": number | null
  "Q4.3. Numarul de documente solicitate de banca": number | null
  "Q4.4. Numarul de formulare pe care le-ati completat/semnat": number
  "Q4.5. Claritatea informatiei din formularele pe care le-ati completat/semnat": number

  // Overall satisfaction
  "Q5. Considerati ca ati primit solutia de care aveati nevoie in urma vizitei in unitate? Va rog sa acordati o nota pe o scala de la 1 la 5 unde 1 inseamna ca nu s-a rezolvat nimic, iar 5 inseamna ca situatia s-a rezolvat complet": number
  "Q6. Gandindu-va la experienta cu CEC Bank in general, cat de probabil este sa recomandati CEC Bank familiei sau prietenilor? Pe o scala de la 0 la 10, unde 0 inseamna cu siguranta nu voi recomanda, iar 10 inseamna cu siguranta voi recomanda": number

  // Feedback and comments (B series)
  "B3. Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?": string
  "B4. Am observat ca ati acordat si nota/ note de 1/ 2 - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit? Ce ati imbunatatii?": string
  "B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?": string
  "B7. Bifa pentru situatii legate de conduita": string
  "B8. Camp deschis pentru comentarii": string
}

// Interface for Call Center (CC) database
export interface CCCustomer extends BaseCustomer {
  // Initial questions (T series)
  "T2. Nu va retin foarte mult. Ne dorim sa imbunatatim calitatea serviciilor pe care vi le oferim si de aceea ne-ar ajuta/am aprecia daca ne-ati raspunde la cateva intrebari referitoare la aplicatia bancii pentru telefonul mobil. In baza noastra de date este inregistrat ca ati utilizat-o in zilele anterioare. Ati folosit dvs, personal, aplicatia pentru telefon?": string
  "T2.1. Ati apelat unul din numerele de telefon de pe spatele cardului? Sau ati apelat unul din numerele de telefon de pe site-ul bancii? Cum ati procedat?": string
  "T2.2 Imi puteti spune numarul sa il notez?": string
  "T3 Aveti cateva minute pentru a continua aceasta discutie?": string
  "T4 Motivul pentru care ati sunat la Serviciul Clienti a fost acela de a ………………. ?": string

  // Main questions (Q series)
  "Q0 Dar care este motivul pentru care ati sunat?": string
  "Q1 In ceea ce priveste timpul cat ati asteptat din momentul in care ati sunat la Serviciul Call Center si pana cand v-a raspuns un coleg de-al nostru, cat de multumit ati fost? Va rog sa oferiti o nota pe o scala 1-5 unde 1 inseamna foarte nemultumit, iar 5 foarte multumit": number
  "Q2.1 Cat de usor a fost sa gasiti in meniul robotului telefonic optiunea potrivita pentru a vorbi cu un operator?": number
  "Q2.2 Cat de usor a fost sa colaborati cu operatorul Call Center?": number

  // Service quality assessment (Q3 series)
  "Q3.1.1 Cunoastea produsul bancar in legatura cu care ati sunat;": number | null
  "Q3.1.2 Cunoastea pasii necesari pentru a realiza solicitarea in legatura cu care ati sunat": number | null
  "Q3.1.3 V-a rezolvat solicitarea in legatura cu care ati suna;": number | null
  "Q3.1.4 V-a oferit informatiile corecte si complete privind solicitarea in legatura cu care ati sunat;": number
  "Q3.2 A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici;": number
  "Q3.3 A aratat disponibilitate de a va ajuta;": number
  "Q3.4 A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate;": number
  "Q3.5 V-a oferit cu rapiditate informatiile dorite.": number
  "Q3.6 A folosit un ton politicos/ potrivit": number

  // Overall satisfaction and feedback
  "Q4 Considerati ca ati primit solutia sau informatia de care aveati nevoie in urma apelului la Serviciul Call Center? Va rog sa acordati o nota pe o scala 1-5 unde 1 inseamna ca nu s-a rezolvat nimic, iar 5 inseamna ca situatia s-a rezolvat complet": number
  "Q5 Gandindu-va la experienta cu CEC Bank in general, cat de probabil este sa recomandati CEC Bank familiei sau prietenilor? Pe o scala de la 0 la 10, unde 0 inseamna cu siguranta nu voi recomanda, iar 10 inseamna cu siguranta voi recomanda": number

  // Additional questions (QA-QD series)
  "QA Este CEC Bank banca dumneavoastra principala? Banca la care aveti cele mai multe produse sau la care faceti cele mai multe tranzactii?": string
  "QB Care este motivul pentru care ati ales sa colaborati cu CEC Bank?": string
  "QC Ce ar trebui sa faca CEC Bank ca sa devina banca dumneavoastra principala?": string
  "QD Camp liber pentru completari": string

  // Feedback sections (B series)
  "B2 Ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit, ce ati imbunatati?": string
  "B3 Referitor la nota/ notele de 1/ 2 pe care le-ati acordat - ne pare rau sa auzim ca sunteti nemultumit. Ne puteti oferi mai multe detalii? Ce anume v-a nemultumit, ce ati imbunatati?": string
  "B4 Ne pare rau sa auzim ca nu s-a rezolvat in timpul aceluiasi apel. Ne puteti oferi mai multe detalii? Ce anume v-a comunicat colegul cu care ati discutat?": string
  "B5 Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?": string

  // Metadata
  Start_Date: string
  End_Date: string
}

// Union type for both customer types
export type Customer = UTCustomer | CCCustomer

// Type guards
export function isUTCustomer(customer: Customer): customer is UTCustomer {
  return customer.Campaign === "UT"
}

export function isCCCustomer(customer: Customer): customer is CCCustomer {
  return customer.Campaign === "CC"
}

// Constants for rating scales
export const RATING_SCALES = {
  SATISFACTION: {
    MIN: 0,
    MAX: 10,
    DETRACTOR_MAX: 6,
    PASSIVE_MAX: 8,
    PROMOTER_MIN: 9,
  },
  SERVICE_QUALITY: {
    MIN: 1,
    MAX: 5,
    POOR: 2,
    GOOD: 4,
  },
} as const

// Common field mappings between UT and CC
export const FIELD_MAPPINGS = {
  SATISFACTION_SCORE: {
    UT: "Q6. Gandindu-va la experienta cu CEC Bank in general, cat de probabil este sa recomandati CEC Bank familiei sau prietenilor? Pe o scala de la 0 la 10, unde 0 inseamna cu siguranta nu voi recomanda, iar 10 inseamna cu siguranta voi recomanda",
    CC: "Q5 Gandindu-va la experienta cu CEC Bank in general, cat de probabil este sa recomandati CEC Bank familiei sau prietenilor? Pe o scala de la 0 la 10, unde 0 inseamna cu siguranta nu voi recomanda, iar 10 inseamna cu siguranta voi recomanda",
  },
  FEEDBACK: {
    UT: "B6. Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?",
    CC: "B5 Ce putem sa imbunatatim pentru a va oferi experiente mai bune in viitor?",
  },
} as const

// Result types
type NPSCategory = "promoter" | "passive" | "detractor"
type CustomerSentiment = "positive" | "neutral" | "negative"

// Customer adapter class
export class CustomerAdapter {
  // Main normalize method
  public static normalize(customer: Customer) {
    const base = {
      id: customer._id,
      clientId: customer["ID Client"],
      phone: customer.Telefon,
      status: customer.Status,
      campaign: customer.Campaign,
      talkTime: customer["Talk time"],
      callDay: customer["Ziua apel"],
      month: customer.Month,

      // Methods
      getSatisfactionScore: () => this.getSatisfactionScore(customer),
      getFeedback: () => this.getFeedback(customer),
      getServiceQualityAverage: () => this.getServiceQualityAverage(customer),
      getNPSCategory: () => this.getNPSCategory(customer),
      getCustomerSentiment: () => this.getCustomerSentiment(customer),
      hasLowScores: () => this.hasLowScores(customer),
      needsFollowUp: () => this.needsFollowUp(customer),
      getAllScores: () => this.getAllScores(customer),
    }

    return {
      ...base,
      ...this.getTypeSpecificData(customer),
    }
  }

  // Private utility methods
  private static getSatisfactionScore(customer: Customer): number {
    if (isUTCustomer(customer)) {
      return customer[FIELD_MAPPINGS.SATISFACTION_SCORE.UT]
    }
    if (isCCCustomer(customer)) {
      return customer[FIELD_MAPPINGS.SATISFACTION_SCORE.CC]
    }
    return 0
  }

  private static getFeedback(customer: Customer): string {
    if (isUTCustomer(customer)) {
      return customer[FIELD_MAPPINGS.FEEDBACK.UT]
    }
    if (isCCCustomer(customer)) {
      return customer[FIELD_MAPPINGS.FEEDBACK.CC]
    }
    return ""
  }

  private static getServiceQualityAverage(customer: Customer): number {
    if (isUTCustomer(customer)) {
      const scores = [
        customer["Q3.1. Cunoastea produsului bancar"],
        customer["Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici"],
        customer["Q3.3. A aratat disponibilitate de a va ajuta"],
        customer["Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate"],
        customer["Q3.5. V-a rezolvat solicitarea cu rapiditate"],
      ].filter((score): score is number => score !== null)

      return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    }

    if (isCCCustomer(customer)) {
      const scores = [
        customer["Q3.2 A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici;"],
        customer["Q3.3 A aratat disponibilitate de a va ajuta;"],
        customer["Q3.4 A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate;"],
        customer["Q3.5 V-a oferit cu rapiditate informatiile dorite."],
        customer["Q3.6 A folosit un ton politicos/ potrivit"],
      ].filter((score): score is number => score !== null)

      return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    }

    return 0
  }

  private static getNPSCategory(customer: Customer): NPSCategory {
    const score = this.getSatisfactionScore(customer)
    if (score >= RATING_SCALES.SATISFACTION.PROMOTER_MIN) return "promoter"
    if (score > RATING_SCALES.SATISFACTION.DETRACTOR_MAX) return "passive"
    return "detractor"
  }

  private static getCustomerSentiment(customer: Customer): CustomerSentiment {
    const avgScore = this.getServiceQualityAverage(customer)
    const satisfactionScore = this.getSatisfactionScore(customer)

    const normalizedSatisfaction = satisfactionScore / RATING_SCALES.SATISFACTION.MAX
    const normalizedQuality = avgScore / RATING_SCALES.SERVICE_QUALITY.MAX

    const overallScore = (normalizedSatisfaction + normalizedQuality) / 2

    if (overallScore >= 0.7) return "positive"
    if (overallScore >= 0.4) return "neutral"
    return "negative"
  }

  private static hasLowScores(customer: Customer): boolean {
    return this.getAllScores(customer).some((score) => score <= RATING_SCALES.SERVICE_QUALITY.POOR)
  }

  private static needsFollowUp(customer: Customer): boolean {
    const hasLowScores = this.hasLowScores(customer)
    const isDetractor = this.getNPSCategory(customer) === "detractor"
    const hasFeedback = Boolean(this.getFeedback(customer)?.trim())

    return hasLowScores || isDetractor || hasFeedback
  }

  private static getTypeSpecificData(customer: Customer) {
    if (isUTCustomer(customer)) {
      return {
        agencyCode: customer["Cod agentie"],
        agencyAverage: customer["Medie agentie"],
        visitPurpose:
          customer[
            "T4. Motivul pentru care ati fost in unitatea CEC Bank a fost acela de a ………………. ? [citeste descrierea din baza de date]"
          ],
      }
    }

    if (isCCCustomer(customer)) {
      return {
        callReason: customer["Q0 Dar care este motivul pentru care ati sunat?"],
        isMainBank:
          customer[
            "QA Este CEC Bank banca dumneavoastra principala? Banca la care aveti cele mai multe produse sau la care faceti cele mai multe tranzactii?"
          ],
        choiceReason: customer["QB Care este motivul pentru care ati ales sa colaborati cu CEC Bank?"],
        callStartDate: customer.Start_Date,
        callEndDate: customer.End_Date,
      }
    }

    return {}
  }

  private static getAllScores(customer: Customer): number[] {
    if (isUTCustomer(customer)) {
      return [
        customer[
          "Q1. Va voi citi cateva intrebari si variante de raspuns, cu rugamintea de a alege raspunsul care vi se potriveste cel mai bine. Cat de usor a fost sa …………….. ? [citeste descrierea din baza de date] Ati putea sa oferiti o nota pe o scala de la 1 la 5, unde 1 inseamna foarte greu, iar 5 foarte usor?"
        ],
        customer[
          "Q2. In ceea ce priveste timpul de asteptare in agentie, pana cand ati fost preluat de reprezentantul bancii, cat de multumit ati fost? Ati putea sa oferiti o nota pe o scala 1-5 unde 1 reprezinta foarte nemultumit, iar 5 foarte multumit?"
        ],
        customer["Q3.1. Cunoastea produsului bancar"],
        customer["Q3.2. A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici"],
        customer["Q3.3. A aratat disponibilitate de a va ajuta"],
        customer["Q3.4. A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate"],
        customer["Q3.5. V-a rezolvat solicitarea cu rapiditate"],
      ].filter((score): score is number => score !== null)
    }

    if (isCCCustomer(customer)) {
      return [
        customer[
          "Q1 In ceea ce priveste timpul cat ati asteptat din momentul in care ati sunat la Serviciul Call Center si pana cand v-a raspuns un coleg de-al nostru, cat de multumit ati fost? Va rog sa oferiti o nota pe o scala 1-5 unde 1 inseamna foarte nemultumit, iar 5 foarte multumit"
        ],
        customer[
          "Q2.1 Cat de usor a fost sa gasiti in meniul robotului telefonic optiunea potrivita pentru a vorbi cu un operator?"
        ],
        customer["Q2.2 Cat de usor a fost sa colaborati cu operatorul Call Center?"],
        customer["Q3.2 A folosit un limbaj accesibil si nu a abuzat de termeni bancari sau tehnici;"],
        customer["Q3.3 A aratat disponibilitate de a va ajuta;"],
        customer["Q3.4 A identificat tot ceea ce aveati nevoie, adresandu-va intrebari adecvate;"],
        customer["Q3.5 V-a oferit cu rapiditate informatiile dorite."],
        customer["Q3.6 A folosit un ton politicos/ potrivit"],
      ].filter((score): score is number => score !== null)
    }

    return []
  }
}

// Table props interface
export interface CustomersTableProps {
  customers: Customer[]
  isLoading: boolean
  error: string | null
  sortConfig: { key: keyof Customer; order: "asc" | "desc" | null } | null
  onSort: (key: keyof Customer) => void
  onDelete: (id: string) => void
  renderSkeletonRows: () => JSX.Element[]
  selectedCustomers?: string[]
  onSelectCustomer?: (id: string) => void
  onSelectAll?: () => void
  pageSize?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  totalCustomers?: number
  filters?: CustomerFilters
  onFilterChange?: (filters: CustomerFilters) => void
}

// Filter interface
export interface CustomerFilters {
  campaign?: string[]
  status?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  satisfactionScore?: {
    min: number
    max: number
  }
  searchTerm?: string
}

// Statistics interface for aggregating customer data
export interface CustomerStatistics {
  totalCustomers: number
  avgSatisfactionScore: number
  npsScore: number
  promoters: number
  passives: number
  detractors: number
  avgServiceQuality: number
  needsFollowUp: number
  sentimentDistribution: {
    positive: number
    neutral: number
    negative: number
  }
}

// Export utility function to calculate statistics
export function calculateCustomerStatistics(customers: Customer[]): CustomerStatistics {
  const adapter = CustomerAdapter
  const stats = customers.reduce(
    (acc, customer) => {
      const normalized = adapter.normalize(customer)
      const satisfaction = normalized.getSatisfactionScore()
      const npsCategory = normalized.getNPSCategory()
      const sentiment = normalized.getCustomerSentiment()
      const serviceQuality = normalized.getServiceQualityAverage()
      const needsFollowUp = normalized.needsFollowUp()

      return {
        totalCustomers: acc.totalCustomers + 1,
        totalSatisfaction: acc.totalSatisfaction + satisfaction,
        totalServiceQuality: acc.totalServiceQuality + serviceQuality,
        promoters: acc.promoters + (npsCategory === "promoter" ? 1 : 0),
        passives: acc.passives + (npsCategory === "passive" ? 1 : 0),
        detractors: acc.detractors + (npsCategory === "detractor" ? 1 : 0),
        needsFollowUp: acc.needsFollowUp + (needsFollowUp ? 1 : 0),
        sentimentDistribution: {
          positive: acc.sentimentDistribution.positive + (sentiment === "positive" ? 1 : 0),
          neutral: acc.sentimentDistribution.neutral + (sentiment === "neutral" ? 1 : 0),
          negative: acc.sentimentDistribution.negative + (sentiment === "negative" ? 1 : 0),
        },
      }
    },
    {
      totalCustomers: 0,
      totalSatisfaction: 0,
      totalServiceQuality: 0,
      promoters: 0,
      passives: 0,
      detractors: 0,
      needsFollowUp: 0,
      sentimentDistribution: {
        positive: 0,
        neutral: 0,
        negative: 0,
      },
    }
  )

  const npsScore = ((stats.promoters - stats.detractors) / stats.totalCustomers) * 100

  return {
    totalCustomers: stats.totalCustomers,
    avgSatisfactionScore: stats.totalSatisfaction / stats.totalCustomers,
    npsScore,
    promoters: stats.promoters,
    passives: stats.passives,
    detractors: stats.detractors,
    avgServiceQuality: stats.totalServiceQuality / stats.totalCustomers,
    needsFollowUp: stats.needsFollowUp,
    sentimentDistribution: stats.sentimentDistribution,
  }
}

export default CustomerAdapter
