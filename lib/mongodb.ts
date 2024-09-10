// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

export async function connectToDatabase(dbName: string) {
  await client.connect()
  return client.db(dbName)
}

export async function fetchGenderData(dbName: string) {
  const db = await connectToDatabase(dbName)
  const collection = db.collection("all_apeluri_collection")

  const genderData = await collection
    .aggregate([
      {
        $group: {
          _id: "$GENDER",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray()

  return genderData.map((item) => ({
    gender: item._id === "M" ? "Masculin" : "Feminin",
    count: item.count,
    fill: item._id === "M" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
  }))
}
