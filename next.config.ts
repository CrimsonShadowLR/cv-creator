import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default in Next.js 16.
  // The Typst WASM binary is fetched at runtime from CDN via `fetch()`,
  // so no bundler-level WASM configuration is needed.
  turbopack: {},
};

export default nextConfig;
