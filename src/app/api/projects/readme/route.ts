import { type NextRequest, NextResponse } from "next/server";
import { fetchReadmeHtml } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const repo = searchParams.get("repo");
    const branch = searchParams.get("branch");

    if (!repo || !branch) {
      return NextResponse.json(
        { error: "Missing required query parameters: repo, branch" },
        { status: 400 },
      );
    }

    const readmeHtml = await fetchReadmeHtml(repo, branch);
    return NextResponse.json({ readmeHtml });
  } catch (error) {
    console.error("Error fetching/compiling readme in API route:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve or compile the README";
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
