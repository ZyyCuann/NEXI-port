import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isGithubActions
    ? {
        basePath: "/NEXI-port",
        assetPrefix: "/NEXI-port/",
      }
    : {}),
};

export default nextConfig;
