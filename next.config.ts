import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Whitelist your local network IP for HMR and dev resources
  allowedDevOrigins: ["192.168.1.9"],

  // The React Compiler is now a root-level option
  reactCompiler: true,

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

export default nextConfig;
