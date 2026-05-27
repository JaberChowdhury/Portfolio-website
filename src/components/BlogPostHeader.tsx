import { Avatar, Box, Stack, Typography } from "@mui/material";
import TagChip from "./TagChip";
import TextToSpeech from "./TextToSpeech";

interface BlogPostHeaderProps {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  readingTime?: string;
}

export function BlogPostHeader({
  title,
  date,
  author,
  tags,
  readingTime = "4 MIN READ",
}: BlogPostHeaderProps) {
  // Get initials for the author avatar
  const initials = author
    ? author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "JC";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        mb: 8,
        pb: 5,
        borderBottom: "4px solid var(--mui-palette-text-primary)",
        position: "relative",
      }}
    >
      {/* Category Indicator */}
      <Typography
        variant="caption"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: "primary.contrastText",
          bgcolor: "primary.main", // Cyan accent
          px: 1.5,
          py: 0.5,
          letterSpacing: "0.15em",
          display: "inline-block",
          mb: 3,
        }}
      >
        {"ARTICLE // WRITING"}
      </Typography>

      {/* Main Title */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem" },
          fontWeight: 900,
          lineHeight: 1.1,
          mb: 4,
          fontFamily: "inherit",
          letterSpacing: "-0.03em",
          color: "text.primary",
        }}
      >
        {title}
      </Typography>

      {/* Metadata Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 0 }}
        sx={{
          pt: 3,
          borderTop: "1px solid var(--mui-palette-divider)",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        {/* Author Info */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              fontSize: "0.85rem",
              fontWeight: 800,
              bgcolor: "text.primary",
              color: "background.default",
              borderRadius: 0, // Brutalist sharp edge
              border: "1px solid var(--mui-palette-divider)",
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: "0.05em",
                fontSize: "0.65rem",
              }}
            >
              WRITTEN BY
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "text.primary",
              }}
            >
              {author}
            </Typography>
          </Box>
        </Stack>

        {/* Date and Reading Time */}
        <Stack direction="row" spacing={4} sx={{ mt: { xs: 2, sm: 0 } }}>
          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: "0.05em",
                fontSize: "0.65rem",
              }}
            >
              PUBLISHED
            </Typography>
            <Typography
              variant="body2"
              component="time"
              dateTime={date}
              sx={{
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "text.primary",
              }}
            >
              {formattedDate}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: "0.05em",
                fontSize: "0.65rem",
              }}
            >
              READ TIME
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "text.primary",
                fontFamily: "monospace",
              }}
            >
              {readingTime}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Text To Speech Control Widget */}
      <TextToSpeech />

      {/* Monospace Tags List */}
      {tags && tags.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 3.5,
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
              fontSize: "0.7rem",
              mr: 0.5,
            }}
          >
            {"TAGS //"}
          </Typography>
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
