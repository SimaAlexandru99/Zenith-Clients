import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

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

    const q4_3Data = await collection
      .aggregate([
        {
          $project: {
            q4_3Fields: {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "field",
                cond: { $regexMatch: { input: "$$field.k", regex: /^Q4.3/ } },
              },
            },
            Campania: 1,
          },
        },
        {
          $unwind: "$q4_3Fields",
        },
        {
          $group: {
            _id: "$Campania",
            values: { $push: "$q4_3Fields.v" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            campania: "$_id",
            numericValues: {
              $filter: {
                input: "$values",
                as: "val",
                cond: {
                  $and: [{ $in: [{ $type: "$$val" }, ["double", "int"]] }, { $ne: ["$$val", NaN] }],
                },
              },
            },
            specialCases: {
              $filter: {
                input: "$values",
                as: "val",
                cond: { $not: { $in: [{ $type: "$$val" }, ["double", "int"]] } },
              },
            },
            totalResponses: "$count",
          },
        },
        {
          $project: {
            campania: 1,
            averageQ4_3: {
              $cond: [{ $gt: [{ $size: "$numericValues" }, 0] }, { $avg: "$numericValues" }, null],
            },
            numericResponsesCount: { $size: "$numericValues" },
            specialCases: 1,
            totalResponses: 1,
            noResponseCount: {
              $size: {
                $filter: {
                  input: "$specialCases",
                  as: "case",
                  cond: { $eq: ["$$case", "Nu stiu/ nu raspund"] },
                },
              },
            },
          },
        },
        {
          $sort: {
            averageQ4_3: -1,
          },
        },
      ])
      .toArray()

    return NextResponse.json(q4_3Data)
  } catch (error) {
    console.error("Error fetching Q4.3 data:", error)
    return NextResponse.json({ error: "Failed to fetch Q4.3 data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
