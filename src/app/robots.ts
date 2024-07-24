import { getBaseUrl } from '~/lib/utils';
import { type MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: ['/api/og/*', '/api/dynamic-image*'],
			disallow: ['/api/'], // Specify paths to disallow
		},
		sitemap: `${getBaseUrl()}/sitemap.xml`,
	};
}
