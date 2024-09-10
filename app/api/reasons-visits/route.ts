// app/api/motive-vizite/route.ts
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

    const motiveViziteData = await collection
      .aggregate([
        {
          $group: {
            _id: "$Campanie",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10, // Limit to top 10 reasons
        },
      ])
      .toArray()

    const formattedData = motiveViziteData.map((item, index) => ({
      campania: item._id,
      count: item.count,
      fill: `hsl(${index * 36}, 70%, 50%)`, // Generate a unique color for each campaign
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
