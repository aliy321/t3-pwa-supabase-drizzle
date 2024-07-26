import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata, type Viewport } from 'next';
import { app_config } from '~/config';

import { ViewTransitions } from 'next-view-transitions';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import { generateDynamicMetadata, type MetadataOptions } from '~/lib/metadata';
import { TRPCReactProvider } from '~/trpc/react';
import { HydrateClient } from '~/trpc/server';
import { cn } from '~/lib/utils';
const RootProviders = dynamic(
	() => import('~/components/Providers/RootProviders'),
	{ ssr: false }
);

export async function generateMetadata({}): Promise<Metadata> {
	const origin = headers().get('referer');

	const metadataOptions: MetadataOptions = {
		title: app_config.site.title,
		description: app_config.site.description,
		openGraph: {
			title: app_config.site.title,
			description: app_config.site.description,
			url: origin
				? new URL(String(origin))
				: new URL(app_config.site.url),
		},
		twitter: {
			title: app_config.site.title,
			description: app_config.site.description,
		},
	};

	return await generateDynamicMetadata(metadataOptions);
}

export const viewport: Viewport = {
	themeColor: '#FFFFFF',
	userScalable: false,
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	width: 'device-width',
	height: 'device-height',
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				className={cn(`${GeistSans.variable}`, 'h-full')}
				suppressHydrationWarning
			>
				<body className="size-full min-h-svh">
					<TRPCReactProvider>
						<RootProviders>
							{/* HydrateClient is use for t3-stack */}
							<HydrateClient>{children}</HydrateClient>
						</RootProviders>
					</TRPCReactProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
