import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { env } from "env.mjs"

const uri = env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables")
}

let client: MongoClient | null = null

async function getClient() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  try {
    const client = await getClient()
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    // Fetch all documents from the collection
    const sampleDocuments = await collection.find().toArray()

    // Initialize a dictionary to hold counts and sum of Q5 values for each agency
    const summaryPerAgency: Record<string, { totalQ5: number; count: number }> = {}

    // Iterate through each document
    sampleDocuments.forEach((document) => {
      // Check if any of the field names start with 'Q5'
      const hasQ5Fields = Object.keys(document).some((key) => key.startsWith("Q5"))

      if (hasQ5Fields) {
        const agencyCode = document["Cod agentie"] // Use this as the unique agency identifier

        if (agencyCode) {
          if (!summaryPerAgency[agencyCode]) {
            summaryPerAgency[agencyCode] = { totalQ5: 0, count: 0 }
          }

          // Update count
          summaryPerAgency[agencyCode].count += 1

          // Accumulate Q5 scores
          Object.keys(document).forEach((key) => {
            if (key.startsWith("Q5")) {
              const q5Score = document[key]
              if (typeof q5Score === "number") {
                if (summaryPerAgency[agencyCode]) {
                  summaryPerAgency[agencyCode].totalQ5 += q5Score
                }
              }
            }
          })
        }
      }
    })

    // Prepare the final response with averageQ5 and agencyCode
    const result = Object.entries(summaryPerAgency).map(([agencyCode, data]) => ({
      _id: parseInt(agencyCode), // Ensure the agency code remains an integer
      averageQ5: data.count > 0 ? data.totalQ5 / data.count : 0,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing data:", error)
    return NextResponse.json({ error: "Could not process data" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
