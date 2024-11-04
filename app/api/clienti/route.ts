// app/api/customers/route.ts

import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const client = new MongoClient(env.MONGODB_URI)
let clientPromise = client.connect()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const search = searchParams.get("search")?.trim()

  if (!dbName) {
    return NextResponse.json({ error: "Database name is required" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const skip = (page - 1) * limit

    // Build the search filter
    let filter = {}
    if (search) {
      const searchNumber = parseInt(search, 10)
      const searchRegex = new RegExp(search, "i") // Case-insensitive regex

      // If search input is a valid number, include exact matches for numeric fields
      if (!isNaN(searchNumber)) {
        filter = {
          $or: [
            { "ID Client": searchNumber },
            { Telefon: searchNumber },
            { "Cod agentie": searchNumber },
            { Status: { $regex: searchRegex } },
          ],
        }
      } else {
        // If search input is not a number, search only in the Status field
        filter = {
          $or: [{ Status: { $regex: searchRegex } }],
        }
      }
    }

    // Fetch customers based on the filter, pagination
    const [customers, totalCount] = await Promise.all([
      collection
        .find(filter, {
          projection: {
            "ID Client": 1,
            Telefon: 1,
            "Cod agentie": 1,
            Status: 1,
          },
        })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
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
  }
}
