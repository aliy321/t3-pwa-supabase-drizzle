import { getBaseUrl } from '~/lib/utils';
import { type MetadataRoute } from 'next';
import { protectedPaths } from '~/lib/constants';

export default function robots(): MetadataRoute.Robots {
	const isProduction = process.env.VERCEL_ENV === 'production';

	if (!isProduction) {
		return {
			rules: {
				userAgent: '*',
				disallow: ['/'],
			},
			sitemap: undefined,
		};
	}

	return {
		rules: {
			userAgent: '*',
			allow: ['/api/og/*', '/api/dynamic-image*'],
			// Specify paths to disallow from crawling
			disallow: ['/api/', ...protectedPaths],
		},
		sitemap: `${getBaseUrl()}/sitemap.xml`,
	};
}
