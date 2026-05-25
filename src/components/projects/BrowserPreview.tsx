"use client";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Link as MuiLink, Paper, Typography } from "@mui/material";
import { useRef } from "react";

interface BrowserPreviewProps {
  homepage: string;
  repoName: string;
  t: {
    livePreview: string;
  };
}

export default function BrowserPreview({
  homepage,
  repoName,
  t,
}: BrowserPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reloadIframe = () => {
    if (iframeRef.current) {
      // biome-ignore lint/correctness/noSelfAssign: reload iframe
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <Box sx={{ mb: 6, width: "100%" }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "12px",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          color: "var(--mui-palette-text-secondary)",
          mb: 2,
          textTransform: "uppercase",
        }}
      >
        {t.livePreview}
      </Typography>

      {/* Brutalist Mock Browser */}
      <Paper
        elevation={2}
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          height: { xs: "400px", md: "600px" },
        }}
      >
        {/* Browser Header Bar */}
        <Box
          sx={{
            borderBottom: "1px solid var(--mui-palette-divider)",
            backgroundColor: "var(--mui-palette-action-hover)",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            userSelect: "none",
          }}
        >
          {/* Window Dots */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "var(--mui-palette-error-main)",
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "var(--mui-palette-warning-main)",
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "var(--mui-palette-success-main)",
                opacity: 0.8,
              }}
            />
          </Box>

          {/* Reload Button */}
          <Box
            onClick={reloadIframe}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "var(--mui-palette-text-secondary)",
              transition: "color 0.15s ease",
              "&:hover": {
                color: "var(--mui-palette-text-primary)",
              },
            }}
          >
            <RefreshIcon sx={{ fontSize: 16 }} />
          </Box>

          {/* Address Bar */}
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "var(--mui-palette-background-default)",
              border: "1px solid var(--mui-palette-divider)",
              borderRadius: "4px",
              px: 2,
              py: 0.5,
              fontSize: "11px",
              fontFamily: "monospace",
              color: "var(--mui-palette-text-secondary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
            }}
          >
            {homepage}
          </Box>

          {/* Open in New Tab Button */}
          <MuiLink
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "var(--mui-palette-text-secondary)",
              "&:hover": { color: "var(--mui-palette-text-primary)" },
            }}
          >
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </MuiLink>
        </Box>

        {/* Iframe Website content */}
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            ref={iframeRef}
            src={homepage}
            title={`${repoName} Live Demo`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              backgroundColor: "var(--mui-palette-background-paper)",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
        </Box>
      </Paper>
    </Box>
  );
}
