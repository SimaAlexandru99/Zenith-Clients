import { env } from "env.mjs"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

const uri = env.MONGODB_URI

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dbName = searchParams.get("db")

  if (!dbName) {
    return NextResponse.json({ error: "Numele bazei de date este necesar" }, { status: 400 })
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("sc_si_collection")

    const waitTimeData = await collection
      .aggregate([
        {
          $project: {
            q2Fields: {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "item",
                cond: { $regexMatch: { input: "$$item.k", regex: /^Q2\./ } },
              },
            },
            codAgentie: "$Cod agentie", // Adăugăm codul agenției la proiecție
          },
        },
        {
          $unwind: "$q2Fields",
        },
        {
          $group: {
            _id: {
              rating: {
                $cond: {
                  if: { $in: [{ $type: "$q2Fields.v" }, ["double", "int", "long", "string"]] },
                  then: {
                    $cond: {
                      if: {
                        $or: [
                          { $eq: ["$q2Fields.v", "6. Nu stiu/ nu raspund"] },
                          { $eq: ["$q2Fields.v", "Nu stiu/ nu raspund"] },
                        ],
                      },
                      then: "Nu stiu/ nu raspund",
                      else: "$q2Fields.v",
                    },
                  },
                  else: "Altele",
                },
              },
              codAgentie: "$codAgentie", // Grupăm și după codul agenției
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.rating": 1 },
        },
      ])
      .toArray()

    const formattedData = waitTimeData.map((item) => {
      let rating: string | number = item._id.rating

      // Convert numeric strings to numbers
      if (typeof rating === "string" && !isNaN(Number(rating))) {
        rating = Number(rating)
      }

      // Handle null, undefined, or other non-standard values
      if (rating === null || rating === undefined) {
        rating = "Nedefinit"
      }

      return {
        rating,
        codAgentie: item._id.codAgentie,
        count: item.count,
      }
    })

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Eroare la conectarea la baza de date:", error)
    return NextResponse.json({ error: "Nu s-a putut obține datele" }, { status: 500 })
  } finally {
    await client.close()
  }
}
