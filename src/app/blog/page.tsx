import { Box, Typography } from "@mui/material";
import BlogPostsView from "@/components/blog/BlogPostsView";
import { getPosts } from "./get-posts";

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <Box>
      <Box
        sx={{
          mb: 6,
          borderBottom: "2px solid var(--mui-palette-divider)",
          pb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontFamily: "inherit",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Writing & Insights
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: "1.15rem", lineHeight: 1.6 }}
        >
          Articles, guides, and thoughts on web development, modern interfaces,
          and building with code.
        </Typography>
      </Box>

      <BlogPostsView posts={posts} />
    </Box>
  );
}
