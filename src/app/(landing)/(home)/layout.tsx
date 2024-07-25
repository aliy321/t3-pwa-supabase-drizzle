import React from 'react';
import LandingProviders from '~/components/Providers/LandingProviders';
import { SiteBanner } from '~/components/site-banner';
import { SiteFooter } from '~/components/site-footer';
import { SiteHeader } from '~/components/site-header';

type Props = {
	children: React.ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<LandingProviders>
			{/* <SiteBanner /> */}
			<SiteHeader />
			<main className="mx-auto flex-1 overflow-hidden">{children}</main>
			<SiteFooter />
		</LandingProviders>
	);
};

export default layout;
