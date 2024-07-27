'use client';

import React, { Suspense } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

type Props = {
	children: React.ReactNode;
};

const gtmId =
	process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GTM_ID : '';
const gaId =
	process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID : '';

const LandingProviders = ({ children }: Props) => {
	return (
		<Suspense fallback={null}>
			{children}
			{gtmId && <GoogleTagManager gtmId={gtmId} />}
			{gaId && <GoogleAnalytics gaId={gaId} />}
		</Suspense>
	);
};

export default LandingProviders;
