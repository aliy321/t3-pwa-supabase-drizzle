import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Viewport, type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import RootProviders from '~/components/Providers/RootProviders';
import { HydrateClient } from '~/trpc/server';
// import dynamic from 'next/dynamic';
// const RootProviders = dynamic(
// 	() => import('~/components/Providers/RootProviders'),
// 	{ ssr: false }
// );

const APP_NAME = 'PWA App';
const APP_DEFAULT_TITLE = 'My Awesome PWA App';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'Best PWA app in the world!';

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: 'website',
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: 'summary',
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
};

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
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
				<TRPCReactProvider>
					<RootProviders>
						{/* HydrateClient is use for t3-stack */}
						<HydrateClient>{children}</HydrateClient>
					</RootProviders>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
