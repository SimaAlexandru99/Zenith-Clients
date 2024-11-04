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
    const collection = db.collection("all_apeluri_collection")

    const judetData = await collection
      .aggregate([
        {
          $group: {
            _id: "$JUDET",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } }, // Optional: Sort by count in descending order
      ])
      .toArray()

    const formattedData = judetData.map((item) => ({
      judet: item._id,
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
