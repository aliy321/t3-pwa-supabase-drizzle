import { withSentryConfig } from '@sentry/nextjs';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

import withSerwistInit from '@serwist/next';

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	cacheOnNavigation: true,
	swSrc: 'src/sw.ts',
	swDest: 'public/sw.js',
	additionalPrecacheEntries: [{ url: '/~offline', revision }],
	reloadOnOnline: true,
	disable: process.env.NODE_ENV === 'development',
});

export default withSentryConfig(
	withSerwist({
		// Your Next.js config
		reactStrictMode: false,
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'images.unsplash.com',
				},
			],
		},
	}),
	{
		// For all available options, see:
		// https://github.com/getsentry/sentry-webpack-plugin#options

		org: 'hyperfuse-studio',
		project: 'one-tap-tutor',

		// Only print logs for uploading source maps in CI
		silent: !process.env.CI,

		// For all available options, see:
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

		// Upload a larger set of source maps for prettier stack traces (increases build time)
		widenClientFileUpload: true,

		// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
		// This can increase your server load as well as your hosting bill.
		// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
		// side errors will fail.
		// tunnelRoute: "/monitoring",

		// Hides source maps from generated client bundles
		hideSourceMaps: true,

		// Automatically tree-shake Sentry logger statements to reduce bundle size
		disableLogger: true,

		// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
		// See the following for more information:
		// https://docs.sentry.io/product/crons/
		// https://vercel.com/docs/cron-jobs
		automaticVercelMonitors: true,
	}
);
