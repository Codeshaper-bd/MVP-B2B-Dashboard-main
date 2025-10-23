/* eslint-disable no-console */
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();
const isCI = process.env.IS_CI === "true";
if (isCI) {
  console.log("🔧 Standalone output enabled (CI build)");
} else {
  console.log("🧪 Local or non-standalone build");
}

// Bundle analyzer setup
let withBundleAnalyzer = (config) => config;
if (process.env.ANALYZE === "true") {
  try {
    const bundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: true,
    });
    withBundleAnalyzer = bundleAnalyzer;
  } catch (error) {
    console.log("Bundle analyzer not available, skipping...");
  }
}

const nextConfig = {
  ...(isCI && { output: "standalone" }),

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental optimizations for package imports
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "react-icons",
      "@iconify/react",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lorem.space",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "lipsum.app",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "fennec.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "fennecappcommonstorage.blob.core.windows.net",
      },
    ],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
