import { normalizePages } from "nextra/normalize-pages";
import { getPageMap } from "nextra/page-map";

export interface BlogPost {
  name: string;
  route: string;
  frontMatter: {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    author?: string;
    [key: string]: unknown;
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    // Retrieve page map specifically for the /blog/posts path
    const pageMap = await getPageMap("/blog/posts");

    // Normalize pages to extract the structured directories/pages
    const { directories } = normalizePages({
      list: pageMap,
      route: "/blog/posts",
    });

    if (!directories) return [];

    // Filter out the index or non-post pages, and sort by date descending
    return (
      directories as {
        name: string;
        route: string;
        frontMatter?: Record<string, unknown>;
      }[]
    )
      .filter((post) => post.name !== "index" && post.frontMatter)
      .map((post) => ({
        name: post.name,
        route: post.route,
        frontMatter: (post.frontMatter || {}) as BlogPost["frontMatter"],
      }))
      .sort((a, b) => {
        const dateA = new Date(a.frontMatter.date || 0).getTime();
        const dateB = new Date(b.frontMatter.date || 0).getTime();
        return dateB - dateA;
      });
  } catch (error) {
    console.error("Error fetching blog posts from page map:", error);
    return [];
  }
}
