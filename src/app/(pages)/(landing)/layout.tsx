import React, { Suspense } from 'react';
// import { SiteBanner } from '@/components/site-banner';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import dynamic from 'next/dynamic';
const LandingProviders = dynamic(
	() => import('~/components/Providers/LandingProviders'),
	{ ssr: false }
);

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<Suspense fallback={null}>
			<LandingProviders>
				{/* <SiteBanner /> */}
				<SiteHeader />
				<main className="mx-auto mt-[3.5rem] min-h-svh flex-1 overflow-hidden">
					{children}
				</main>
				<SiteFooter />
			</LandingProviders>
		</Suspense>
	);
};

export default layout;
