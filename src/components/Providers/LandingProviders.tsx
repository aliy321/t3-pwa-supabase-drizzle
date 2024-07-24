'use client';

import React from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { ReactLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';

type Props = {
	children: React.ReactNode;
};

const gtmId =
	process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GTM_ID : '';
const gaId =
	process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID : '';

const LandingProviders = ({ children }: Props) => {
	const lenis: LenisOptions = {
		lerp: 0.115,
		easing: (t: number) => {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		},
	};

	return (
		<ReactLenis root options={lenis}>
			{children}

			{gtmId && <GoogleTagManager gtmId={gtmId} />}
			{gaId && <GoogleAnalytics gaId={gaId} />}
		</ReactLenis>
	);
};

export default LandingProviders;
