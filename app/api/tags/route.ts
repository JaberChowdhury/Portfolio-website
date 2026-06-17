import { NextResponse } from "next/server"
// import { getPosts } from "@/app/blog/get-posts";
const getPosts = async (): Promise<any[]> => []
import { fetchAllSummaries } from "@/lib/github"

export const dynamic = "force-dynamic"

export interface TagEntry {
  tag: string
  blogCount: number
  projectCount: number
  total: number
}

export async function GET() {
  try {
    // Fetch blog posts and project summaries in parallel
    const [posts, projects] = await Promise.all([
      getPosts(),
      fetchAllSummaries(),
    ])

    const tagMap = new Map<string, { blog: number; project: number }>()

    // Aggregate blog post tags
    for (const post of posts) {
      for (const tag of post.frontMatter.tags ?? []) {
        const normalized = tag.toLowerCase().trim()
        const entry = tagMap.get(normalized) ?? { blog: 0, project: 0 }
        entry.blog += 1
        tagMap.set(normalized, entry)
      }
    }

    // Aggregate project topics
    for (const project of projects) {
      for (const topic of project.topics ?? []) {
        const normalized = topic.toLowerCase().trim()
        const entry = tagMap.get(normalized) ?? { blog: 0, project: 0 }
        entry.project += 1
        tagMap.set(normalized, entry)
      }
    }

    const tags: TagEntry[] = Array.from(tagMap.entries())
      .map(([tag, counts]) => ({
        tag,
        blogCount: counts.blog,
        projectCount: counts.project,
        total: counts.blog + counts.project,
      }))
      .sort((a, b) => b.total - a.total)

    return NextResponse.json({ tags })
  } catch (error) {
    console.error("Error in tags API route:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
