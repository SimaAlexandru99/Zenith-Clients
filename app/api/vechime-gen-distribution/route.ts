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

    const vechimeGenDistribution = await collection
      .aggregate([
        {
          $group: {
            _id: {
              vechimeGroup: {
                $switch: {
                  branches: [
                    { case: { $lte: ["$Vechime relatie", 1] }, then: "0-1" },
                    { case: { $lte: ["$Vechime relatie", 5] }, then: "1-5" },
                    { case: { $lte: ["$Vechime relatie", 10] }, then: "5-10" },
                    { case: { $lte: ["$Vechime relatie", 15] }, then: "10-15" },
                    { case: { $lte: ["$Vechime relatie", 20] }, then: "15-20" },
                  ],
                  default: "20+",
                },
              },
              gender: "$GENDER",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.vechimeGroup",
            genders: {
              $push: {
                gender: "$_id.gender",
                count: "$count",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            vechimeGroup: "$_id",
            Masculin: {
              $ifNull: [
                {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: { $filter: { input: "$genders", as: "g", cond: { $eq: ["$$g.gender", "M"] } } },
                        as: "m",
                        in: "$$m.count",
                      },
                    },
                    0,
                  ],
                },
                0,
              ],
            },
            Feminin: {
              $ifNull: [
                {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: { $filter: { input: "$genders", as: "g", cond: { $eq: ["$$g.gender", "F"] } } },
                        as: "f",
                        in: "$$f.count",
                      },
                    },
                    0,
                  ],
                },
                0,
              ],
            },
          },
        },
        {
          // Sort based on the custom order
          $addFields: {
            sortOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$vechimeGroup", "0-1"] }, then: 1 },
                  { case: { $eq: ["$vechimeGroup", "1-5"] }, then: 2 },
                  { case: { $eq: ["$vechimeGroup", "5-10"] }, then: 3 },
                  { case: { $eq: ["$vechimeGroup", "10-15"] }, then: 4 },
                  { case: { $eq: ["$vechimeGroup", "15-20"] }, then: 5 },
                  { case: { $eq: ["$vechimeGroup", "20+"] }, then: 6 },
                ],
                default: 7,
              },
            },
          },
        },
        { $sort: { sortOrder: 1 } }, // Sort by the custom order
        { $project: { sortOrder: 0 } }, // Remove sortOrder field after sorting
      ])
      .toArray()
    return NextResponse.json(vechimeGenDistribution)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
