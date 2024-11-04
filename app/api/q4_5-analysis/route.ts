// /pages/api/q4_5-analysis/route.ts

import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const uri = env.MONGODB_URI

// Define allowed campaigns for Q4.5
const allowedCampaigns = [
  "achizitie mobile banking",
  "deschidere cont curent",
  "deschidere pachet de cont curent",
  // Add more campaigns as needed
]

// Create a global client to reuse the connection in serverless environments
let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  // Basic validation: Ensure dbName is provided and follows a pattern
  const dbNamePattern = /^[a-zA-Z0-9_]+$/
  if (!dbName || !dbNamePattern.test(dbName)) {
    return NextResponse.json({ error: "Invalid or missing database name" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const averageQ4_5PerCampaign = await collection
      .aggregate([
        {
          $match: {
            Campania: { $in: allowedCampaigns },
          },
        },
        {
          $project: {
            Campania: 1,
            q4_5Fields: {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "field",
                cond: { $regexMatch: { input: "$$field.k", regex: /^Q4\.5/ } },
              },
            },
          },
        },
        {
          $unwind: "$q4_5Fields",
        },
        {
          $group: {
            _id: "$Campania",
            values: { $push: "$q4_5Fields.v" },
            totalResponses: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 1,
            totalResponses: 1,
            values: 1,
            processedValues: {
              $map: {
                input: "$values",
                as: "val",
                in: {
                  $convert: {
                    input: "$$val",
                    to: "double",
                    onError: null,
                    onNull: null,
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalResponses: 1,
            values: 1,
            validValues: {
              $filter: {
                input: "$processedValues",
                as: "val",
                cond: {
                  $and: [{ $ne: ["$$val", null] }, { $gte: ["$$val", 0] }, { $lte: ["$$val", 5] }],
                },
              },
            },
          },
        },
        {
          $project: {
            campania: "$_id",
            totalResponses: 1,
            numericValues: "$values",
            validResponseCount: { $size: "$validValues" },
            averageQ4_5: {
              $cond: {
                if: { $gt: [{ $size: "$validValues" }, 0] },
                then: {
                  $round: [{ $avg: "$validValues" }, 2],
                },
                else: null,
              },
            },
            nullCount: {
              $size: {
                $filter: {
                  input: "$values",
                  as: "val",
                  cond: { $eq: ["$$val", null] },
                },
              },
            },
            zeroCount: {
              $size: {
                $filter: {
                  input: "$values",
                  as: "val",
                  cond: { $eq: ["$$val", 0] },
                },
              },
            },
            noResponseCount: {
              $size: {
                $filter: {
                  input: "$values",
                  as: "val",
                  cond: { $eq: ["$$val", "Nu stiu/ nu raspund"] },
                },
              },
            },
          },
        },
      ])
      .toArray()


    return NextResponse.json(averageQ4_5PerCampaign)
  } catch (error) {
    console.error("Error fetching Q4.5 data:", error)
    return NextResponse.json({ error: "Failed to fetch Q4.5 data" }, { status: 500 })
  }
}
