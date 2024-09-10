// app/api/gender-data/route.ts
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
    const collection = db.collection("all_apeluri_collection")

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

    const formattedData = genderData.map((item) => ({
      gender: item._id === "M" ? "Masculin" : item._id === "F" ? "Feminin" : "Clienti",
      count: item.count,
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
