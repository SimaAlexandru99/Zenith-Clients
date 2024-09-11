import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { env } from "env.mjs"

const uri = env.MONGODB_URI

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const [completeSurveys, incompleteSurveys] = await Promise.all([
      collection.countDocuments({ Status: "Sondaj complet" }),
      collection.countDocuments({ Status: { $ne: "Sondaj complet" } })
    ])

    return NextResponse.json({ completeSurveys, incompleteSurveys })
  } catch (error) {
    console.error("Error connecting to database:", error)
    return NextResponse.json({ error: "Could not fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}