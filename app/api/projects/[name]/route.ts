import { NextResponse } from "next/server";
import { fetchAllSummaries, fetchDetailedRepo } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  try {
    // If the client literally requests index.json, serve the lightweight summaries
    if (name === "index.json") {
      const data = await fetchAllSummaries();
      return NextResponse.json(data);
    }

    // Strip out the .json suffix if the client request contains it
    const repoName = name.endsWith(".json") ? name.slice(0, -5) : name;
    const data = await fetchDetailedRepo(repoName);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in dynamic project API route for "${name}":`, error);
    return NextResponse.json(
      { error: `Failed to fetch project details for "${name}"` },
      { status: 500 },
    );
  }
}
