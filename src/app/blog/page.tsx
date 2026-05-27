import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import TagChip from "@/components/TagChip";
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

      {posts.length === 0 ? (
        <Box
          sx={{
            py: 8,
            px: 4,
            textAlign: "center",
            border: "2px dashed var(--mui-palette-divider)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ opacity: 0.6, fontSize: "1.1rem" }}>
            No posts published yet.
          </Typography>
          <Link
            href="/blog/posts/hello-world"
            style={{
              fontSize: "0.95rem",
              color: "inherit",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            Read the Hello World sample post →
          </Link>
        </Box>
      ) : (
        <Stack spacing={4}>
          {posts.map((post) => (
            <Box
              key={post.route}
              component="article"
              sx={{
                border: "1px solid var(--mui-palette-divider)",
                p: 4,
                bgcolor: "background.paper",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  transform: "translate(-6px, -6px)",
                  boxShadow: "6px 6px 0px var(--mui-palette-text-primary)",
                  borderColor: "text.primary",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mb: 1.5, alignItems: "center" }}
              >
                <Typography
                  variant="caption"
                  component="time"
                  dateTime={post.frontMatter.date}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {post.frontMatter.date
                    ? new Date(post.frontMatter.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "Draft"}
                </Typography>
                {post.frontMatter.author && (
                  <>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", opacity: 0.5 }}
                    >
                      •
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      BY {post.frontMatter.author.toUpperCase()}
                    </Typography>
                  </>
                )}
              </Stack>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1.5,
                  fontFamily: "inherit",
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                }}
              >
                <Link
                  href={post.route}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {post.frontMatter.title || post.name}
                </Link>
              </Typography>

              {post.frontMatter.description && (
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
                >
                  {post.frontMatter.description}
                </Typography>
              )}

              {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 2.5,
                    flexWrap: "wrap",
                    gap: 0.75,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "text.secondary",
                      letterSpacing: "0.1em",
                      fontSize: "0.65rem",
                      mr: 0.5,
                    }}
                  >
                    {"TAGS //"}
                  </Typography>
                  {post.frontMatter.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
