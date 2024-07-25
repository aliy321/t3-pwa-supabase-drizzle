import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Viewport, type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import { HydrateClient } from '~/trpc/server';
import dynamic from 'next/dynamic';
// import RootProviders from '~/components/Providers/RootProviders';
const RootProviders = dynamic(
	() => import('~/components/Providers/RootProviders'),
	{ ssr: false }
);

const APP_NAME = 'One Tap Tutor';
const APP_DEFAULT_TITLE = 'Fulfilment is only one tap away.';
const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
const APP_DESCRIPTION =
	'Every lesson you deliver is an opportunity to change lives. With One Tap Tutor, make meaningful impacts, one student at a time.';

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
			<body className="size-full min-h-svh">
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
