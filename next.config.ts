import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  // Nextra configuration options
  defaultShowCopyCode: true,
});

const nextConfig: NextConfig = {
  // Whitelist your local network IP for HMR and dev resources
  allowedDevOrigins: ["192.168.1.9"],

  // The React Compiler is now a root-level option
  reactCompiler: true,

  // Map Turbopack alias for Nextra MDX import source
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
  },

  /* config options here */
  experimental: {
    // Kept only the valid, heavily utilized packages to optimize
    optimizePackageImports: [
      "@emotion/cache",
      "@emotion/styled",
      "@mui/icons-material",
      "@mui/material",
      "@mui/material-nextjs",
      "three",
    ],
  },
};

export default withNextra(nextConfig);
