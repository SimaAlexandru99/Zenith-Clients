import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

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

    // Count surveys where the Status is exactly "Sondaj complet"
    const completeSurveys = await collection.countDocuments({ Status: "Sondaj complet" })

    // Count surveys where the Status is exactly "Sondaj incomplet"
    const incompleteSurveys = await collection.countDocuments({ Status: "Sondaj incomplet" })


    return NextResponse.json({ completeSurveys, incompleteSurveys })
  } catch (error) {
    console.error("Error fetching survey data:", error)
    return NextResponse.json({ error: "Could not fetch data" }, { status: 500 })
  }
}
