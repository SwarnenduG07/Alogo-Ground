const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/common", "@repo/db"],
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    config.plugins.push(new CaseSensitivePathsPlugin());

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [/packages\/(common|db)/],
      use: [
        {
          loader: 'next/dist/build/webpack/loaders/next-swc-loader',
        },
      ],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: false
  }
  // Removed the 'output: standalone' option
};

module.exports = nextConfig;