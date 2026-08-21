import { NextResponse } from "next/server"
// import { getPosts } from "@/app/blog/get-posts";
interface BlogPost {
  name: string
  route: string
  frontMatter: {
    title: string
    description: string
    date: string
    author?: string
    tags?: string[]
  }
}

const getPosts = async (): Promise<BlogPost[]> => []

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const posts = await getPosts()

    const simplified = posts.map((post) => ({
      name: post.name,
      route: post.route,
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      date: post.frontMatter.date,
      author: post.frontMatter.author,
      tags: post.frontMatter.tags ?? [],
    }))

    return NextResponse.json({ posts: simplified })
  } catch (error) {
    console.error("Error in blog-posts API route:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
