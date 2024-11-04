// app/api/agency-performance/route.ts
import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const uri = env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables")
}

// Singleton pattern for MongoDB client connection
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

    // Use MongoDB aggregation pipeline for performance
    const result = await collection
      .aggregate([
        {
          $project: {
            agencyCode: "$Cod agentie",
            q5Values: { $objectToArray: "$$ROOT" },
          },
        },
        {
          $unwind: "$q5Values",
        },
        {
          $match: {
            "q5Values.k": { $regex: "^Q5" },
            "q5Values.v": { $type: "number" },
          },
        },
        {
          $group: {
            _id: "$agencyCode",
            totalQ5: { $sum: "$q5Values.v" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: { $toInt: "$_id" },
            averageQ5: { $cond: [{ $gt: ["$count", 0] }, { $divide: ["$totalQ5", "$count"] }, null] },
          },
        },
        {
          $match: {
            averageQ5: { $ne: null },
          },
        },
      ])
      .toArray()

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
