// app/api/customers/route.ts
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { env } from "env.mjs"

const uri = env.MONGODB_URI

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")

  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const skip = (page - 1) * limit

    const [customers, totalCount] = await Promise.all([
      collection
        .find(
          {},
          {
            projection: {
              "ID Client": 1,
              Telefon: 1,
              "Cod agentie": 1,
              Status: 1,
            },
          }
        )
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments({}),
    ])

    return NextResponse.json({
      customers,
      total: totalCount,
      page,
      limit,
    })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  } finally {
    await client.close()
  }
}
