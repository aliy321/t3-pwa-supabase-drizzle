import { type Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';
import { app_config } from '~/config';
import { generateDynamicMetadata, type MetadataOptions } from '~/lib/metadata';

type Props = {
	children: React.ReactNode;
};

export async function generateMetadata({}): Promise<Metadata> {
	const origin = headers().get('referer');

	const metadataOptions: MetadataOptions = {
		title: 'Sign In',
		openGraph: {
			title: 'Sign In',
			url: origin
				? new URL(String(origin))
				: new URL(app_config.site.url),
		},
		twitter: {
			title: 'Sign In',
		},
	};

	return await generateDynamicMetadata(metadataOptions);
}

const layout = ({ children }: Props) => {
	return <>{children}</>;
};

export default layout;
