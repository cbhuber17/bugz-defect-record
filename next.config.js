/** @type {import('next').NextConfig} */
const nextConfig = {
  // Headers allow you to set custom HTTP headers on the response to an incoming request on a given path.
  // https://nextjs.org/docs/pages/api-reference/next-config-js/headers
  async headers() {
    return [
      {
        source: "/:path*",
        // https://nextjs.org/docs/pages/api-reference/next-config-js/headers#referrer-policy
        // The Referer header will be omitted: sent requests do not include any referrer information.
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "colin-huber",
    project: "javascript-nextjs",
    url: "https://colin-huber.sentry.io/",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
