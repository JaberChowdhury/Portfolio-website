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
    order?: number;
    [key: string]: unknown;
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    // Retrieve page map specifically for the /blog/posts path
    const pageMap = await getPageMap("/blog/posts");

    const posts: BlogPost[] = [];

    // Recursively collect all MDX files in the page map structure
    function collect(items: unknown[]) {
      for (const item of items) {
        if (item && typeof item === "object") {
          const pageItem = item as {
            name?: string;
            route?: string;
            children?: unknown[];
            frontMatter?: Record<string, unknown>;
          };
          if (pageItem.children) {
            collect(pageItem.children);
          } else if (pageItem.frontMatter && pageItem.route) {
            const name =
              pageItem.name === "page" || pageItem.name === "index"
                ? pageItem.route.split("/").pop() || pageItem.name
                : pageItem.name || "";

            if (name !== "index" && name !== "page") {
              posts.push({
                name,
                route: pageItem.route,
                frontMatter: pageItem.frontMatter as BlogPost["frontMatter"],
              });
            }
          }
        }
      }
    }

    collect(pageMap);

    // Sort posts:
    // 1. If both have "order", sort by "order" ascending.
    // 2. If only one has "order", that one comes first.
    // 3. Otherwise, sort by "date" descending.
    return posts.sort((a, b) => {
      const orderA = a.frontMatter.order;
      const orderB = b.frontMatter.order;

      if (orderA !== undefined && orderB !== undefined) {
        return Number(orderA) - Number(orderB);
      }
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;

      const dateA = new Date(a.frontMatter.date || 0).getTime();
      const dateB = new Date(b.frontMatter.date || 0).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching blog posts from page map:", error);
    return [];
  }
}
