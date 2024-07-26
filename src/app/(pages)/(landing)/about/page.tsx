import type { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';
import { app_config } from '~/config';
import { generateDynamicMetadata, type MetadataOptions } from '~/lib/metadata';

export async function generateMetadata({}): Promise<Metadata> {
	const origin = headers().get('referer');

	const metadataOptions: MetadataOptions = {
		title: 'About',
		description: 'This is about page.',
		openGraph: {
			title: 'About',
			description: 'This is about page.',
			url: origin
				? new URL(String(origin))
				: new URL(app_config.site.url),
		},
		twitter: {
			title: 'About',
			description: 'This is about page.',
		},
	};

	return await generateDynamicMetadata(metadataOptions);
}

const page = () => {
	return <div>about page</div>;
};

export default page;
