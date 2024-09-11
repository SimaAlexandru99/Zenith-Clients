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

    const topAgencies = await collection
      .aggregate([
        {
          $match: {
            "Q5. Considerati ca ati primit solutia de care aveati nevoie in urma vizitei in unitate?": {
              $exists: true,
              $ne: null,
            },
          },
        },
        {
          $group: {
            _id: "$Cod agentie", // Group by agency code
            averageRating: {
              $avg: "$Q5. Considerati ca ati primit solutia de care aveati nevoie in urma vizitei in unitate?",
            }, // Calculate average of Q5
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            averageRating: -1, // Sort by the average Q5 score
            _id: 1, // Secondary sort by agency code for consistency
          },
        },
        {
          $limit: 7, // Limit to top 7 agencies
        },
      ])
      .toArray()

    return NextResponse.json(topAgencies)
  } catch (error) {
    console.error("Error connecting to database:", error)
    return NextResponse.json({ error: "Could not fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
