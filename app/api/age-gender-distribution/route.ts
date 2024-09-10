// app/api/age-gender-distribution/route.ts
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

    const ageGenderDistribution = await collection
      .aggregate([
        {
          $group: {
            _id: {
              ageGroup: {
                $switch: {
                  branches: [
                    { case: { $lte: ["$Varsta", 25] }, then: "0-25" },
                    { case: { $lte: ["$Varsta", 30] }, then: "25-30" },
                    { case: { $lte: ["$Varsta", 40] }, then: "30-40" },
                    { case: { $lte: ["$Varsta", 50] }, then: "40-50" },
                    { case: { $lte: ["$Varsta", 60] }, then: "50-60" },
                  ],
                  default: ">=60",
                },
              },
              gender: "$GENDER",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.ageGroup",
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
            ageGroup: "$_id",
            M: {
              $ifNull: [
                { $arrayElemAt: [{ $filter: { input: "$genders", as: "g", cond: { $eq: ["$$g.gender", "M"] } } }, 0] },
                { count: 0 },
              ],
            },
            F: {
              $ifNull: [
                { $arrayElemAt: [{ $filter: { input: "$genders", as: "g", cond: { $eq: ["$$g.gender", "F"] } } }, 0] },
                { count: 0 },
              ],
            },
          },
        },
        {
          $project: {
            ageGroup: 1,
            Masculin: "$M.count",
            Feminin: "$F.count",
          },
        },
        { $sort: { ageGroup: 1 } },
      ])
      .toArray()

    return NextResponse.json(ageGenderDistribution)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  } finally {
    await client.close()
  }
}
