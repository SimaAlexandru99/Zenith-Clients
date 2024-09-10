import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { env } from "env.mjs"

const uri = env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables")
}

export async function GET(request: NextRequest) {
  const dbName = request.nextUrl.searchParams.get("db")

  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const data = await collection
      .aggregate([
        {
          $group: {
            _id: {
              campania: "$Campania",
              month: "$Month",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.month": 1 },
        },
        {
          $project: {
            _id: 0,
            campania: "$_id.campania",
            month: "$_id.month",
            count: 1,
          },
        },
      ])
      .toArray()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
