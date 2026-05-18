import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // optimizePackageImports: ["@mui/material", "@mui/icons-material", "three"],
    optimizePackageImports: [
      "@emotion/cache",
      "@emotion/styled",
      "@mui/icons-material",
      "@mui/material",
      "@mui/material-nextjs",
      "@types/three",
      "next",
      "react",
      "react-dom",
      "three",
    ],
  },
};

export default nextConfig;
