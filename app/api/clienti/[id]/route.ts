import { env } from "env.mjs"
import { MongoClient, ObjectId } from "mongodb"
import { NextResponse } from "next/server"

const uri = env.MONGODB_URI

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  const client = new MongoClient(uri)

  try {
    await client.connect()
    if (!dbName) {
      return NextResponse.json({ error: "Database name is required" }, { status: 400 })
    }
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const customer = await collection.findOne({ _id: new ObjectId(params.id) })

    if (!customer) {
      return NextResponse.json({ error: "Clientul nu a fost găsit" }, { status: 404 })
    }

    // Transform the data to handle null values and format dates
    const transformedCustomer = {
      ...customer,
      "Talk time": customer["Talk time"] ? new Date(customer["Talk time"]).toLocaleString() : "N/A",
      Start_Date: customer["Start_Date"] ? new Date(customer["Start_Date"]).toLocaleString() : "N/A",
      End_Date: customer["End_Date"] ? new Date(customer["End_Date"]).toLocaleString() : "N/A",
    }

    return NextResponse.json(transformedCustomer)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  } finally {
    await client.close()
  }
}
