import type { Metadata } from 'next';
import { getBaseUrl } from './utils';
import { app_config } from '~/config';

export interface MetadataOptions {
	title?: Metadata['title'];
	description?: Metadata['description'];
	openGraph?: Metadata['openGraph'];
	twitter?: Metadata['twitter'];
}

export async function generateDynamicMetadata(
	options: MetadataOptions
): Promise<Metadata> {
	return {
		metadataBase: new URL(getBaseUrl()),
		title: {
			default: String(options.title ?? app_config.site.title),
			template: app_config.site.title_template,
		},
		description: options.description ?? app_config.site.description,
		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title: app_config.site.title,
		},
		formatDetection: {
			telephone: false,
		},
		openGraph: {
			type: 'website',
			siteName: app_config.name,
			title: {
				default: String(options.title ?? app_config.site.title),
				template: app_config.site.title_template,
			},
			description: options.description ?? app_config.site.description,
			url: new URL(String(options.openGraph?.url ?? getBaseUrl())),
			images: [
				{
					url: '/opengraph-image.png',
					width: 1200,
					height: 630,
					alt: app_config.site.title,
				},
			],
		},
		twitter: {
			card: 'summary',
			title: {
				default: String(options.title ?? app_config.site.title),
				template: app_config.site.title_template,
			},
			description: options.description ?? app_config.site.description,
			images: [
				{
					url: '/opengraph-image.png',
					width: 1200,
					height: 630,
					alt: app_config.site.title,
				},
			],
		},
	};
}
