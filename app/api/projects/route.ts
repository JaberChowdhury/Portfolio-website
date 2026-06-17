import { NextResponse } from "next/server"
import { fetchAllPortfolios } from "@/lib/github"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await fetchAllPortfolios()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in projects API route:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
