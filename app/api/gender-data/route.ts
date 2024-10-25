// app/api/gender-data/route.ts
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { env } from "env.mjs"

// Singleton pattern for MongoDB connection
let client: MongoClient | null = null

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(env.MONGODB_URI)
    await client.connect()
  }
  return client
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  // Check if the database name is provided
  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  try {
    const client = await getMongoClient()
    const db = client.db(dbName)
    const collection = db.collection("all_apeluri_collection")

    // Aggregate gender data
    const genderData = await collection
      .aggregate([
        {
          $group: {
            _id: {
              $cond: [{ $in: ["$GENDER", ["M", "F"]] }, "$GENDER", "Unknown"],
            },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    // Format the result
    const formattedData = genderData.map((item) => ({
      gender: item._id === "M" ? "Masculin" : item._id === "F" ? "Feminin" : "Clienti",
      count: item.count,
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
